module ResultFormatter

  def format_table result
    formatted_result = []

    result.each do |row|
      # formatted_result << deserialize_json_columns(row)
      formatted_result << row
    end
    formatted_result
  end

  # HANDLES METRICS_JSON, LEAVE AS IS FOR NOW
  # # Converts hash to json. Also deserializes values of keys in the given hash
  # # that end in _json. Returns a json object with the _json suffix on keys removed
  # # and the value deserialized. Other key/values are left untouched
  # def deserialize_json_columns(row)
  #   # Just return the row as-is if it doesn't have any json keys
  #   return row if row.keys.none?{|k| k.match /_json$/}
  #   deserialized_row = row.dup
  #   row.each do |k,v|
  #     if !v.nil? && k.match(/_json$/)
  #       deserialized_value = Oj.load(v)
  #       # get rid of the xxx_json column, and store the deserialized data under xxx
  #       deserialized_row[k.gsub(/_json$/,'')] = deserialized_value
  #       deserialized_row.delete k
  #     end
  #   end
  #   deserialized_row
  # end

  def format_error error
    {error_class: error.class.name, error_message: error.message}
  end

end