require 'conduit/loggable'

module Conduit
  module ResultFormatter

    def format(result)
      result.has_key?(:paged) ? format_table(result) : format_error(result)
    end

    private

    # Returns a row with all bigint values converted to strings because javascript doesn't
    # know how to deal with numbers larger than 32-bit.
    def bigints_converted(row, bigint_columns)
      bigint_columns.each do |column|
        row[column] = row[column].to_s
      end

      row
    end

    def format_table(result)
      formatted_result = {rows: [], table: result[:table]}
      formatted_result[:paging_state] = Base64.encode64(result[:paged].paging_state) if result[:paged].paging_state
      bigint_columns = bigint_columns_for(result[:table])

      result[:paged].each do |row|
        formatted_result[:rows] << bigints_converted(row, bigint_columns)
      end
      formatted_result
    end

    def bigint_columns_for(table)
      table[:columns].select{|column| column[:type] == :bigint}
        .map{|column| column[:name]}
    end

    def format_error(error)
      {
        err: true,
        error_class: error.class.name,
        error_message: error.message
      }
    end

  end
end