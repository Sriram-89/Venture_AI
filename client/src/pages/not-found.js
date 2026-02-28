"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var wouter_1 = require("wouter");
var button_1 = require("@/components/ui/button");
function NotFound() {
    return (<div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <card_1.Card className="w-full max-w-md mx-4 shadow-xl border-orange-100">
        <card_1.CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <lucide_react_1.AlertCircle className="h-8 w-8 text-orange-500"/>
            <h1 className="text-2xl font-bold text-gray-900 font-display">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 mb-6 font-body">
            Did you take a wrong turn? Like a startup pivoting too early, this page doesn't exist yet.
          </p>
          
          <wouter_1.Link href="/">
            <button_1.Button className="w-full bg-orange-600 hover:bg-orange-700">
              Return Home
            </button_1.Button>
          </wouter_1.Link>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
