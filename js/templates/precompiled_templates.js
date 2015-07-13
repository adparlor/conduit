(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"conduitLabel\">Conduit</div>\n<div id=\"sidebarRegion\"></div>\n<div id=\"queryRegion\"></div>";
},"useData":true});
templates['query/queries_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['query/query_builder_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['query/query_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"tabsRegion\"></div>\n<div id=\"queries\"></div>";
},"useData":true});
templates['query/result_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['query/results_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['query/tab_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<span class=\"tab-name\"></span>";
},"useData":true});
templates['sidebar/columns_layout'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"column-name\"><i class=\"fa fa-columns\"></i>"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>";
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