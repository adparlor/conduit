
define(function() {

  var SystemStorage = {

    requestQuery: function(query) {
      return $.ajax({
        url: SYSTEM_API + "/queries",
        type: "POST",
        data: query
      })
    },

    getKeyspaces: function() {
      return $.ajax({
        url: SYSTEM_API + "/keyspaces"
      })
    }
  }

  return SystemStorage

})