
define(['ResultView'], function(ResultView) {

  var ResultsView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
      this.collection = new Backbone.Collection()
    },

    template: Handlebars.templates['query/results_layout'],

    itemView: ResultView,

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return ResultsView
})