
define(['ResultDataView'], function(ResultDataView) {

  var ResultRowView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/result_layout'],

    tagName: 'tr',

    childView: ResultDataView,

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

  return ResultRowView
})