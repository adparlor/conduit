
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
      'click .table-collapse-toggle': 'collapseColumns'
    },

    presenterBindings: {
      'span.table-collapse-icon': {
        attributes: [{
          observe: 'isCollapsed',
          name: 'class',
          onGet: function(isCollapsed) {
            return isCollapsed ? "glyphicon-chevron-right" : "glyphicon-chevron-down"
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

    collapseColumns: function(e) {
      e.stopPropagation()
      this.presenterModel.set("isCollapsed", !this.presenterModel.get("isCollapsed"))
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return TableView
})