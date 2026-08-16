import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { getIcon } from '../../utils/icons';
import { getAllSkills, getSkillById } from '../../data/skills';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ExternalLink, ChevronRight, Copy, Check, Github, FileText, Brain, Code, ChevronDown, ChevronUp, Search, Tag } from 'lucide-react';
import type { Skill } from '../../types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function SkillsPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const skills = useMemo(() => getAllSkills(), []);
  const selectedSkill = skillId ? getSkillById(skillId) : null;
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleExpanded = (id: string) => {
    setExpandedSkills(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  if (selectedSkill) {
    return (
      <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
        <Link to="/skills" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-4">
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Skills
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <Brain className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-text tracking-tight">{selectedSkill.name}</h1>
              <p className="text-text-muted">{selectedSkill.description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {selectedSkill.tags?.map(tag => (
            <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {selectedSkill.sourceRepo && (
            <Button
              variant="secondary"
              onClick={() => window.open(selectedSkill.sourceRepo!, '_blank', 'noopener,noreferrer')}
            >
              <Github className="h-4 w-4" />
              Source Repository
            </Button>
          )}
          {selectedSkill.docsUrl && (
            <Button
              variant="secondary"
              onClick={() => window.open(selectedSkill.docsUrl!, '_blank', 'noopener,noreferrer')}
            >
              <FileText className="h-4 w-4" />
              Documentation
            </Button>
          )}
        </div>

        <div className="card">
          <CardHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle>SKILL.md Content</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(selectedSkill.skillMdContent)}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <SyntaxHighlighter language="markdown" style={oneDark} className="!bg-transparent">
              {selectedSkill.skillMdContent}
            </SyntaxHighlighter>
          </CardContent>
        </div>

        <div className="text-sm text-text-muted">
          <p>Created: {new Date(selectedSkill.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(selectedSkill.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <Brain className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-text tracking-tight">Skills</h1>
            <p className="text-text-muted text-lg">
              AI agent skills and SKILL.md resources for extending agent capabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-subtle" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-surface-elevated border border-border rounded-lg text-text placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkills.has(skill.id);
          return (
            <article key={skill.id} className="card-hover">
              <Card className="overflow-hidden">
                <CardHeader className="p-4 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-accent/10 rounded-lg text-accent flex-shrink-0">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/skills/${skill.id}`} className="font-medium text-text hover:text-accent transition-colors block truncate">
                          {skill.name}
                        </Link>
                        <p className="mt-1 text-sm text-text-muted line-clamp-2">{skill.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {skill.tags?.slice(0, 4).map(tag => (
                            <Badge key={tag} variant="default" size="sm">#{tag}</Badge>
                          ))}
                          {skill.tags && skill.tags.length > 4 && (
                            <Badge variant="default" size="sm">+{skill.tags.length - 4} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpanded(skill.id)}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        className="text-text-muted hover:text-text"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(skill.skillMdContent)}
                        aria-label="Copy SKILL.md"
                        className="text-text-muted hover:text-text"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {skill.sourceRepo && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(skill.sourceRepo!, '_blank', 'noopener,noreferrer')}
                          aria-label="View source"
                          className="text-text-muted hover:text-text"
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="p-4 bg-surface-elevated/50 border-t border-border">
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-text-subtle font-mono">SKILL.md</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(skill.skillMdContent)}
                          className="text-text-muted hover:text-text"
                        >
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <SyntaxHighlighter language="markdown" style={oneDark} className="!bg-transparent rounded-lg max-h-96 overflow-auto">
                        {skill.skillMdContent}
                      </SyntaxHighlighter>
                    </div>
                  </CardContent>
                )}
              </Card>
            </article>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <Brain className="mx-auto h-12 w-12 text-text-subtle/50 mb-4" />
          <h3 className="text-lg font-medium text-text mb-1">No skills found</h3>
          <p className="text-text-muted">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
}
