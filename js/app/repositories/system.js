define(['PromiseAdapter', 'SystemStorage', 'SystemDeserializer', 'SystemSerializer'],
function(PromiseAdapter, SystemStorage, SystemDeserializer, SystemSerializer) {

  var SystemRepo = {

    getKeyspaceHierarchy: function() {
      return new PromiseAdapter(SystemStorage.getKeyspaceHierarchy(),
                                    SystemDeserializer.deserializeHierarchyResult)
    },

    makeQueryRequest: function(queryModel) {
      var adapterPromise = SystemStorage.requestQuery(SystemSerializer.serializeQueryRequest(queryModel))

      return new PromiseAdapter(adapterPromise, SystemDeserializer.deserializeQueryResponse)
    }

  }

  return SystemRepo
})