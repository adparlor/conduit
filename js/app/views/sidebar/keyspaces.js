
define(['TablesView'], function(TablesView) {

  var KeyspacesView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("tables")
      this.presenterModel = new Backbone.Model({
        isCollapsed: true
      })
    },

    template: Handlebars.templates['sidebar/keyspaces_layout'],

    className: 'keyspace-row',

    childView: TablesView,

    childViewContainer: '.tables-container',

    events: {
      'click .keyspace-collapse-toggle': 'collapseTables'
    },

    presenterBindings: {
      'span.keyspace-collapse-icon': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "glyphicon-chevron-right" : "glyphicon-chevron-down"
          }
        }]
      },

      '.tables-container': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "hide" : ""
          }
        }]
      }
    },

    collapseTables: function(e) {
      e.stopPropagation()
      this.presenterModel.set("isCollapsed", !this.presenterModel.get("isCollapsed"))
    },

    onDestroy: function() {
      this.options = null
      this.collection = null
      this.model = null
    },

    render: function() {
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return KeyspacesView
})