
define(['SidebarController', 'QueryController'],
function(SidebarController, QueryController) {

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
      this.queryController = new QueryController({
        queryRegion: this.query
      })
      this.sidebarController = new SidebarController({
        sidebarRegion: this.sidebar
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