
define(function() {

  var Deserializer = {

    deserializeQueryResponse: function(rows) {
      debugger
    },

    deserializeHierarchyResult: function(keyspaces) {
      var keyspaceCollection = new Backbone.Collection()

      keyspaces.forEach(function(keyspaceObject) {
        var keyspace = new Backbone.Model({
          name: keyspaceObject.name,
          tables: new Backbone.Collection()
        })
        keyspaceObject.tables.forEach(function(tableObject) {
          var table = new Backbone.Model({
            name: tableObject.name,
            columns: new Backbone.Collection()
          })
          tableObject.columns.forEach(function(columnObject) {
            var column = new Backbone.Model({
              name: columnObject.name,
              type: columnObject.type
            })
            table.get("columns").add(column)
          })
          keyspace.get("tables").add(table)
        })
        keyspaceCollection.add(keyspace)
      })

      return keyspaceCollection
    }
  }

  return Deserializer
})