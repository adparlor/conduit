
define(['TabView'], function(TabView) {

  TabsView = Backbone.Marionette.CollectionView.extend({
    initialize: function(options) {
      this.presenterModel = new Backbone.Model()
    },

    className: "query-tabs",

    childView: TabView,

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

  return TabsView
})