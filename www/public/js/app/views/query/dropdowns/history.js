
define(function() {

  var HistoryView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/dropdowns/history_layout'],

    className: 'history-child',

    bindings: {

    },

    events: {
      'click': 'setCurrentQuery'
    },

    setCurrentQuery: function(e) {
      e.stopPropagation()
      this.model.trigger('setCurrentQuery', this.model.get("query"))
    },

    onDestroy: function() {
      this.options = null
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return HistoryView
})