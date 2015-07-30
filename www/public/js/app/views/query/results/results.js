
define(['ResultHeadersView', 'ResultRowsView', 'SystemDeserializer'],
function(ResultHeadersView, ResultRowsView, SystemDeserializer) {

  var ResultsView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options
      this.resultsCollection = this.options.results
      this.lazyResultsBlock = 100
      this.resultHeaders = new Backbone.Collection()
      this.model = this.options.model
      this.resultHeadersView = new ResultHeadersView({
        collection: this.resultHeaders
      })
      this.resultRowsView = new ResultRowsView({
        collection: this.resultsCollection
      })

      this.listenTo(this.resultRowsView, 'collection:rendered', this.dynamicResize)
      this.listenTo(this.model, 'newQueryResults', this.lazyRenderCollection)
    },

    template: Handlebars.templates['query/results/results_layout'],

    className: 'results-table',

    regions: {
      'headers': '.result-headers',
      'rows': '.result-rows',
      'status': '.status-container'
    },

    events: {
      'scroll': 'triggerLazyRender'
    },

    bindings: {
      '.fa-circle-o-notch': {
        attributes: [{
          observe: ['loading', 'lazyLoading'],
          name: 'class',
          onGet: function(attrs) {
            return attrs[0] || attrs[1] ? "" : "hide"
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
      },
      '.error-message': {
        observe: 'errorMessage',
        updateMethod: 'html',
        onGet: 'formatErrorMessage'
      },
      ':el': {
        attributes: [{
          observe: 'errorMessage',
          name: 'style',
          onGet: function(err) {
            return err ? "background-color: #FDEDEC" : ""
          }
        }]
      }
    },

    formatErrorMessage: function(message) {
      if (message) return "<b>" + message.errorClass + "</b><br>" + message.errorMessage
    },

    lazyRenderCollection: function() {
      var currentIndex = this.model.get("currentIndex"),
          resultsToAdd = this.model.get("resultsArray").slice(currentIndex, currentIndex + this.lazyResultsBlock),
          collectionToAdd = SystemDeserializer.deserializeQueryResponse(resultsToAdd)

      if (this.model.get("lazyIteration") == 0) this.setHeadersCollection(collectionToAdd)

      if (collectionToAdd.length) {
        this.resultsCollection.add(collectionToAdd.models)
        this.model.set({
          currentIndex: this.resultsCollection.length,
          lazyIteration: this.model.get("lazyIteration") + 1
        })
      } else if (this.model.get("pagingState")) {
        this.trigger('resumeQuery')
      }
      this.model.set("lazyLoading", false)
    },

    triggerLazyRender: function(e) {
      e.stopPropagation()
      var topOfResults = this.$el.scrollTop(),
          rowHeight = 25,
          resultsBlockHeight = rowHeight * this.lazyResultsBlock,
          currentResultsHeight = (this.model.get("lazyIteration") * resultsBlockHeight) - this.$el.height(),
          currentHeaderPositionTop = parseInt(this.$('.headers-container').css('top'), 10),
          view = this

      if (currentResultsHeight < topOfResults && !this.model.get("lazyLoading")) {
        this.model.set("lazyLoading", true)
        this.lazyRenderCollection()
      }

      if (currentHeaderPositionTop != topOfResults) {
        view.$('.headers-container').hide()
        setTimeout(function() {
          view.$('.headers-container').css({top: topOfResults})
          view.$('.headers-container').show()
        }, 25)
      }
    },

    assignHeaderModelsInitialWidths: function() {
      this.resultHeaders.each(function(header, index) {
        var currentHeaderWidth = $(this.resultHeadersView.el.childNodes[index]).outerWidth()
        header.set("width", currentHeaderWidth)
      }, this)
    },

    dynamicResize: function() {
      this.resultHeaders.each(function(header) {
        var dataForHeader = this.$('.data-' + header.get("header") + ' > div')

        if (header.get("header").indexOf('_json') != -1) {
          dataForHeader.css({"max-width": 400})
        }

        var dataWidth = dataForHeader.outerWidth()

        if (header.get("width") < dataWidth) header.set("width", dataWidth)
        else if (header.get("width") > dataWidth) dataForHeader.outerWidth(header.get("width"))
      }, this)
    },

    setHeadersCollection: function(collection) {
      var headersCollection = new Backbone.Collection()
      collection.at(0).get("headers").forEach(function(header) {
        headersCollection.add(new Backbone.Model({
          header: header
        }))
      })
      this.resultHeaders.reset(headersCollection.models)
      this.assignHeaderModelsInitialWidths()
    },

    fillInResultRowBlanks: function() {
      this.resultsCollection.each(function(row) {
        this.resultHeaders.each(function(header, index) {
          var currentHeaderDataModel = row.get("tableDataCollection").findWhere({header: header.get("header")})
          if (!(currentHeaderDataModel && row.get("tableDataCollection").indexOf(currentHeaderDataModel) == index)) {
            row.get("tableDataCollection").add(new Backbone.Model({
              header: header.get("header"),
              value: "Undefined"
            }), { at: index })
          }
        })
      })
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