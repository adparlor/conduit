
define(['ResultsView'], function(ResultsView) {

  var QueryBuilderView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
      this.resultsView = new ResultsView({

      })
    },

    template: Handlebars.templates['query/query_builder_layout.handlebars'],

    regions: {
      results: '.results'
    },

    events: {

    },

    bindings: {

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