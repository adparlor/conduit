
define(['KeyspaceView'], function(KeyspaceView) {

  var SidebarView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
    },

    template: Handlebars.templates['sidebar/sidebar_layout'],

    id: 'sidebar',

    childView: KeyspaceView,

    childViewContainer: '#keyspacesContainer',

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

  return SidebarView
})