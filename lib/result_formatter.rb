module ResultFormatter

  def format_table result
    formatted_result = {rows: []}
    formatted_result[:paging_state] = Base64.encode64(result.paging_state) if result.paging_state

    result.each do |row|
      formatted_result[:rows] << row
    end
    formatted_result
  end

  def format_error error
    {error_class: error.class.name, error_message: error.message}
  end

end