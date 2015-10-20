require 'spec_helper'

require 'conduit/result_formatter'

require 'cassandra/result'
require 'json'

describe Conduit::ResultFormatter do
  include Conduit::ResultFormatter

  # TODO: Create fixtures so that this gets created in the cassandra db everytime,
  # instead of reading from a file.
  let(:json_result) do
    json_file_path = File.expand_path("../../fixtures/example_query_result.json", __FILE__)
    JSON.parse(File.read(json_file_path))
  end

  let(:result) do
    paged_result = Cassandra::Results::Paged.new(json_result["rows"], nil, nil, nil, nil, nil, nil, nil, nil, nil, nil)

    {
      paged: paged_result,
      table: json_result["table"].deep_symbolize_keys
    }
  end

  describe "#format" do
    context "when the query was successful" do
      it "converts all bigint column values into strings" do
        bigint_columns = send(:bigint_columns_for, result[:table])

        result[:paged].rows.each do |row|
          bigint_columns.each do |column|
            expect(row[column]).to be_a(Fixnum)
          end
        end

        formatted_results = format(result)

        formatted_results[:rows].each do |row|
          bigint_columns.each do |column|
            expect(row[column]).to be_a(String)
          end
        end
      end
    end

    context "when the query returned errors" do
    end
  end
end