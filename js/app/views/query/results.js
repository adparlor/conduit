
define(['ResultHeadersView', 'ResultRowsView', 'SystemDeserializer'],
function(ResultHeadersView, ResultRowsView, SystemDeserializer) {

  var ResultsView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.resultsCollection = this.options.results
      this.lazyResultsBlock = 50
      this.resultHeaders = new Backbone.Collection()
      this.model = this.options.model
      this.resultHeadersView = new ResultHeadersView({
        collection: this.resultHeaders
      })
      this.resultRowsView = new ResultRowsView({
        collection: this.resultsCollection
      })

      this.listenTo(this.resultsCollection, 'reset add', this.setHeadersAndOrderRowData)
      this.listenTo(this.resultsCollection, 'sendCurrentWidth', this.setGreatestWidthForHeader)
      this.listenTo(this.resultRowsView, 'collection:rendered', this.dynamicResize)
      this.listenTo(this.model, 'change:resultsArray', this.lazyRenderCollection)
    },

    template: Handlebars.templates['query/results_layout'],

    className: 'results-table',

    regions: {
      'headers': '.result-headers',
      'rows': '.result-rows'
    },

    events: {
      'scroll': 'triggerLazyRender'
    },

    bindings: {
      '.fa-spinner': {
        attributes: [{
          observe: 'loading',
          name: 'class',
          onGet: function(loading) {
            return loading ? "" : "hide"
          }
        }]
      },
      'table': {
        attributes: [{
          observe: 'loading',
          name: 'class',
          onGet: function(loading) {
            return loading ? "hide" : ""
          }
        }]
      }
    },

    lazyRenderCollection: function() {
      var currentIndex = this.model.get("currentIndex"),
          resultsToAdd = this.model.get("resultsArray").slice(currentIndex, currentIndex + this.lazyResultsBlock)

      this.model.set("lazyLoading", true)
      this.resultsCollection.add(SystemDeserializer.deserializeQueryResponse(resultsToAdd).models)
      this.model.set("currentIndex", this.resultsCollection.length)
      this.model.set("lazyIteration", this.model.get("lazyIteration") + 1)
      this.model.set("lazyLoading", false)
    },

    triggerLazyRender: function(e) {
      e.stopPropagation()
      var topOfResults = this.$el.scrollTop(),
          rowHeight = 25,
          resultsBlockHeight = rowHeight * this.lazyResultsBlock,
          currentResultsHeight = (this.model.get("lazyIteration") * resultsBlockHeight) - this.$el.height(),
          view = this

      // this.$('.headers-container').css({top: topOfResults})
      if (currentResultsHeight < topOfResults && !this.model.get("lazyLoading")) {
        this.model.set("lazyLoading", true)
        this.lazyRenderCollection()
      }

      // view.$('.headers-container').hide()
      // setTimeout(function() {
      //   view.$('.headers-container').css({top: topOfResults})
      //   view.$('.headers-container').show()
      // }, 25)
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
      this.resultsCollection.each(function(result) {
        this.resultHeaders.each(function(header, index) {
          result.get("tableDataCollection").at(index).set("width", header.get("width"))
        })
      }, this)
    },

    setHeadersAndOrderRowData: function() {
      var view = this

      var setHeadersCollection = function() {
        var headersCollection = new Backbone.Collection()
        view.resultsCollection.each(function(result) {
          result.get("tableDataCollection").each(function(data) {
            var dataHeader = data.get("header")
            if (!headersCollection.findWhere({header: dataHeader}))
              headersCollection.add(new Backbone.Model({header: dataHeader}))
          })
        })
        view.resultHeaders.reset(headersCollection.models)
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
      this.options = null
      this.resultsCollection = null
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