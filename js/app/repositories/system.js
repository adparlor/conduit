define(['PromiseAdapter', 'SystemStorage', 'SystemDeserializer', 'SystemSerializer'],
function(PromiseAdapter, SystemStorage, SystemDeserializer, SystemSerializer) {

  var SystemRepo = {

    getKeyspaceHierarchy: function() {
      return new PromiseAdapter(SystemStorage.getKeyspaceHierarchy(),
                                    SystemDeserializer.deserializeHierarchyResult)
    }

  }

  return SystemRepo
})