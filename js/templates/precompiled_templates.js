(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"conduitLabel\">Conduit</div>\n<div id=\"sidebarRegion\"></div>\n<div id=\"queryRegion\"></div>\n<div id=\"modalRegion\"></div>";
},"useData":true});
templates['modal/json_modal_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"modal fade\" id=\"jsonModal\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">"
    + this.escapeExpression(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"parsed-json\">"
    + ((stack1 = ((helper = (helper = helpers.json || (depth0 != null ? depth0.json : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"json","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn close-btn\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
},"useData":true});
templates['query/queries_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['query/query_builder_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"query-field\">\n  <textarea spellcheck=\"false\"></textarea>\n  <button class=\"run-query btn\">Run Query</button>\n</div>\n<div class=\"resultsRegion\"></div>";
},"useData":true});
templates['query/query_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"tabsRegion\"></div>\n<div id=\"queries\"></div>";
},"useData":true});
templates['query/results/result_header_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"result-header-container\">"
    + this.escapeExpression(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});
templates['query/results/result_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.displayTableRow || (depth0 && depth0.displayTableRow) || helpers.helperMissing).call(depth0,depth0,{"name":"displayTableRow","hash":{},"data":data})) != null ? stack1 : "");
},"useData":true});
templates['query/results/results_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<i class=\"fa fa-spinner fa-spin\"></i>\n<table class=\"headers-container\">\n  <thead class=\"result-headers\"></thead>\n</table>\n<table class=\"results-container\">\n  <tbody class=\"result-rows\"></tbody>\n</table>";
},"useData":true});
templates['query/tab_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<span class=\"tab-name\"></span>";
},"useData":true});
templates['sidebar/columns_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<span class=\"column-name\">\n  <i class=\"fa fa-columns\"></i>\n  <i class=\"fa fa-key\"></i>\n  "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n</span>\n<span class=\"pull-right\">"
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true});
templates['sidebar/keyspaces_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"keyspace-collapse-toggle\">\n  <span class=\"glyphicon keyspace-collapse-icon\">\n  </span>\n  <span class=\"keyspace-name\"><i class=\"fa fa-database\"></i>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n</span>\n<div class=\"tables-container\">\n</div>";
},"useData":true});
templates['sidebar/sidebar_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"keyspaceHeader\">Keyspaces</div>\n<div id=\"keyspacesContainer\"></div>";
},"useData":true});
templates['sidebar/tables_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"table-collapse-toggle\">\n  <span class=\"glyphicon table-collapse-icon\"></span>\n  <span class=\"table-name\"><i class=\"fa\"></i>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n</span>\n<div class=\"columns-container\"></div>";
},"useData":true});
})();