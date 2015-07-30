
define(['ResultsView', 'QueryHistoryView', 'QueryFavoritesView'],
function(ResultsView, QueryHistoryView, QueryFavoritesView) {

  var QueryBuilderView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.vent = options.vent
      this.presenterModel = new Backbone.Model({
        loading: false,
        lazyLoading: false,
      })
      this.resultsView = new ResultsView({
        results: this.model.get("results"),
        model: this.presenterModel
      })

      this.historyCollection = new Backbone.Collection()
      this.favoritesCollection = new Backbone.Collection()

      this.historyView = new QueryHistoryView({
        collection: this.historyCollection
      })
      this.favoritesView = new QueryFavoritesView({
        collection: this.favoritesCollection
      })

      this.buildDropdownCollections()

      this.listenTo(this.resultsView, 'resumeQuery', this.resumeQueryRequest)
      this.listenTo(this.historyCollection, 'setCurrentQuery', this.setCurrentQuery)
      this.listenTo(this.favoritesCollection, 'setCurrentQuery', this.setCurrentQuery)
    },

    template: Handlebars.templates['query/query_builder_layout'],

    className: 'query-builder',

    regions: {
      results: '.results-container',
      history: '.history-container',
      favorites: '.favorites-container'
    },

    events: {
      'click .run-query': 'sendQueryRequest',
      'click .save-query': 'saveQueryToFavorites',
      'click .query-history-container': 'toggleHistoryView',
      'click :not(.history-container, .open-history, .query-history-container)': 'hideHistoryView',
      'click .query-favorites-container': 'toggleFavoritesView',
      'click :not(.favorites-container, .open-favorites, .query-favorites-container)': 'hideFavoritesView'
    },

    presenterBindings: {
      '.status-message': 'statusMessage',
      '.save-query > i': {
        attributes: [{
          observe: 'savingQuery',
          name: 'class',
          onGet: function(isSaving) {
            return isSaving ? "fa-check" : "fa-save"
          }
        }]
      }
    },

    bindings: {
      '.query-field > textarea': 'query',
      ':el': {
        attributes: [{
          observe: 'isActive',
          name: 'class',
          onGet: function(isActive) {
            return isActive ? "" : "hide"
          }
        }]
      }
    },

    setCurrentQuery: function(query) {
      this.model.set("query", query)
      this.hideFavoritesView()
      this.hideHistoryView()
    },

    hideFavoritesView: function() {
      this.favorites.$el.hide()
    },

    toggleFavoritesView: function(e) {
      e.stopPropagation()
      this.favorites.$el.toggle()
    },

    hideHistoryView: function() {
      this.history.$el.hide()
    },

    toggleHistoryView: function(e) {
      e.stopPropagation()
      this.history.$el.toggle()
    },

    buildDropdownCollections: function() {
      var view = this
      localforage.getItem('queryHistory', function(err, value) {
        if (value) {
          value.forEach(function(query) {
            view.historyCollection.add({
              query: query
            })
          })
        }
      })
      localforage.getItem('queryFavorites', function(err, value) {
        if (value) {
          value.forEach(function(query) {
            view.favoritesCollection.add({
              query: query
            })
          })
        }
      })
    },

    saveQueryToFavorites: function() {
      var view = this
      addQueryToFavorites(this.model.get("query"), function() {
        if (view.favoritesCollection.length >= 10) view.favoritesCollection.shift()
        view.favoritesCollection.add(new Backbone.Model({query: view.model.get("query")}))
        view.presenterModel.set("savingQuery", true)
        setTimeout(function() {
          view.presenterModel.set("savingQuery", false)
        }, 2000)
      })
    },

    setStatusMessage: function() {
      var errorsStatus = this.presenterModel.get("errorMessage") ? "Errors; " : "No errors; ",
          rowsAffected = this.presenterModel.get("resultsArray").length + " rows affected"

      this.presenterModel.set("statusMessage", errorsStatus + rowsAffected)
    },

    resumeQueryRequest: function() {
      this.presenterModel.unset("pagingState")
      var view = this
      var onSuccess = function(results) {
        view.presenterModel.set({
          lazyLoading: false,
          resultsArray: view.presenterModel.get("resultsArray").concat(results.rows),
          pagingState: results.paging_state
        })
        view.model.set("pagingState", results.paging_state)
        view.setStatusMessage()
        view.presenterModel.trigger('newQueryResults')
      }
      var onFailure = function(err) {
        view.presenterModel.set({
          lazyLoading: false,
          errorMessage: err
        })
        view.presenterModel.unset("pagingState")
        view.model.unset("pagingState")
      }
      this.vent.trigger('query:makeRequest', this.model, onSuccess, onFailure)
    },

    sendQueryRequest: function() {
      this.presenterModel.set({
        loading: true,
        errorMessage: null,
        resultsArray: []
      })
      this.presenterModel.unset("pagingState")
      this.model.unset("pagingState")
      this.model.get("results").reset()
      this.resultsView.resultHeaders.reset()
      var view = this
      var onSuccess = function(results) {
        addQueryToHistory(view.model.get("query"), function() {
          if (view.historyCollection.length >= 10) view.historyCollection.shift()
          view.historyCollection.add(new Backbone.Model({query: view.model.get("query")}))
        })
        view.presenterModel.set({
          loading: false,
          resultsArray: results.rows,
          currentIndex: 0,
          lazyIteration: 0,
          pagingState: results.paging_state
        })
        view.model.set("pagingState", results.paging_state)
        view.setStatusMessage()
        view.presenterModel.trigger('newQueryResults')
      }

      var onFailure = function(err) {
        view.presenterModel.set({
          loading: false,
          errorMessage: err
        })
        view.presenterModel.unset("pagingState")
        view.model.unset("pagingState")
        view.setStatusMessage()
      }
      this.vent.trigger('sidebar:setSelectedKeyspace', this.model, onSuccess, onFailure)
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.results.show(this.resultsView)
      this.history.show(this.historyView)
      this.favorites.show(this.favoritesView)
      this.history.$el.hide()
      this.favorites.$el.hide()
      this.stickit()
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return QueryBuilderView
})