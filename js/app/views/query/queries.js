
define(['QueryBuilder'], function(QueryBuilder) {

  var QueriesView = Backbone.Marionette.CompositeView.extend({
    initialize: function(options) {
      this.options = options
      this.model = new Backbone.Model()
    },

    template: Handlebars.templates['query/queries_layout'],

    childView: QueryBuilder,

    events: {

    },

    bindings: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.CompositeView.prototype.render.call(this)
      this.stickit()
    }
  })

  return QueriesView
})