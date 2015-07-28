
define(['AlertsController', 'SidebarController', 'QueriesController', 'ModalController'],
function(AlertsController, SidebarController, QueriesController, ModalController) {

  var MainView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
    },

    template: Handlebars.templates['main_layout'],

    regions: {
      'alerts': '#alertsRegion',
      'sidebar': '#sidebarRegion',
      'query': '#queryRegion',
      'modal': '#modalRegion'
    },

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    onDomRefresh: function() {
      this.alertsController = new AlertsController({
        alertsRegion: this.alerts,
        vent: this.options.vent
      })
      this.queriesController = new QueriesController({
        queryRegion: this.query,
        vent: this.options.vent
      })
      this.sidebarController = new SidebarController({
        sidebarRegion: this.sidebar,
        vent: this.options.vent
      })
      this.modalController = new ModalController({
        modalRegion: this.modal,
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