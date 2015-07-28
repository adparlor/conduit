
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
      'mouseleave': 'hideColumnType'
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
      '.column-logo': {
        attributes: [{
          observe: ['primary', 'clusterColumn', 'secondaryIndex'],
          name: 'class',
          onGet: function(attrs) {
            if (attrs[0] || attrs[1]) return "fa-key"
            else if (attrs[2]) return "fa-hand-o-right"
          }
        }]
      },
      '.column-name, .column-name > .fa-key': {
        attributes: [{
          observe: 'primary',
          name: 'style',
          onGet: function(isPrimary) {
            return isPrimary ? "font-weight: bold" : ""
          }
        }]
      }
    },

    hideColumnType: function() {
      this.presenterModel.set("showType", false)
    },

    showColumnType: function() {
      this.presenterModel.set("showType", true)
    },

    onDestroy: function() {

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