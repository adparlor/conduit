
var getRowTemplate = function(rowModel) {
  var finalTemplate = ''

  rowModel["headers"].forEach(function(header) {
    var currentDataValue = rowModel[header],
        currentDataTemplate = '<td class="result-data data-' + header + '"><div class="result-data-container">'

    if (currentDataValue) currentDataTemplate += currentDataValue

    currentDataTemplate += '</div></td>'
    finalTemplate += currentDataTemplate
  })

  return finalTemplate
}

Handlebars.registerHelper('displayTableRow', function(rowModel) {
  return getRowTemplate(rowModel)
})