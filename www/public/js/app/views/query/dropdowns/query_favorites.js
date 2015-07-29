
define(['FavoriteView'], function(FavoriteView) {

  var QueryFavoritesView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
    },

    template: Handlebars.templates['query/dropdowns/query_favorites_layout'],

    childView: FavoriteView,

    childViewContainer: '.favorites-child-container',

    bindings: {

    },

    events: {
      'click .clear-favorites': 'clearQueryFavorites'
    },

    clearQueryFavorites: function() {
      var view = this
      localforage.setItem('queryFavorites', [], function(err, value) {
        view.collection.reset()
      })
    },

    onDestroy: function() {
      this.options = null
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return QueryFavoritesView
})