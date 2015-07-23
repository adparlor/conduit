
define([], function() {

  var ResultRowView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/results/result_layout'],

    tagName: 'tr',

    className: 'result-row',

    events: {

    },

    bindings: {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return ResultRowView
})