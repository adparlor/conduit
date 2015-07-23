
define(['JSONModalView'], function(JSONModalView) {

  var ModalController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options

      this.listenTo(this.options.vent, "openJSONModal", this.openJSONModal)
    },

    openJSONModal: function(json) {
      var jsonModalView = new JSONModalView({
        vent: this.options.vent,
        jsonToDisplay: json
      })

      this.options.modalRegion.show(jsonModalView)
      $('#jsonModal').modal({})
    }
  })

  return ModalController

})