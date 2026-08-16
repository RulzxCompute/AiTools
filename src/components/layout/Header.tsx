import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { Menu, X, Search, Sun, Moon, Github, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchCommand } from '../search/SearchCommand';
import { appConfig } from '../../config/app';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
  searchIsOpen: boolean;
  onSearchToggle: () => void;
}

export function Header({ onMenuClick, isMobile, searchIsOpen, onSearchToggle }: HeaderProps) {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) {
        setTheme(saved);
        document.documentElement.classList.toggle('light', saved === 'light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <header className={cn(
      'fixed top-0 right-0 z-30 h-16 bg-surface/95 backdrop-blur-sm border-b border-border transition-all duration-200',
      isMobile ? 'left-0 lg:left-16' : 'left-16 lg:left-64'
    )}>
      <div className="flex h-full items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-text-muted hover:text-text"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-subtle" />
            <button
              onClick={onSearchToggle}
              className="w-full pl-10 pr-4 py-2 text-sm bg-surface-elevated border border-border rounded-lg text-text placeholder-text-subtle hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-left"
              aria-label="Search (⌘K)"
            >
              <span className="flex items-center gap-2">
                <span>Search...</span>
                <kbd className="px-1.5 py-0.5 font-mono bg-surface border border-border rounded text-text-subtle">⌘K</kbd>
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-text-muted hover:text-text"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Link
            to="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-elevated transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>

          <Link
            to={appConfig.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-elevated transition-colors"
            aria-label="Author Profile"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <SearchCommand
        isOpen={searchIsOpen}
        onClose={onSearchToggle}
        onSearch={(query) => []}
      />
    </header>
  );
}
