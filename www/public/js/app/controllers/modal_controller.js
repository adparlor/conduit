
define(['JSONModalView', 'HelperModalView'], function(JSONModalView, HelperModalView) {

  var ModalController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options

      this.listenTo(this.options.vent, "openJSONModal", this.openJSONModal)
      this.listenTo(this.options.vent, "openHelperModal", this.openHelperModal)
    },

    // TODO: Close all other modals before opening this one.
    openHelperModal: function() {
      var helperModalView = new HelperModalView({
        vent: this.options.vent
      })

      this.options.modalRegion.show(helperModalView)
      $('#helperModal').modal({})
    },

    openJSONModal: function(header, json) {
      var jsonModalView = new JSONModalView({
        vent: this.options.vent,
        header: header,
        jsonToDisplay: JSON.parse(json)
      })

      this.options.modalRegion.show(jsonModalView)
      $('#jsonModal').modal({})
    }
  })

  return ModalController
})