import { Link } from "wouter";
import { Rocket, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-orange-500 p-2 rounded-lg group-hover:bg-orange-600 transition-colors">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-secondary">
              Idea<span className="text-orange-500">Validator</span>.in
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors">How it Works</a>
            <a href="#examples" className="text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors">Success Stories</a>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20">
                Validate Now
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
