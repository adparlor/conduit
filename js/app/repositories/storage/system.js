define([], function() {

  var SystemStorage = {

    requestQuery: function(query) {
      return $.ajax({
        url: window.env.SYSTEM_API + "/query",
        type: "POST",
        data: query
      })
    }
  }

  return SystemStorage

})