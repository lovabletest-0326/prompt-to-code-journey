import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const { theme, toggle } = useTheme();
  const { user, logout, setShowAuth } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/course', label: 'Course' },
    { to: '/playground', label: 'Playground' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-heading text-xl font-bold text-primary">Vibecoding</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm font-medium">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => setShowAuth('login')}
            >
              Sign In
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(l.to) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-muted-foreground"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            ) : (
              <Button size="sm" onClick={() => { setShowAuth('login'); setMenuOpen(false); }}>
                Sign In
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
