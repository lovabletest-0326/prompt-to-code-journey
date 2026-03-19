import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-heading text-lg font-bold text-primary">Vibecoding</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Learn to build software with AI — no coding experience needed.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-heading font-semibold">Navigate</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/course" className="hover:text-foreground transition-colors">Course</Link>
            <Link to="/playground" className="hover:text-foreground transition-colors">Playground</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </nav>
        </div>
        <div>
          <h4 className="mb-3 font-heading font-semibold">Learn More</h4>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Community Gallery</span>
            <span>Help & FAQ</span>
            <span>About Vibecoding</span>
          </nav>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
        © 2026 Starting with Vibecoding. Built with ⚡ and AI.
      </div>
    </div>
  </footer>
);

export default Footer;
