
define([], function() {

  var ColumnsView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {
      this.options = options
    },

    template: Handlebars.templates['sidebar/columns_layout'],

    className: 'column-row',

    events: {

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

    onDestroy: function() {

    },

    render: function(){
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }

  })

  return ColumnsView
})