
define(['QueryView', 'SystemRepo'],
function(QueryView, SystemRepo) {

  var QueryController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options

      var queryView = new QueryView({
        vent: this.options.vent
      })

      this.options.queryRegion.show(queryView)
    }
  })

  return QueryController
})