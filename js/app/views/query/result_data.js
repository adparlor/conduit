
define([], function() {

  var ResultDataView = Backbone.Marionette.ItemView.extend({
    initialize: function(options) {

    },

    template: Handlebars.templates['query/result_data_layout'],

    tagName: 'td',

    className: 'result-data',

    events: {

    },

    bindings: {
      '.result-data-container': {
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

    onDomRefresh: function() {
      this.model.trigger('sendCurrentWidth', this.$el.outerWidth(), this.model.collection.indexOf(this.model))
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.ItemView.prototype.render.call(this)
      this.stickit()
    }
  })

  return ResultDataView
})