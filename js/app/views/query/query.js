
define(['TabsView', 'QueriesView'], function(TabsView, QueriesView) {

  var QueryView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()

      this.tabsView = new TabsView({

      })
      this.queriesView = new QueriesView({

      })

    },

    template: Handlebars.templates['query/query_layout'],

    regions: {
      tabs: '#tabsRegion',
      queries: '#queries'
    },

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.tabs.show(this.tabsView)
      this.queries.show(this.queriesView)
      this.stickit()
    }
  })

  return QueryView
})