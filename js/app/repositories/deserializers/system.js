
define(function() {

  var Deserializer = {

    deserializeQueryResult: function(rows) {
      debugger
    },

    deserializeKeyspacesResult: function(keyspaces) {
      var keyspaceCollection = new Backbone.Collection()

      keyspaces.forEach(function(keyspace) {
        keyspaceCollection.add(new Backbone.Model({
          name: keyspace.keyspace_name
        }))
      })

      return keyspaceCollection
    }
  }

  return Deserializer
})