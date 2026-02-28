import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">IdeaValidator.in</h3>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Empowering Indian entrepreneurs with AI-driven insights to build the next generation of unicorns.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-orange-400">Resources</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="https://www.startupindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Startup India</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Funding Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Research</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-green-400">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} IdeaValidator.in. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-secondary-foreground/50">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
