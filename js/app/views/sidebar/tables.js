
define(['ColumnsView'], function(ColumnsView) {

  var TablesView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("columns")
    },

    template: Handlebars.templates['sidebar/tables_layout'],

    childView: ColumnsView,

    childViewContainer: '.columns-container',

    className: 'table',

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

  return TablesView
})