
define(['AlertsView'], function(AlertsView) {

  var AlertsController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options

      this.alertsView = new AlertsView({
        vent: this.options.vent
      })

      this.options.alertsRegion.show(this.alertsView)
    }
  })

  return AlertsController
})