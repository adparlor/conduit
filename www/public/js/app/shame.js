
window.addQueryToHistory = function(query, successCallback) {
  localforage.getItem('queryHistory', function(err, value) {
    var currentQueryHistory = value || []
    if (currentQueryHistory.indexOf(query) == -1) {
      if (currentQueryHistory.length >= 10) currentQueryHistory.splice(0, 1)
      currentQueryHistory.push(query)

      localforage.setItem('queryHistory', currentQueryHistory)
      if (successCallback) successCallback()
    }
  })
}

window.addQueryToFavorites = function(query, successCallback) {
  localforage.getItem('queryFavorites', function(err, value) {
    var currentQueryFavorites = value || []
    if (currentQueryFavorites.indexOf(query) == -1) {
      if (currentQueryFavorites.length >= 10) currentQueryFavorites.splice(0, 1)
      currentQueryFavorites.push(query)

      localforage.setItem('queryFavorites', currentQueryFavorites)
      if (successCallback) successCallback()
    }
  })
}

$(document).ready(function() {
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body'
  })
})