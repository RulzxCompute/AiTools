import { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { getIcon } from '../../utils/icons';
import { navigationConfig } from '../../config/navigation';
import { ChevronLeft, ChevronRight, LayoutDashboard, Menu, X, Settings, Sun, Moon, Github } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchCommand } from '../search/SearchCommand';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNav = navigationConfig.filter(item => item.group === 'main');
  const resourceNav = navigationConfig.filter(item => item.group === 'resources');
  const templateNav = navigationConfig.filter(item => item.group === 'templates');
  const metaNav = navigationConfig.filter(item => item.group === 'meta');

  const renderNavItem = (item: typeof navigationConfig[0]) => {
    const Icon = getIcon(item.icon);
    const isActive = location.pathname === item.slug || (item.slug !== '/' && location.pathname.startsWith(item.slug));
    
    return (
      <NavLink
        key={item.slug}
        to={item.slug}
        className={cn(
          'sidebar-link',
          isActive && 'sidebar-link-active',
          isCollapsed && 'justify-center px-2'
        )}
        title={isCollapsed ? item.title : undefined}
        onClick={() => isMobile && onToggle()}
      >
        {Icon && <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />}
        {!isCollapsed && <span className="truncate">{item.title}</span>}
      </NavLink>
    );
  };

  const renderNavGroup = (title: string, items: typeof navigationConfig) => (
    <div className={cn('space-y-1', isCollapsed && 'hidden')}>
      <h3 className="px-3 py-2 text-xs font-semibold text-text-subtle uppercase tracking-wider">
        {title}
      </h3>
      {items.map(renderNavItem)}
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-full bg-surface border-r border-border transition-all duration-200 flex flex-col',
          isMobile
            ? 'w-64 transform lg:hidden'
            : isCollapsed
            ? 'w-16'
            : 'w-64 lg:w-64'
        )}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-text" aria-label="AiTools Home">
              <LayoutDashboard className="h-6 w-6 text-accent" />
              <span>AiTools</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="flex items-center justify-center p-2 text-accent" aria-label="AiTools Home">
              <LayoutDashboard className="h-6 w-6" />
            </Link>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-text-muted hover:text-text"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4" aria-label="Navigation">
          {renderNavGroup('Main', mainNav)}
          {renderNavGroup('Resources', resourceNav)}
          {renderNavGroup('Templates', templateNav)}
          {renderNavGroup('Meta', metaNav)}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          {!isCollapsed && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-text-subtle mb-2">Quick Actions</p>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => window.open('https://github.com', '_blank')}>
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/50 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}
