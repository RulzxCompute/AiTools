import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { getIcon } from '../../utils/icons';
import { navigationConfig } from '../../config/navigation';
import { categories } from '../../config/navigation';
import { getRecentResources } from '../../data/resources';
import { getAllSkills } from '../../data/skills';
import { getAllTemplates } from '../../data/templates';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ExternalLink, ArrowRight, ChevronRight, Clock, FileCode, Brain, FileText, Wrench, BookOpen, Terminal, MessageSquare, Code, Palette, Globe, LayoutDashboard } from 'lucide-react';

export function Dashboard() {
  const recentResources = getRecentResources(5);
  const skills = getAllSkills();
  const templates = getAllTemplates();

  const statCards = [
    { title: 'AI Tools', count: categories.filter(c => c.group === 'resources').length, icon: Wrench, href: '/tools', color: 'text-blue-400' },
    { title: 'Documentation', count: categories.filter(c => c.slug === 'documentation').length, icon: BookOpen, href: '/documentation', color: 'text-green-400' },
    { title: 'Skills', count: skills.length, icon: Brain, href: '/skills', color: 'text-purple-400' },
    { title: 'Templates', count: templates.length, icon: FileText, href: '/markdown', color: 'text-orange-400' },
  ];

  const quickAccess = [
    { title: 'Claude Code', description: 'Official CLI for coding with Claude', href: '/claude-code', icon: Terminal, external: false },
    { title: 'Prompt Templates', description: 'Ready-to-use prompt templates', href: '/prompts', icon: MessageSquare, external: false },
    { title: 'Developer Resources', description: 'Tools and references for developers', href: '/developer', icon: Code, external: false },
    { title: 'Design Resources', description: 'UI/UX design references', href: '/design', icon: Palette, external: false },
    { title: 'Useful Websites', description: 'External AI and dev resources', href: '/websites', icon: Globe, external: false },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-text tracking-tight">AiTools</h1>
        <p className="text-text-muted text-lg">
          A curated workspace for AI tools, resources, templates, and developer workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.href} className="card-hover group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-muted mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-text">{stat.count}</p>
                  </div>
                  <div className={cn('p-3 rounded-xl', stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text">Quick Access</h2>
            <Link to="/tools" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickAccess.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.href} className="card-hover group p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-surface-elevated rounded-lg text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-text group-hover:text-accent transition-colors">{item.title}</h3>
                      <p className="text-sm text-text-muted mt-0.5 line-clamp-1">{item.description}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-text-subtle group-hover:text-accent transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text">Recently Added</h2>
            <Link to="/tools" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentResources.map((resource) => (
              <Link key={resource.id} to={resource.url} target="_blank" rel="noopener noreferrer" className="card-hover group flex items-center gap-3 p-4">
                <div className="p-2 bg-surface-elevated rounded-lg">
                  <ExternalLink className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-text group-hover:text-accent transition-colors truncate">{resource.name}</h3>
                    <ExternalLink className="h-3 w-3 text-text-subtle/50 flex-shrink-0" />
                  </div>
                  <p className="text-sm text-text-muted mt-0.5 line-clamp-1">{resource.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default" size="sm">{resource.category}</Badge>
                    <span className="text-xs text-text-subtle flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {new Date(resource.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-text-subtle group-hover:text-accent transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-text mb-4">Resource Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.filter(c => c.visible).map((category) => {
            const Icon = getIcon(category.icon);
            const resourceCount = categories.find(c => c.slug === category.slug)?.resourceCount || 0;
            return (
              <Link key={category.slug} to={`/${category.slug}`} className="card-hover group p-6">
                <div className="flex items-start gap-4">
                  <div className={cn('p-3 rounded-xl', 'bg-accent/10 text-accent')}>
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text group-hover:text-accent transition-colors">{category.name}</h3>
                    <p className="text-sm text-text-muted mt-1 line-clamp-2">{category.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-sm text-text-subtle">
                      <span className="flex items-center gap-1">
                        <FileCode className="h-3 w-3" />
                        {resourceCount} resources
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-text-subtle group-hover:text-accent transition-colors flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
