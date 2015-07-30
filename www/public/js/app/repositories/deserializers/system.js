
define(function() {

  var Deserializer = {

    deserializeBasic: function(result) {
      return result
    },

    deserializeQueryError: function(error) {
      var errorObject = {
        errorClass: error.error_class || "Error",
        errorMessage: error.error_message || error.error
      }

      return errorObject
    },

    deserializeQueryResponse: function(rows) {
      var resultsCollection = new Backbone.Collection()

      rows.forEach(function(row) {
       var rowModel = new Backbone.Model({
        headers: []
       })

       for (var key in row) {
        if (row.hasOwnProperty(key)) {
          rowModel.set(key, row[key] || 'null')
          rowModel.get("headers").push(key)
        }
       }
       resultsCollection.add(rowModel)
      })

      return resultsCollection
    },

    deserializeHierarchyResult: function(keyspaces) {
      var keyspaceCollection = new Backbone.Collection()

      keyspaces.forEach(function(keyspaceObject, index) {
        var keyspace = new Backbone.Model({
          name: keyspaceObject.name,
          tables: new Backbone.Collection(),
          isActive: Boolean(index == 0),
          isCollapsed: Boolean(index != 0)
        })
        keyspaceObject.tables.forEach(function(tableObject) {
          var table = new Backbone.Model({
            name: tableObject.name,
            columns: new Backbone.Collection()
          })
          tableObject.columns.forEach(function(columnObject) {
            var column = new Backbone.Model({
              name: columnObject.name,
              type: columnObject.type,
              primary: columnObject.primary,
              clusterColumn: columnObject.cluster_column,
              secondaryIndex: columnObject.secondary_index
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