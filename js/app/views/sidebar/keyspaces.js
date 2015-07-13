
define(['TablesView'], function(TablesView) {

  var KeyspacesView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
      this.collection = new Backbone.Collection()
    },

    template: Handlebars.templates['sidebar/keyspaces_layout'],

    itemView: TablesView,

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