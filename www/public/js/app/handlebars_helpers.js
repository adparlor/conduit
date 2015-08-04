
var buildTemplateForJSON = function(header, rowModel) {
  var finalTemplate = '<td class=" json-data result-data data-' + header +
                      '" onclick=\'openJSONModal({ "value": "' +  header + '"},' + rowModel[header] +
                       ')\'><div class="result-data-container">'

  return finalTemplate
}

var getRowTemplate = function(rowModel) {
  var finalTemplate = ''

  rowModel["headers"].forEach(function(header) {
    var currentDataValue = rowModel[header],
        currentDataTemplate = '<td class="result-data data-' + header + '"><div class="result-data-container">'

    if (header.indexOf("json") != -1) currentDataTemplate = buildTemplateForJSON(header, rowModel)

    if (currentDataValue) currentDataTemplate += currentDataValue

    currentDataTemplate += '</div></td>'
    finalTemplate += currentDataTemplate
  })

  return finalTemplate
}

Handlebars.registerHelper('displayTableRow', function(rowModel) {
  return getRowTemplate(rowModel)
})