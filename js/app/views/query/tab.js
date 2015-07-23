
define([], function() {

  var TabView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['query/tab_layout'],

    className: "query-tab",

    events: {
      'click': 'toggleActive'
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

    toggleActive: function() {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return TabView
})