
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
      '.column-name, .column-name > .fa-key': {
        attributes: [{
          observe: 'primary',
          name: 'style',
          onGet: function(isPrimary) {
            return isPrimary ? "font-weight: bold" : ""
          }
        }]
      },
      '.fa-key': {
        attributes: [{
          observe: ['primary', 'clusterColumn'],
          name: 'class',
          onGet: function(attrs) {
            return attrs[0] || attrs[1] ? "" : "hide"
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