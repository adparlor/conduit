
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