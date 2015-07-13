
define(['TablesView'], function(TablesView) {

  var KeyspacesView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("tables")
    },

    template: Handlebars.templates['sidebar/keyspaces_layout'],

    childView: TablesView,

    childViewContainer: '.tables-container',

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

  return KeyspacesView
})