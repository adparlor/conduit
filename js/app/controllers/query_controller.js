
define(['QueryView', 'SystemRepo'],
function(QueryView, SystemRepo) {

  var QueryController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options
    }
  })

  return QueryController
})