
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
    KeyspaceView: "views/sidebar/keyspace",
    TableView: "views/sidebar/table",
    ColumnView: "views/sidebar/column",
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
    Queries: "collections/queries",
    ModalController: "controllers/modal_controller",
    JSONModalView: "views/modal/json_modal",
    AlertsController: "controllers/alerts_controller",
    AlertView: "views/alerts/alert"
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

  $(document).ready(function() {
    window.openJSONModal = function(header, json) {
      window.Conduit.vent.trigger("openJSONModal", header, json)
    }
  })

})