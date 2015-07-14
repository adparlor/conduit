
define(['ResultHeadersView'], function(ResultHeadersView) {

  var ResultHeadersView = Backbone.Marionette.CollectionView.extend({
    initialize: function(options) {
      this.presenterModel = new Backbone.Model()
    },

    childView: ResultHeadersView,

    tagName: 'tr',

    events: {

    },

    presenterBindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.stickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.CollectionView.prototype.render.call(this)
      this.unstickit(this.presenterModel, this.presenterBindings)
    }
  })

  return ResultHeadersView
})