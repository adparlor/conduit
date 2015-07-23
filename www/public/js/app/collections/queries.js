
define(['Query'], function(Query) {

  var Queries = Backbone.Collection.extend({
    model: Query
  })

  return Queries

})