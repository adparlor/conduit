require 'singleton'
require 'cassandra'

module CassandraCoreMixin

  def self.included(mod)
    # Force the Cassandra connection to open when this module is included.
    # We do this to avoid having Cassandra-related threads started inside a
    # PipelineSegment's flow loop, since they would get killed when the
    # segment is closed, and this would cause a fatal crash.
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
        heartbeat_interval: 10, # this has to be less than the Sewage::Pipeline::STUCK_TIMEOUT, otherwise the pipeline will raise StuckPipelineError before the dead heartbeat is detected
        idle_timeout: 360 # set it high, because it can take a while for the cassandra connection to start getting used in some pipelines
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

  def get_keyspace_hierarchy
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

  # def cast_string_to_cassandra_datatype(cassandra_datatype, string)
  #   ruby_type = map_cassandra_datatype_to_ruby_type(cassandra_datatype)
  #   if string.nil?
  #     nil
  #   elsif ruby_type == String
  #     string
  #   elsif ruby_type == Integer || ruby_type == Bignum
  #     string.empty? ? nil : string.to_i
  #   elsif ruby_type == Float
  #     string.empty? ? nil : string.to_f
  #   elsif ruby_type == BigDecimal
  #     string.empty? ? nil : BigDecimal.new(string)
  #   elsif ruby_type == Time
  #     string.empty? ? nil : Time.parse(string)
  #   else
  #     raise "Don't know how to coerce #{string.inspect} to a #{ruby_type.inspect}"
  #   end
  # end

  # def map_cassandra_datatype_to_ruby_type(cassandra_datatype)
  #   case cassandra_datatype
  #   when :int, "org.apache.cassandra.db.marshal.Int32Type"
  #     Integer
  #   when :bigint, "org.apache.cassandra.db.marshal.LongType"
  #     Bignum
  #   when :float
  #     Float
  #   when :varchar
  #     String
  #   when :decimal
  #     BigDecimal
  #   when :timestamp
  #     Time
  #   else
  #     raise "Don't know how to convert #{cassandra_datatype.inspect} into a Ruby type"
  #   end
  # end

end