
define(['SidebarView', 'QueryController'], function(SidebarView, QueryController) {

  var MainView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
      this.sidebarView = new SidebarView({})
      this.queryController = new QueryController({
        queryRegion: this.query
      })
    },

    template: Handlebars.templates['main_layout'],

    regions: {
      'sidebar': '#sidebarRegion',
      'query': '#queryRegion'
    },

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.stickit()
    }
  })

  return MainView
})