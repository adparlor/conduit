
define(['QueryBuilderView'], function(QueryBuilderView) {

  var QueriesView = Backbone.Marionette.CollectionView.extend({
    initialize: function(options) {
      this.presenterModel = new Backbone.Model()

      this.childViewOptions = {
        vent: options.vent
      }
    },

    childView: QueryBuilderView,

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

  return QueriesView
})