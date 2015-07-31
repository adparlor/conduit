
define(['TableView'], function(TableView) {

  var KeyspaceView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("tables")

      this.childViewOptions = {
        vent: this.options.vent
      }
    },

    template: Handlebars.templates['sidebar/keyspace_layout'],

    className: 'keyspace-row',

    childView: TableView,

    childViewContainer: '.tables-container',

    events: {
      'click .keyspace-collapse-toggle': 'collapseTables'
    },

    bindings: {
      'span.keyspace-collapse-icon': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "fa-chevron-right" : "fa-chevron-down"
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
      },
      '.keyspace-name, .keyspace-collapse-icon': {
        attributes: [{
          observe: 'isActive',
          name: 'style',
          onGet: function(isActive) {
            return isActive ? "color: #2980b9" : ""
          }
        }]
      }
    },

    collapseTables: function(e) {
      // e.stopPropagation()
      this.model.set("isCollapsed", !this.model.get("isCollapsed"))
      this.model.trigger("makeActive", this.model)
    },

    onDestroy: function() {
      this.options = null
      this.collection = null
      this.model = null
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return KeyspaceView
})