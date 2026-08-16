import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { getIcon } from '../../utils/icons';
import { getResourcesByCategory, getAllResources } from '../../data/resources';
import { categories } from '../../config/navigation';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ExternalLink, ChevronRight, Clock, Calendar, Tag, Github, FileText, ArrowUpRight } from 'lucide-react';
import type { Resource } from '../../types';

interface ResourceListProps {
  categorySlug?: string;
  title: string;
  description?: string;
  icon?: string;
}

export function ResourceList({ categorySlug, title, description, icon }: ResourceListProps) {
  const resources = useMemo(() => {
    if (categorySlug) {
      return getResourcesByCategory(categorySlug);
    }
    return getAllResources();
  }, [categorySlug]);

  const category = categories.find(c => c.slug === categorySlug);
  const CategoryIcon = icon ? getIcon(icon) : (category?.icon ? getIcon(category.icon) : null);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {CategoryIcon && (
            <div className="p-2 bg-accent/10 rounded-xl text-accent">
              <CategoryIcon className="h-6 w-6" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-semibold text-text tracking-tight">{title}</h1>
            {description && <p className="text-text-muted text-lg">{description}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <article key={resource.id} className="card-hover group">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 bg-surface-elevated rounded-lg">
                  {resource.icon && getIcon(resource.icon) ? (
                    <getIcon(resource.icon) className="h-5 w-5 text-accent" />
                  ) : (
                    <ExternalLink className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-text group-hover:text-accent transition-colors truncate">
                      {resource.name}
                    </h3>
                    {resource.isExternal && (
                      <ExternalLink className="h-3 w-3 text-text-subtle/50 flex-shrink-0" aria-label="External link" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-text-muted line-clamp-2">{resource.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="default" size="sm">{resource.category}</Badge>
                    {resource.tags && resource.tags.length > 0 && (
                      <span className="flex items-center gap-1 text-xs text-text-subtle">
                        <Tag className="h-3 w-3" />
                        {resource.tags.slice(0, 2).map(t => `#${t}`).join(' ')}
                        {resource.tags.length > 2 && ` +${resource.tags.length - 2}`}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-text-subtle">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Updated {new Date(resource.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {resource.githubUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-muted hover:text-text"
                      onClick={e => { e.preventDefault(); window.open(resource.githubUrl!, '_blank', 'noopener,noreferrer'); }}
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">GitHub</span>
                    </Button>
                  )}
                  {resource.docsUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-muted hover:text-text"
                      onClick={e => { e.preventDefault(); window.open(resource.docsUrl!, '_blank', 'noopener,noreferrer'); }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Docs</span>
                    </Button>
                  )}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={e => { e.preventDefault(); window.open(resource.url, '_blank', 'noopener,noreferrer'); }}
                >
                  Visit <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </article>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12">
          <ExternalLink className="mx-auto h-12 w-12 text-text-subtle/50 mb-4" />
          <h3 className="text-lg font-medium text-text mb-1">No resources found</h3>
          <p className="text-text-muted">Resources for this category will appear here.</p>
        </div>
      )}
    </div>
  );
}
