
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