
define([], function() {

  var JSONModalView = Backbone.Marionette.LayoutView.extend({
    initialize: function(options) {
      this.options = options

      this.model = new Backbone.Model({
        header: this.options.header['value'],
        json: this.syntaxHighlight(JSON.stringify(JSON.parse(this.options.jsonToDisplay), undefined, 4))
      })
    },

    template: Handlebars.templates['modal/json_modal_layout'],

    bindings: {

    },

    syntaxHighlight: function(json) {
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number'
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key'
              } else {
                  cls = 'string'
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean'
          } else if (/null/.test(match)) {
              cls = 'null'
          }
          return '<span class="' + cls + '">' + match + '</span>'
      })
    },

    events: {

    },

    onDestroy: function() {

    },

    render: function() {
      this.unstickit()
      Backbone.Marionette.LayoutView.prototype.render.call(this)
      this.stickit()
    }
  })

  return JSONModalView

})