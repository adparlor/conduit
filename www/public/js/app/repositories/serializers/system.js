
define([], function() {

  var SystemSerializer = {

    serializeQueryRequest: function(queryModel) {
      var finalJSON = {}

      finalJSON.keyspace = queryModel.get("keyspace") || "rainmaker"
      finalJSON.query = queryModel.get("query")

      return finalJSON
    }

  }

  return SystemSerializer
})