require 'grape'
require 'cassandra_core_mixin'
require 'result_formatter'

module Conduit
  class API < Grape::API

    format :json

    helpers do
      include CassandraCoreMixin
      include ResultFormatter

      def request_query params
        prepare_and_execute_cql params[:query], params[:keyspace]
      end

      def request_hierarchy
        get_keyspace_hierarchy
      end

      def table_to_json result
        _format_tables result
      end
    end

    desc "Submits query to cassandra and returns result"
    params do
      requires :keyspace
      requires :query, type: String, desc: "String to query"
    end
    post :queries do
      cass_result = request_query params
      to_json cass_result
    end

    desc "Submits query to cassandra to return all available
          keyspaces with tables and columns"
    get :hierarchy do
      request_hierarchy
    end

  end
end