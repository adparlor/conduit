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
        prepare_and_execute_cql params[:query], params[:keyspace], params[:paging_state]
      end

      def request_hierarchy
        get_keyspace_hierarchy
      end

      def table_to_json result
        format_table result
      end

      def error_to_json error
        format_error error
      end
    end

    desc "Submits query to cassandra and returns result"
    params do
      requires :keyspace
      requires :query, type: String, desc: "String to query"
    end
    post :queries do
      cass_result = request_query params

      if cass_result.is_a? Cassandra::Results::Paged
        table_to_json cass_result
      else
        error! format_error(cass_result), 500
      end
    end

    desc "Submits query to cassandra to return all available
          keyspaces with tables and columns"
    get :hierarchy do
      request_hierarchy
    end

  end
end