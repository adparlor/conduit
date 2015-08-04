(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['alerts/alert_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"alert alert-dismissible\" style=\"position: fixed; height: 50px;\">\n  <button type=\"button\" class=\"close\"><span>&times;</span></button>\n  <span class=\"alert-message\"></span>\n</div>";
},"useData":true});
templates['main_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"conduitLabel\">Conduit</div>\n<div id=\"alertsRegion\"></div>\n<div id=\"sidebarRegion\"></div>\n<div id=\"queryRegion\"></div>\n<div id=\"modalRegion\"></div>";
},"useData":true});
templates['modal/json_modal_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"modal fade\" id=\"jsonModal\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span>&times;</span></button>\n        <h4 class=\"modal-title\">"
    + this.escapeExpression(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"parsed-json\">"
    + ((stack1 = ((helper = (helper = helpers.json || (depth0 != null ? depth0.json : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"json","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn close-btn\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->";
},"useData":true});
templates['query/dropdowns/favorite_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper)));
},"useData":true});
templates['query/dropdowns/history_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return this.escapeExpression(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper)));
},"useData":true});
templates['query/dropdowns/query_favorites_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"clear-favorites\">Clear favorites</div>\n<div class=\"favorites-child-container\"></div>";
},"useData":true});
templates['query/dropdowns/query_history_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"clear-history\">Clear history</div>\n<div class=\"history-child-container\"></div>";
},"useData":true});
templates['query/queries_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['query/query_builder_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"query-field\">\n  <textarea spellcheck=\"false\"></textarea>\n  <div class=\"query-favorites-container\">\n    <button class=\"open-favorites btn\">Query Favorites <i class=\"fa fa-chevron-down\"></i></button>\n    <div class=\"favorites-container\"></div>\n  </div>\n  <div class=\"query-history-container\">\n    <button class=\"open-history btn\">Query History <i class=\"fa fa-chevron-down\"></i></button>\n    <div class=\"history-container\"></div>\n  </div>\n  <button class=\"run-query btn\">Run Query</button>\n  <button class=\"save-query btn\" data-toggle=\"tooltip\" data-delay='{\"show\": 500, \"hide\": 0}' title=\"Save query\"><i class=\"fa\"></i></button>\n</div>\n<div class=\"results-container\"></div>\n<div class=\"status-message\"></div>";
},"useData":true});
templates['query/query_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"tabsRegion\"></div>\n<div class=\"query-tab-button-container\">\n  <i class=\"add-query-tab fa fa-plus\" data-toggle=\"tooltip\" data-placement=\"left\" data-delay='{\"show\": 500, \"hide\": 0}' title=\"New tab\"></i>\n</div>\n<div id=\"queries\"></div>";
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
    return "<i class=\"fa fa-circle-o-notch fa-spin\"></i>\n<div class=\"error-container\">\n  <div class=\"error-message\"></div>\n</div>\n<table class=\"headers-container\">\n  <thead class=\"result-headers\"></thead>\n</table>\n<table class=\"rows-container\">\n  <tbody class=\"result-rows\"></tbody>\n</table>";
},"useData":true});
templates['query/tab_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<span class=\"close-tab\">&times;</span>\n<span class=\"tab-name\"></span>";
},"useData":true});
templates['sidebar/column_layout'] = template({"1":function(depth0,helpers,partials,data) {
    return "    <i class=\"fa fa-key\" style=\"font-weight:bold;\" data-toggle=\"tooltip\" data-delay='{\"show\": 500, \"hide\": 0}' title=\"Partitioning Key\"></i>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.clusterColumn : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "    <i class=\"fa fa-key\" data-toggle=\"tooltip\" data-delay='{\"show\": 500, \"hide\": 0}' title=\"Clustering Column\"></i>\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.secondaryIndex : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"7":function(depth0,helpers,partials,data) {
    return "    <i class=\"fa fa-hand-o-right\" data-toggle=\"tooltip\" data-delay='{\"show\": 500, \"hide\": 0}' title=\"Secondary Index\"></i>\n  ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<span class=\"column-name\">\n  <i class=\"fa fa-columns\" data-toggle=\"tooltip\" title=\"Column\"></i>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.primary : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n</span>\n<span class=\"pull-right\" data-toggle=\"tooltip\" data-delay='{\"show\":500, \"hide\":0}' title=\"Column type\">"
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true});
templates['sidebar/keyspace_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"keyspace-collapse-toggle\">\n  <span class=\"fa keyspace-collapse-icon\">\n  </span>\n  <span class=\"keyspace-name\"><i class=\"fa fa-database\" data-toggle=\"tooltip\" title=\"Keyspace\" data-delay='{\"show\": 500, \"hide\": 0}'></i>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n</span>\n<div class=\"tables-container\">\n</div>";
},"useData":true});
templates['sidebar/sidebar_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"keyspaceHeader\">Keyspaces</div>\n<div id=\"keyspacesContainer\"></div>";
},"useData":true});
templates['sidebar/table_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"table-collapse-toggle\">\n  <span class=\"fa table-collapse-icon\"></span>\n  <span class=\"table-name\"><i class=\"fa\" data-toggle=\"tooltip\" data-delay='{\"show\": 500, \"hide\": 0}' title=\"Table\"></i>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n</span>\n<div class=\"columns-container\"></div>";
},"useData":true});
})();