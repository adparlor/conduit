
define(function() {

  var SystemStorage = {

    requestQuery: function(query) {
      return $.ajax({
        url: SYSTEM_API + "/queries",
        type: "POST",
        data: query
      })
    },

    getKeyspaceHierarchy: function() {
      return $.ajax({
        url: SYSTEM_API + "/hierarchy"
      })
    }
  }

  return SystemStorage

})