
define(function() {

  var Deserializer = {

    deserializeQueryResponse: function(rows) {
      var resultsCollection = new Backbone.Collection()

      rows.forEach(function(row) {
        // resultsCollection.add(new Backbone.Model(row))
        var rowModel = new Backbone.Model({
          tableDataCollection: new Backbone.Collection()
        })
        for (var key in row) {
          if (row.hasOwnProperty(key)) {
            rowModel.get("tableDataCollection").add(new Backbone.Model({
              header: key,
              value: row[key] || "null"
            }))
          }
        }
        resultsCollection.add(rowModel)
      })

      return resultsCollection
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
              type: columnObject.type,
              primary: columnObject.primary
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