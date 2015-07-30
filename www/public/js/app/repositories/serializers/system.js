
define([], function() {

  var SystemSerializer = {

    serializeQueryRequest: function(queryModel) {
      var finalJSON = {
        keyspace: queryModel.get("keyspace"),
        query: queryModel.get("query"),
        paging_state: queryModel.get("pagingState")
      }

      return finalJSON
    }

  }

  return SystemSerializer
})