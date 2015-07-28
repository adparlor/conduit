
define([], function() {

  var TabView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/tab_layout'],

    className: "query-tab",

    events: {
      'click': 'toggleActive',
      'click .close-tab': 'destroyQuery'
    },

    bindings: {
      '.tab-name': {
        observe: 'query',
        onGet: function(query) {
          return query ? query : "Untitled"
        }
      },
      ':el': {
        attributes: [{
          observe: 'isActive',
          name: 'class',
          onGet: function(isActive) {
            return isActive ? "active" : ""
          }
        }]
      }
    },

    destroyQuery: function(e) {
      e.stopPropagation()
      var tabsCollection = this.model.collection
      this.model.destroy()
      if (tabsCollection.length) tabsCollection.at(0).set("isActive", true)
    },

    toggleActive: function() {
      this.model.collection.each(function(model) {
        model.set("isActive", false)
      })
      this.model.set("isActive", true)
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

  return TabView
})