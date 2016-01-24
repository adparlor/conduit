require 'singleton'
require 'cassandra'
require 'conduit/loggable'

module Conduit
  module CassandraCoreMixin

    def self.included(mod)
      # Force the Cassandra connection to open when this module is included.
      CassandraConnector.instance.cassandra_cluster
    end

    def cassandra_connector
      CassandraConnector.instance
    end

    def cassandra_cluster
      cassandra_connector.cassandra_cluster
    end

    def cassandra_session(keyspace = @keyspace)
      cassandra_connector.cassandra_session(keyspace)
    end

    def cassandra_force_reconnect!
      # need to invalidate the prepcache since its statements will be bound to a dead session
      @prepcache = nil
      cassandra_connector.force_reconnect!
    end

    def start_cassandra_unlogged_batch
      cassandra_session.unlogged_batch
    end

    def cassandra_execute(subject, opts = {})
      cassandra_session.execute(subject, opts)
    end

    def cassandra_execute_async(subject, opts = {})
      cassandra_session.execute_async(subject, opts)
    end

    private

    class CassandraConnector
      include Singleton

      def cassandra_cluster
        default_cluster_config = {
          heartbeat_interval: 10,
          idle_timeout: 360
        }
        cluster_config = default_cluster_config
                          .merge($CONFIG.cassandra.fetch(:cluster).to_h.symbolize_keys)
        @cassandra_cluster ||= Cassandra.cluster(cluster_config)
      end

      def cassandra_session(keyspace)
        @cassandra_sessions ||= {}
        return @cassandra_sessions[keyspace] if @cassandra_sessions.has_key? keyspace

        session = cassandra_cluster.connect
        session.execute("USE #{keyspace}")
        @cassandra_sessions[keyspace] = session
        session
      end

      def force_reconnect!
        @cassandra_sessions = {}
        return if @cassandra_cluster.nil?
        @cassandra_cluster.close
        @cassandra_cluster = nil
      end
    end

    def prep(query)
      cassandra_session.prepare(query)
    end

    def prepare_and_execute_cql(cql, keyspace_name, paging_state = nil)
      @keyspace = keyspace_name
      keyspace = cassandra_cluster.keyspace(keyspace_name)
      prepared_statement = prep(cql)
      paging_state = Base64.decode64(paging_state) if paging_state

      # Figure out which table we are working with through the cql statement
      effective_table = keyspace.tables.select{|table| cql.include?(table.name)}.first
      effective_table = formatted_table(keyspace, effective_table)

      {
        paged: cassandra_execute(prepared_statement, page_size: 100, paging_state: paging_state),
        table: effective_table
      }
    rescue Exception => e
      return e
    end

    def keyspace_hierarchy
      hierarchy = []
      cassandra_cluster.keyspaces.each do |k|
        hierarchy << formatted_keyspace(k)
      end
      hierarchy
    end

    def columns(keyspace:, table:)
      partition_key = partition_key(keyspace, table)
      clustering_columns = clustering_columns(keyspace, table)

      cassandra_table(keyspace, table).columns.map do |c|
        Hash.new.tap do |h|
          h[:name] = c.name
          h[:type] = c.type.kind
          h[:primary] = true if partition_key.include?(c.name)
          h[:cluster_column] = true if clustering_columns.include?(c.name)
          h[:secondary_index] = true if c.index
        end
      end
    end

    def cassandra_table(keyspace, table)
      cassandra_cluster.keyspace(keyspace).table(table)
    end

    def formatted_table(keyspace, table)
      {
        name: table.name,
        columns: columns(keyspace: keyspace.name, table: table.name)
      }
    end

    def formatted_keyspace(keyspace)
      formatted_keyspace = { name: keyspace.name, tables: [] }
      cassandra_cluster.keyspace(keyspace.name).tables.each do |t|
        formatted_keyspace[:tables] << formatted_table(keyspace, t)
      end

      formatted_keyspace
    end

    def partition_key(keyspace, table)
      cassandra_table(keyspace, table).instance_variable_get(:@partition_key).map{|key| key.name}
    end

    def clustering_columns(keyspace, table)
      cassandra_table(keyspace, table).instance_variable_get(:@clustering_columns).map{|col| col.name}
    end
  end
end
