
define([], function() {

  var ColumnView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
      this.presenterModel = new Backbone.Model()
    },

    template: Handlebars.templates['sidebar/column_layout'],

    className: 'column-row',

    events: {
      'mouseenter': 'showColumnType',
      'mouseleave': 'hideColumnType',
      'dblclick .column-name': 'openQueryStringPopover',
      'click .column-change-query': 'sendQueryForColumn',
      'click .close-popover': 'closeQueryStringPopover'
    },

    presenterBindings: {
      '.pull-right': {
        attributes: [{
          observe: 'showType',
          name: 'class',
          onGet: function(showType) {
            return showType ? "" : "hide"
          }
        }]
      }
    },

    bindings: {
      '.column-name': {
        attributes: [{
          observe: 'primary',
          name: 'style',
          onGet: function(isPrimary) {
            return isPrimary ? "font-weight: bold" : ""
          }
        }]
      }
    },

    setQueryString: function() {
      var queryString = 'SELECT * FROM ' + this.model.get("table") +
                        ' WHERE ' + this.model.get("name") + '='
      this.presenterModel.set("queryString", queryString)
    },

    closeQueryStringPopover: function() {
      this.$('.column-name').popover('hide')
    },

    openQueryStringPopover: function(e) {
      this.model.trigger('setActiveKeyspace')
      this.setQueryString()
      $('.popover').popover('hide')
      this.$('.column-name').popover('show')
      this.$('.arrow').css({left: "10%"})
      this.$('.popover').css({left: "-25px"})
      this.$('.popover-content').text(this.presenterModel.get("queryString"))
    },

    sendQueryForColumn: function() {
      this.options.vent.trigger('setCurrentQuery', this.presenterModel.get("queryString"))
      this.closeQueryStringPopover()
    },

    hideColumnType: function() {
      this.presenterModel.set("showType", false)
    },

    showColumnType: function() {
      this.presenterModel.set("showType", true)
    },

    onDestroy: function() {
      this.options = null
    },

    onDomRefresh: function() {
      this.$('.column-name').popover({
        trigger: 'manual',
        placement: 'bottom',
        template: '<div class="popover" role="tooltip">' +
                    '<div class="arrow"></div>' +
                    '<h3 class="popover-title"></h3>' +
                    '<span class="close-popover">&times;</span>' +
                    '<div class="popover-content"></div>' +
                    '<button class="btn column-change-query">Confirm</button>' +
                  '</div>'
      })
    },

    render: function(){
      this.unstickit()
      this.unstickit(this.presenterModel, this.presenterBindings)
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
      this.stickit(this.presenterModel, this.presenterBindings)
    }

  })

  return ColumnView
})