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

  def cassandra_session
    cassandra_connector.cassandra_session("rainmaker")
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

  class PreparedStatementsCache
    def initialize(cassandra_session)
      @session = cassandra_session
      @prepared_statements_by_key = {}
    end

    def [] (key)
      @prepared_statements_by_key.fetch(key)
    end

    def []= (key, query)
      @prepared_statements_by_key[key] = query
    end

    def << (query)
      prep_and_store(query)
    end

    def has_key?(key)
      @prepared_statements_by_key.has_key? key
    end

    def has_query?(query)
      key = key_for_query(query)
      has_key?(key)
    end

    def get_query(query)
      key = key_for_query(query)
      self[key]
    end

    def prep_and_store(query)
      key = key_for_query(query)
      prepared_statement = prep(query)
      self[key] = prepared_statement
      prepared_statement
    end

    def key_for_query(query)
      Digest::MD5.hexdigest(query)
    end

    def prep(query)
      @session.prepare(query)
    end
  end

  def prepcache
    if @prepcache.nil?
      @prepcache = PreparedStatementsCache.new(cassandra_session)
    end
    return @prepcache
  end

  def prepare_cql_with_cache(cql)
    if prepcache.has_query?(cql)
      prepared_statement = prepcache.get_query(cql)
    else
      prepared_statement = prepcache.prep_and_store(cql)
    end

    prepared_statement
  end

  def prepare_and_execute_cql(cql, opts = {})
    prepared_statement = prepare_cql_with_cache(cql)
    #bound_prepared_statement = prepared_statement.bind(opts.delete :arguments)

    cassandra_execute(prepared_statement, opts)
  end

  def cast_string_to_cassandra_datatype(cassandra_datatype, string)
    ruby_type = map_cassandra_datatype_to_ruby_type(cassandra_datatype)
    if string.nil?
      nil
    elsif ruby_type == String
      string
    elsif ruby_type == Integer || ruby_type == Bignum
      string.empty? ? nil : string.to_i
    elsif ruby_type == Float
      string.empty? ? nil : string.to_f
    elsif ruby_type == BigDecimal
      string.empty? ? nil : BigDecimal.new(string)
    elsif ruby_type == Time
      string.empty? ? nil : Time.parse(string)
    else
      raise "Don't know how to coerce #{string.inspect} to a #{ruby_type.inspect}"
    end
  end

  def map_cassandra_datatype_to_ruby_type(cassandra_datatype)
    case cassandra_datatype
    when :int, "org.apache.cassandra.db.marshal.Int32Type"
      Integer
    when :bigint, "org.apache.cassandra.db.marshal.LongType"
      Bignum
    when :float
      Float
    when :varchar
      String
    when :decimal
      BigDecimal
    when :timestamp
      Time
    else
      raise "Don't know how to convert #{cassandra_datatype.inspect} into a Ruby type"
    end
  end

end