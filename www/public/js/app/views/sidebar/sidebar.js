
define(['KeyspaceView'], function(KeyspaceView) {

  var SidebarView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()

      this.listenTo(this.collection, 'makeActive', this.toggleActiveKeyspace)
    },

    template: Handlebars.templates['sidebar/sidebar_layout'],

    id: 'sidebar',

    childView: KeyspaceView,

    childViewContainer: '#keyspacesContainer',

    events: {

    },

    bindings: {

    },

    toggleActiveKeyspace: function(keyspace) {
      this.collection.each(function(model) {
        model.set("isActive", false)
      })

      keyspace.set("isActive", true)
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return SidebarView
})