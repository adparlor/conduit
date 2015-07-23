
define([], function() {

  var DataTableHelpers = {

    getRowTemplate: function(rowModel) {
      var finalTemplate = ''

      rowModel.get("headers").forEach(function(header) {
        var currentDataValue = rowModel.get(header),
            currentDataTemplate = '<td class="result-data"><div class="result-data-container">'

        if (currentDataValue) currentDataTemplate += currentDataValue

        currentDataTemplate += '</div></td>'
        finalTemplate += currentDataTemplate
      })

      return finalTemplate
    }

  }

  return DataTableHelpers
})