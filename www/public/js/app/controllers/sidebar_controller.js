
define(['SidebarView', 'SystemRepo'],
function(SidebarView, SystemRepo) {

  var SidebarController = Backbone.Marionette.Object.extend({
    initialize: function(options) {
      this.options = options
      this.keyspaceCollection = new Backbone.Collection()
      var sidebarView = new SidebarView({
            vent: this.options.vent,
            collection: this.keyspaceCollection
          })

      this.options.sidebarRegion.show(sidebarView)
      this.requestSidebarHierarchy()

      this.listenTo(this.options.vent, 'sidebar:setSelectedKeyspace', this.setSelectedKeyspace)
    },

    setSelectedKeyspace: function(queryModel, successCallback, failureCallback) {
      var selectedKeyspace = this.keyspaceCollection.findWhere({isActive: true}).get("name")
      queryModel.set("keyspace", selectedKeyspace)

      this.options.vent.trigger('queries:makeRequest', queryModel, successCallback, failureCallback)
    },

    requestSidebarHierarchy: function() {
      var view = this
      var onSuccess = function(hierarchy) {
        view.keyspaceCollection.reset(hierarchy.models)
      }

      var onFailure = function(err) {

      }

      SystemRepo.getKeyspaceHierarchy()
        .done(onSuccess)
        .fail(onFailure)
    }

  })

  return SidebarController
})
