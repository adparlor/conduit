
define(['AlertView'], function(AlertView) {

  var AlertsController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options

      this.alertView = new AlertView({
        vent: this.options.vent
      })

      this.options.alertsRegion.show(this.alertView)
    }
  })

  return AlertsController
})