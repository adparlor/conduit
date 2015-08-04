
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
        observe: ['title', 'query'],
        onGet: function(attrs) {
          return attrs[0] || attrs[1] || "Untitled"
        },
        onSet: function(value, options) {
          if ((this.model.get(options.observe[1]) != value) || (!value))
            this.model.set(options.observe[0], value)
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

    changeTitle: function(e) {

    },

    destroyQuery: function(e) {
      e.stopPropagation()
      var tabsCollection = this.model.collection
      this.model.destroy()
      if (tabsCollection.length) tabsCollection.at(tabsCollection.length - 1).set("isActive", true)
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