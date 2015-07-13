
define(['TabView'], function(TabView) {

  TabsView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.model = new Backbone.Model()
      this.collection = new Backbone.Collection()
    },

    template: Handlebars.templates['query/tabs_layout'],

    itemView: TabView,

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return TabsView
})