
define(['ResultRowView'], function(ResultRowView) {

  var ResultRowsView = Backbone.Marionette.CollectionView.extend({
    initialize: function(options) {
      this.presenterModel = new Backbone.Model()
    },

    childView: ResultRowView,

    tagName: 'tr',

    events: {

    },

    presenterBindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.CollectionView.prototype.render.call(this)
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return ResultRowsView
})