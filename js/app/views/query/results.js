
define(['ResultHeadersView', 'ResultRowsView'], function(ResultHeadersView, ResultRowsView) {

  var ResultsView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.resultsCollection = this.options.results
      this.resultHeaders = new Backbone.Collection()
      this.resultRows = new Backbone.Collection()
      this.model = new Backbone.Model()
      this.resultHeadersView = new ResultHeadersView({
        collection: this.resultHeaders
      })
      this.resultRowsView = new ResultRowsView({
        collection: this.resultRows
      })
    },

    template: Handlebars.templates['query/results_layout'],

    tagName: 'table',

    className: 'results-table',

    regions: {
      'headers': 'thead',
      'rows': 'tbody'
    },

    events: {

    },

    bindings: {

    },

    divideResultsCollectionIntoHeadersAndRows: function() {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.headers.show(this.resultHeadersView)
      this.rows.show(this.resultRowsView)
      this.stickit()
    }
  })

  return ResultsView
})