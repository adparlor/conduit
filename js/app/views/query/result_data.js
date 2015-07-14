
define([], function() {

  var ResultDataView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {

    },

    template: Handlebars.templates['query/result_data_layout'],

    tagName: 'td',

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

  return ResultDataView
})