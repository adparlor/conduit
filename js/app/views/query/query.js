
define(['TabsView', 'QueriesView', 'Query', 'Queries'],
function(TabsView, QueriesView, Query, Queries) {

  var QueryView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
      this.tabsCollection = new Queries(),
      this.queriesCollection = new Queries()
      this.addQueryTab()

      this.tabsView = new TabsView({
        collection: this.tabsCollection
      })
      this.queriesView = new QueriesView({
        vent: this.options.vent,
        collection: this.queriesCollection
      })

      this.listenTo(this.options.vent, "addNewQuery", this.addQueryTab)
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

    addQueryTab: function(query) {
      var newQuery = query || new Query({})

      this.tabsCollection.add(newQuery)
      this.queriesCollection.add(newQuery)
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