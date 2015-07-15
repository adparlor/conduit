
define(['ResultDataView'], function(ResultDataView) {

  var ResultRowView = Backbone.Marionette.CollectionView.extend({
    initialize: function(options) {
      this.options = options
      this.collection = this.model.get("tableDataCollection")
      this.listenTo(this.collection, 'sendCurrentWidth', this.sendCurrentWidth)
    },

    // template: Handlebars.templates['query/result_layout'],

    tagName: 'tr',

    className: 'result-row',

    childView: ResultDataView,

    events: {

    },

    bindings: {

    },

    sendCurrentWidth: function(width, columnIndex) {
      this.model.trigger('sendCurrentWidth', width, columnIndex)
    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CollectionView.prototype.render.call(this)
      this.stickit()
    }
  })

  return ResultRowView
})