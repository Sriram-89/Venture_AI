"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = Navbar;
var wouter_1 = require("wouter");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function Navbar() {
    return (<nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <wouter_1.Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-500 p-2 rounded-lg group-hover:bg-orange-600 transition-colors">
              <lucide_react_1.Rocket className="h-6 w-6 text-white"/>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-secondary">
              Idea<span className="text-orange-500">Validator</span>.in
            </span>
          </wouter_1.Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors">How it Works</a>
            <a href="#examples" className="text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors">Success Stories</a>
            <wouter_1.Link href="/">
              <button_1.Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20">
                Validate Now
              </button_1.Button>
            </wouter_1.Link>
          </div>

          <div className="md:hidden">
            <button_1.Button variant="ghost" size="icon">
              <lucide_react_1.Menu className="h-6 w-6"/>
            </button_1.Button>
          </div>
        </div>
      </div>
    </nav>);
}
