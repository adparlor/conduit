
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

      this.listenTo(this.resultsCollection, 'reset', this.divideResultsCollectionIntoHeadersAndRows)
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
      var view = this

      this.resultsCollection.each(function(result) {
        for (var key in result.attributes) {
          if (result.attributes.hasOwnProperty(key) && !view.resultHeaders.findWhere({header: key})) {
            view.resultHeaders.add(new Backbone.Model({
              header: key
            }))
          }
        }
      })
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