
define(['HistoryView'], function(HistoryView) {

  var QueryHistoryView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
    },

    template: Handlebars.templates['query/dropdowns/query_history_layout'],

    childView: HistoryView,

    childViewContainer: '.history-child-container',

    bindings: {

    },

    events: {
      'click .clear-history': 'clearQueryHistory'
    },

    clearQueryHistory: function() {
      var view = this
      localforage.setItem('queryHistory', [], function(err, value) {
        view.collection.reset()
      })
    },

    onDestroy: function() {
      this.options = null
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return QueryHistoryView
})