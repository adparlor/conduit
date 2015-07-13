
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
    QueryController: "controllers/query_controller",
    QueryView: "views/query/query",
    TabsView: "views/query/tabs",
    TabView: "views/query/tab",
    QueriesView: "views/query/queries",
    QueryBuilderView: "views/query/query_builder",
    ResultsView: "views/query/results",
    ResultView: "views/query/result"
  }
})

// require(["PromiseAdapter", "SystemStorage", "SystemDeserializer"], function(PromiseAdapter, SystemStorage, SystemDeserializer) {
//   var query = {
//     query: "SELECT * FROM tw_raw_promoted_tweet_facts_hourly LIMIT 1",
//     keyspace: "rainmaker"
//   }
//   var promise = new PromiseAdapter(SystemStorage.requestQuery(query), SystemDeserializer.deserializeResult)
//   promise.done(function() { console.log("done") })
// })

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