"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wouter_1 = require("wouter");
var queryClient_1 = require("./lib/queryClient");
var react_query_1 = require("@tanstack/react-query");
var toaster_1 = require("@/components/ui/toaster");
var tooltip_1 = require("@/components/ui/tooltip");
var not_found_1 = require("@/pages/not-found");
var Home_1 = require("@/pages/Home");
var Result_1 = require("@/pages/Result");
function Router() {
    return (<wouter_1.Switch>
      <wouter_1.Route path="/" component={Home_1.default}/>
      <wouter_1.Route path="/result/:id" component={Result_1.default}/>
      <wouter_1.Route component={not_found_1.default}/>
    </wouter_1.Switch>);
}
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient_1.queryClient}>
      <tooltip_1.TooltipProvider>
        <toaster_1.Toaster />
        <Router />
      </tooltip_1.TooltipProvider>
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
