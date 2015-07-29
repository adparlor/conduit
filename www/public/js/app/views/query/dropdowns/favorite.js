
define(function() {

  var FavoriteView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/dropdowns/favorite_layout'],

    className: 'favorite-child',

    bindings: {

    },

    events: {
      'click': 'setCurrentQuery'
    },

    setCurrentQuery: function(e) {
      e.stopPropagation()
      this.model.trigger('setCurrentQuery', this.model.get("query"))
    },

    onDestroy: function() {
      this.options = null
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return FavoriteView
})