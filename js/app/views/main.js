
define(['SidebarController', 'QueriesController'],
function(SidebarController, QueriesController) {

  var MainView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
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

    onDomRefresh: function() {
      this.queriesController = new QueriesController({
        queryRegion: this.query,
        vent: this.options.vent
      })
      this.sidebarController = new SidebarController({
        sidebarRegion: this.sidebar,
        vent: this.options.vent
      })
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.stickit()
    }
  })

  return MainView
})