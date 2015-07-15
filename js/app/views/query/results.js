
define(['ResultHeadersView', 'ResultRowsView'], function(ResultHeadersView, ResultRowsView) {

  var ResultsView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.resultsCollection = this.options.results
      this.resultHeaders = new Backbone.Collection()
      // this.resultRows = new Backbone.Collection()
      this.model = new Backbone.Model()
      this.resultHeadersView = new ResultHeadersView({
        collection: this.resultHeaders
      })
      this.resultRowsView = new ResultRowsView({
        collection: this.resultsCollection
      })

      this.listenTo(this.resultsCollection, 'reset', this.setHeadersAndOrderRowData)
      this.listenTo(this.resultsCollection, 'sendCurrentWidth', this.setGreatestWidthForHeader)
      this.listenTo(this.resultRowsView, 'resultsChange', this.dynamicResize)
    },

    template: Handlebars.templates['query/results_layout'],

    className: 'results-table',

    regions: {
      'headers': '.result-headers',
      'rows': '.result-rows'
    },

    events: {

    },

    bindings: {

    },

    setGreatestWidthForHeader(width, index) {
      var currentHeader = this.resultHeaders.at(index)

      if (currentHeader.get("width") < width) currentHeader.set("width", width)
    },

    assignHeaderModelsInitialWidths: function() {
      this.resultHeaders.each(function(header, index) {
        var currentHeaderWidth = $(this.resultHeadersView.el.childNodes[index]).outerWidth()
        header.set("width", currentHeaderWidth)
      }, this)
    },

    dynamicResize: function() {
      // FIRST LOOP THROUGH AND GET GREATEST WIDTH & SET HEADER WIDTH
      _.each(this.resultRowsView.el.childNodes, function(tr) {
        this.resultHeaders.each(function(header, index) {
          var currentRowDataWidth = $($(tr).children()[index]).outerWidth()
          if (header.get("width") < currentRowDataWidth)
            header.set("width", currentRowDataWidth)
        }, this)
      }, this)
      // SECOND LOOP THROUGH AND SET WIDTH TO DATA
      this.resultsCollection.each(function(result) {
        this.resultHeaders.each(function(header, index) {
          result.get("tableDataCollection").at(index).set("width", header.get("width"))
        })
      }, this)
    },

    setHeadersAndOrderRowData: function() {
      var view = this

      var setHeadersCollection = function() {
        view.resultsCollection.each(function(result) {
          result.get("tableDataCollection").each(function(data) {
            var dataHeader = data.get("header")
            if (!view.resultHeaders.findWhere({header: dataHeader}))
              view.resultHeaders.add(new Backbone.Model({header: dataHeader}))
          })
        })
      }
      setHeadersCollection()

      var fillInResultRowBlanks = function () {
        view.resultsCollection.each(function(row) {
          view.resultHeaders.each(function(header, index) {
            var currentHeaderDataModel = row.get("tableDataCollection").findWhere({header: header.get("header")})
            if (!(currentHeaderDataModel && row.get("tableDataCollection").indexOf(currentHeaderDataModel) == index)) {
              row.get("tableDataCollection").add(new Backbone.Model({
                header: header.get("header"),
                value: "Undefined"
              }), { at: index })
            }
          })
        })
      }
      fillInResultRowBlanks()
      this.assignHeaderModelsInitialWidths()
    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.headers.show(this.resultHeadersView)
      this.rows.show(this.resultRowsView)
      this.stickit()
    }
  })

  return ResultsView
})