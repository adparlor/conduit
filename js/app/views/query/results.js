
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

      this.listenTo(this.resultsCollection, 'reset', this.getHeadersFromResultsCollection)
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

    getHeadersFromResultsCollection: function() {
      var view = this
      // FILL HEADERS COLLECTION
      this.resultsCollection.each(function(result) {
        result.get("tableDataCollection").each(function(data) {
          var dataHeader = data.get("header")
          if (!view.resultHeaders.findWhere({header: dataHeader}))
            view.resultHeaders.add(new Backbone.Model({header: dataHeader}))
        })
      })
      // FOR EACH ROW, LOOP THROUGH HEADERS. IF ROW'S DATA COLLECTION DOESN'T CONTAIN
      // THAT HEADER, INSERT BLANK MODEL AT THAT INDEX TO FILL IN BLANK SPOTS
      this.resultsCollection.each(function(row) {
        view.resultHeaders.each(function(header, index) {
          if (!row.get("tableDataCollection").findWhere({header: header})) {
            row.get("tableDataCollection").add(new Backbone.Model({
              header: header,
              value: "Undefined"
            }), { at: index })
          }
        })
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