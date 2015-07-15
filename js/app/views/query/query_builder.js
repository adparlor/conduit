
define(['ResultsView'], function(ResultsView) {

  var QueryBuilderView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.vent = options.vent
      this.presenterModel = new Backbone.Model({
        loading: false
      })
      this.resultsView = new ResultsView({
        results: this.model.get("results"),
        model: this.presenterModel
      })
    },

    template: Handlebars.templates['query/query_builder_layout'],

    className: 'query-builder',

    regions: {
      results: '.resultsRegion'
    },

    events: {
      'click .run-query': 'sendQueryRequest'
    },

    bindings: {
      '.query-field > textarea': 'query'
    },

    sendQueryRequest: function() {
      this.presenterModel.set("loading", true)
      var view = this
      var onSuccess = function() {
        view.presenterModel.set("loading", false)
      }
      this.vent.trigger("query:makeRequest", this.model, onSuccess)
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.results.show(this.resultsView)
      this.stickit()
    }
  })

  return QueryBuilderView
})