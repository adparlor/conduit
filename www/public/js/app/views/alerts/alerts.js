
define([], function() {

  var AlertsView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()

      // ALERT TYPES TO TRIGGER: "success", "info", "warning", "danger"
      this.listenTo(this.options.vent, "triggerAlert", this.triggerAlert)
    },

    template: Handlebars.templates['alerts/alerts_layout'],

    regions: {

    },

    bindings: {
      '.alert': {
        attributes: [{
          observe: 'type',
          name: 'class',
          onGet: function(type) {
            return "alert-" + type
          }
        }]
      },
      '.alert-message': {
        observe: 'message',
        updateMethod: 'html',
        onGet: 'formatMessage'
      },
      ':el': {
        attributes: [{
          observe: ['type', 'message'],
          name: 'class',
          onGet: function(attrs) {
            return attrs[0] && attrs[1] ? "" : "hide"
          }
        }]
      }
    },

    events: {
      'click .close': 'clearAlert'
    },

    formatMessage: function(message) {
      if (message) return "<b>" + message.errorClass + "</b> " + message.errorMessage
    },

    clearAlert: function() {
      this.model.clear()
    },

    triggerAlert: function(alertType, messageObject) {
      this.model.set({
        type: alertType,
        message: messageObject,
      })
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.stickit()
    }
  })

  return AlertsView
})