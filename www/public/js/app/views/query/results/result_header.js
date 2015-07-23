
define([], function() {

  var ResultHeaderView = Backbone.Marionette.ItemView.extend({
    initialize: function() {

    },

    template: Handlebars.templates['query/results/result_header_layout'],

    tagName: 'th',

    events: {

    },

    bindings: {
      '.result-header-container': {
        attributes: [{
          observe: 'width',
          name: 'style',
          onGet: function(width) {
            return "width: " + width + "px"
          }
        }]
      }
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return ResultHeaderView
})