
define(['ResultsView'], function(ResultsView) {

  var QueryBuilderView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.vent = options.vent
      this.presenterModel = new Backbone.Model({
        loading: false,
        lazyLoading: false
      })
      this.resultsView = new ResultsView({
        results: this.model.get("results"),
        model: this.presenterModel
      })
    },

    template: Handlebars.templates['query/query_builder_layout'],

    className: 'query-builder',

    regions: {
      results: '.results-container'
    },

    events: {
      'click .run-query': 'sendQueryRequest'
    },

    presenterBindings: {
      '.status-message': 'statusMessage'
    },

    bindings: {
      '.query-field > textarea': 'query',
      ':el': {
        attributes: [{
          observe: 'isActive',
          name: 'class',
          onGet: function(isActive) {
            return isActive ? "" : "hide"
          }
        }]
      }
    },

    setStatusMessage: function() {
      var errorsStatus = this.presenterModel.get("errorMessage") ? "Errors; " : "No errors; ",
          rowsAffected = this.presenterModel.get("resultsArray").length + " rows affected"

      this.presenterModel.set("statusMessage", errorsStatus + rowsAffected)
    },

    sendQueryRequest: function() {
      this.presenterModel.set({
        loading: true,
        errorMessage: null,
        resultsArray: []
      })
      this.model.get("results").reset()
      this.resultsView.resultHeaders.reset()
      var view = this
      var onSuccess = function(results) {
        view.presenterModel.set({
          loading: false,
          resultsArray: results.rows,
          currentIndex: 0,
          lazyIteration: 0,
          pagingState: results.paging_state
        })
        view.presenterModel.trigger('newQueryResults')
        view.setStatusMessage()
      }

      var onFailure = function(err) {
        view.presenterModel.set({
          loading: false,
          errorMessage: err
        })
        // view.vent.trigger("triggerAlert", "danger", err)
        view.setStatusMessage()
      }
      this.vent.trigger("query:makeRequest", this.model, onSuccess, onFailure)
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.results.show(this.resultsView)
      this.stickit()
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return QueryBuilderView
})