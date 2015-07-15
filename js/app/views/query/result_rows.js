
define(['ResultRowView'], function(ResultRowView) {

  var ResultRowsView = Backbone.Marionette.CollectionView.extend({
    initialize: function(options) {
      this.presenterModel = new Backbone.Model()
    },

    tagName: 'tr',

    childView: ResultRowView,

    events: {

    },

    presenterBindings: {

    },

    onDomRefresh: function() {
      this.trigger('resultsChange')
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