
requirejs.config({
  baseUrl: "js/app",
  paths: {
    PromiseAdapter: "repositories/promise-adapter",
    SystemStorage: "repositories/storage/system",
    SystemDeserializer: "repositories/deserializers/system",
    SystemSerializer: "repositories/serializers/system",
    SystemRepo: "repositories/system",
    Router: "router",
    MainView: "views/main",
    SidebarController: "controllers/sidebar_controller",
    SidebarView: "views/sidebar/sidebar",
    KeyspacesView: "views/sidebar/keyspaces",
    TablesView: "views/sidebar/tables",
    ColumnsView: "views/sidebar/columns",
    QueriesController: "controllers/queries_controller",
    QueryView: "views/query/query",
    TabsView: "views/query/tabs",
    TabView: "views/query/tab",
    QueriesView: "views/query/queries",
    QueryBuilderView: "views/query/query_builder",
    ResultsView: "views/query/results/results",
    ResultHeadersView: "views/query/results/result_headers",
    ResultRowsView: "views/query/results/result_rows",
    ResultRowView: "views/query/results/result_row",
    ResultHeaderView: "views/query/results/result_header",
    Query: "models/query",
    Queries: "collections/queries"
  }
})

require (['Router', 'MainView'], function(Router, MainView) {

  window.Conduit = new Backbone.Marionette.Application()

  var mainView = new MainView({
    router: new Router(),
    vent: window.Conduit.vent
  })

  window.Conduit.addRegions({
    appContent: '#appContent'
  })

  window.Conduit.appContent.show(mainView)

  Backbone.history.start()

})