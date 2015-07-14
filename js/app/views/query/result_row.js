
define([], function() {

  var ResultRowView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/result_layout'],

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return ResultRowView
})