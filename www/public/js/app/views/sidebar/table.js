
define(['ColumnView'], function(ColumnView) {

  var TableView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("columns")
      this.presenterModel = new Backbone.Model({
        isCollapsed: true
      })
    },

    template: Handlebars.templates['sidebar/table_layout'],

    childView: ColumnView,

    childViewContainer: '.columns-container',

    className: 'table-row',

    events: {
      'click .table-collapse-toggle': 'collapseColumns',
      'dblclick .table-collapse-toggle': 'useDefaultQueryForTable'
    },

    presenterBindings: {
      'span.table-collapse-icon': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "fa-chevron-right" : "fa-chevron-down"
          }
        }]
      },
      '.columns-container': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "hide" : ""
          }
        }]
      },
      '.table-name > .fa': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "fa-folder" : "fa-folder-open"
          }
        }]
      }
    },

    useDefaultQueryForTable: function() {
      var queryString = 'SELECT * FROM ' + this.model.get("keyspace") + '.' + this.model.get("name") + ';'
      this.presenterModel.set("isCollapsed", false)
      this.model.trigger('setActiveKeyspace')
      this.options.vent.trigger('setCurrentQuery', queryString)
    },

    collapseColumns: function(e) {
      this.presenterModel.set("isCollapsed", !this.presenterModel.get("isCollapsed"))
    },

    onDestroy: function() {
      this.options = null
    },

    render: function() {
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return TableView
})