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
        keyspace_hierarchy
      end

      def to_json result
        format result
      end
    end

    desc "Submits query to cassandra and returns result"
    params do
      requires :keyspace
      requires :query, type: String, desc: "String to query"
    end
    post :queries do
      formatted_result = to_json(request_query params)

      return formatted_result unless formatted_result[:err]
      error! formatted_result, 500
    end

    desc "Submits query to cassandra to return all available
          keyspaces with tables and columns"
    get :hierarchy do
      request_hierarchy
    end

  end
end