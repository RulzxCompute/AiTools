import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { getIcon } from '../../utils/icons';
import { getAllTemplates, getTemplatesByCategory } from '../../data/templates';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ExternalLink, ChevronRight, Copy, Check, FileText, FileCode, Search, Tag, ChevronDown, ChevronUp, Eye, EyeOff, Code2 } from 'lucide-react';
import type { Template } from '../../types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function TemplatesPage() {
  const { templateId, category } = useParams<{ templateId: string; category: string }>();
  const templates = useMemo(() => {
    if (category) {
      return getTemplatesByCategory(category);
    }
    return getAllTemplates();
  }, [category]);

  const selectedTemplate = templateId ? templates.find(t => t.id === templateId) : null;
  const [expandedTemplates, setExpandedTemplates] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpanded = (id: string) => {
    setExpandedTemplates(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const backUrl = category ? `/markdown/${category}` : '/markdown';

  if (selectedTemplate) {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
        <Link to={backUrl} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Templates
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-text tracking-tight">{selectedTemplate.name}</h1>
              <p className="text-text-muted">{selectedTemplate.description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {selectedTemplate.tags?.map(tag => (
            <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Button
            variant="secondary"
            onClick={() => handleCopy(selectedTemplate.content)}
          >
            <Copy className="h-4 w-4" />
            Copy Markdown
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const blob = new Blob([selectedTemplate.content], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${selectedTemplate.name.toLowerCase().replace(/\s+/g, '-')}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <FileText className="h-4 w-4" />
            Download .md
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <CardHeader className="p-4 border-b border-border">
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{selectedTemplate.content}</ReactMarkdown>
              </div>
            </CardContent>
          </div>

          <div className="card">
            <CardHeader className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle>Raw Markdown</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(selectedTemplate.content)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <SyntaxHighlighter language="markdown" style={oneDark} className="!bg-transparent rounded-lg max-h-[60vh] overflow-auto">
                {selectedTemplate.content}
              </SyntaxHighlighter>
            </CardContent>
          </div>
        </div>

        <div className="text-sm text-text-muted">
          <p>Created: {new Date(selectedTemplate.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(selectedTemplate.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-text tracking-tight">Markdown Templates</h1>
            <p className="text-text-muted text-lg">
              Ready-to-use Markdown templates for documentation, projects, prompts, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-subtle" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface-elevated border border-border rounded-lg text-text placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'cards' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            <FileCode className="h-4 w-4 mr-1" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Code2 className="h-4 w-4 mr-1" />
            List
          </Button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const isExpanded = expandedTemplates.has(template.id);
            return (
              <article key={template.id} className="card-hover">
                <Card className="overflow-hidden flex flex-col h-full">
                  <CardHeader className="p-4 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-accent/10 rounded-lg text-accent flex-shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link to={`${backUrl}/${template.id}`} className="font-medium text-text hover:text-accent transition-colors block truncate">
                            {template.name}
                          </Link>
                          <p className="mt-1 text-sm text-text-muted line-clamp-2">{template.description}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {template.tags?.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
                            ))}
                            {template.tags && template.tags.length > 3 && (
                              <Badge variant="default" size="sm">+{template.tags.length - 3} more</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleExpanded(template.id)}
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          className="text-text-muted hover:text-text"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(template.content)}
                          aria-label="Copy template"
                          className="text-text-muted hover:text-text"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const blob = new Blob([template.content], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.md`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          aria-label="Download template"
                          className="text-text-muted hover:text-text"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="p-4 bg-surface-elevated/50 border-t border-border flex-1 overflow-auto">
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-text-subtle font-mono">Markdown</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopy(template.content)}
                              className="text-text-muted hover:text-text"
                            >
                              <Copy className="h-3.5 w-3.5 mr-1" />
                              Copy
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const blob = new Blob([template.content], { type: 'text/markdown' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.md`;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                              className="text-text-muted hover:text-text"
                            >
                              <FileText className="h-3.5 w-3.5 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                        <SyntaxHighlighter language="markdown" style={oneDark} className="!bg-transparent rounded-lg max-h-96 overflow-auto">
                          {template.content}
                        </SyntaxHighlighter>
                      </div>
                    </CardContent>
                  )}

                  {!isExpanded && (
                    <CardFooter className="p-4 border-t border-border">
                      <Link to={`${backUrl}/${template.id}`} className="w-full">
                        <Button variant="secondary" className="w-full">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  )}
                </Card>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-elevated/50">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-text-muted">
              <div className="col-span-5">Template</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2">Tags</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>
          <div className="divide-y divide-border">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="p-4 hover:bg-surface-elevated/50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Link to={`${backUrl}/${template.id}`} className="font-medium text-text hover:text-accent transition-colors block truncate">
                      {template.name}
                    </Link>
                    <p className="text-sm text-text-muted mt-0.5 line-clamp-1">{template.description}</p>
                  </div>
                  <div className="col-span-3">
                    <Badge variant="default" size="sm">{template.category}</Badge>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {template.tags?.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
                      ))}
                      {template.tags && template.tags.length > 2 && (
                        <Badge variant="default" size="sm">+{template.tags.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(template.content)}
                        aria-label="Copy template"
                        className="text-text-muted hover:text-text"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const blob = new Blob([template.content], { type: 'text/markdown' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.md`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        aria-label="Download template"
                        className="text-text-muted hover:text-text"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Link to={`${backUrl}/${template.id}`}>
                        <Button variant="ghost" size="icon" className="text-text-muted hover:text-text">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-text-subtle/50 mb-4" />
          <h3 className="text-lg font-medium text-text mb-1">No templates found</h3>
          <p className="text-text-muted">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
}
