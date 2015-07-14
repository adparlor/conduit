
define(['QueryView', 'SystemRepo'],
function(QueryView, SystemRepo) {

  var QueriesController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options

      var queryView = new QueryView({
        vent: this.options.vent
      })

      this.options.queryRegion.show(queryView)
      this.listenTo(this.options.vent, "query:makeRequest", this.makeQueryRequest)
    },

    makeQueryRequest: function(queryModel) {

      var onSuccess = function(response) {

      }

      var onFailure = function(err) {

      }

      SystemRepo.makeQueryRequest(query)
        .done(onSuccess)
        .fail(onFailure)

    }
  })

  return QueriesController
})