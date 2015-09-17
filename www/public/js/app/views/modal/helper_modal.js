
define([], function() {
  var HelperModalView = new Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options

      this.model = new Backbone.Model({})
    },

    template: Handlebars.templates['modal/helper_modal_layout'],

    bindings: {

    },

    events: {

    },

    onDestroy: function() {
      this.options = null
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.stickit()
    }
  })

  return HelperModalView
})