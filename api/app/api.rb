require 'grape'
require 'cassandra_core_mixin'
require 'result_formatter'

module Apollo
  class API < Grape::API

    format :json

    helpers do
      include CassandraCoreMixin
      include ResultFormatter

      def submit_query query
        prepare_and_execute_cql query
      end

      def to_json result
        format result
      end
    end

    desc "Submits query to cassandra and returns result"
    params do
      requires :query, type: String, desc: "String to query"
    end
    post :query do
      cass_result = submit_query params[:query]
      to_json cass_result
    end
  end
end