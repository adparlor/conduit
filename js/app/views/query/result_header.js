
define([], function() {

  var ResultHeaderView = Backbone.Marionette.ItemView.extend({
    initialize: function() {

    },

    template: Handlebars.templates['query/result_header_layout'],

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

  return ResultHeaderView
})