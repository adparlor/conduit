require 'singleton'
require 'cassandra'

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

  def prep query
    cassandra_session.prepare(query)
  end

  def prepare_and_execute_cql(cql, keyspace, paging_state = nil)
    @keyspace = keyspace

    begin
      prepared_statement = prep(cql)
      paging_state = Base64.decode64(paging_state) if paging_state
      cassandra_execute(prepared_statement, page_size: 100, paging_state: paging_state)
    rescue Exception => e
      return e
    end
  end

  def keyspace_hierarchy
    hierarchy = []
    cassandra_cluster.keyspaces.each do |k|
      keyspace = Hash.new
      keyspace[:name] = k.name
      keyspace[:tables] = []
      cassandra_cluster.keyspace(keyspace[:name]).tables.each do |t|
        table = Hash.new
        table[:name] = t.name
        table[:columns] = []
        current_table = cassandra_cluster.keyspace(keyspace[:name]).table(table[:name])
        partition_key = current_table.instance_variable_get(:@partition_key).map{|key| key.name}
        clustering_columns = current_table.instance_variable_get(:@clustering_columns).map{|col| col.name}
        current_table.columns.each do |c|
          column = Hash.new
          column[:name] = c.name
          column[:type] = c.type
          column[:primary] = true if partition_key.include? column[:name]
          column[:cluster_column] = true if clustering_columns.include? column[:name]
          column[:secondary_index] = true if c.index
          table[:columns] << column
        end
        keyspace[:tables] << table
      end
      hierarchy << keyspace
    end
    hierarchy
  end
end