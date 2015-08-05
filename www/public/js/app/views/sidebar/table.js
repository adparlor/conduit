
define(['ColumnView'], function(ColumnView) {

  var TableView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("columns")
      this.presenterModel = new Backbone.Model({
        isCollapsed: true
      })

      this.childViewOptions = {
        vent: this.options.vent
      }
    },

    template: Handlebars.templates['sidebar/table_layout'],

    childView: ColumnView,

    childViewContainer: '.columns-container',

    className: 'table-row',

    events: {
      'click .table-collapse-toggle': 'collapseColumns',
      'dblclick .table-collapse-toggle': 'openQueryStringPopover',
      'click .table-change-query': 'sendQueryForTable',
      'click .close-popover': 'closeQueryStringPopover'
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

    setQueryString: function() {
      var queryString = 'SELECT * FROM ' + this.model.get("name")
      this.presenterModel.set("queryString", queryString)
    },

    closeQueryStringPopover: function() {
      this.$('.table-collapse-toggle').popover('hide')
    },

    openQueryStringPopover: function(e) {
      this.model.trigger('setActiveKeyspace')
      this.presenterModel.set("isCollapsed", false)
      this.setQueryString()
      $('.popover').popover('hide')
      this.$('.table-collapse-toggle').popover('show')
      this.$('.popover').css({left: "30px"})
      this.$('.arrow').css({left: "10%"})
      this.$('.popover-content').text(this.presenterModel.get("queryString"))
    },

    sendQueryForTable: function() {
      this.options.vent.trigger('setCurrentQuery', this.presenterModel.get("queryString"))
      this.closeQueryStringPopover()
    },

    collapseColumns: function(e) {
      this.presenterModel.set("isCollapsed", !this.presenterModel.get("isCollapsed"))
    },

    onDestroy: function() {
      this.options = null
    },

    onDomRefresh: function() {
      this.$('.table-collapse-toggle').popover({
        trigger: 'manual',
        placement: 'bottom',
        template: '<div class="popover" role="tooltip">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title"></h3>' +
                    '<span class="close-popover">&times;</span>' +
                    '<div class="popover-content"></div>' +
                    '<button class="btn table-change-query">Confirm</button>' +
                  '</div>'
      })
    },

    render: function() {
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit(this.presenterModel, this.presenterBindings)
    }
  })

  return TableView
})