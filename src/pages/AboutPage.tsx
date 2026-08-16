import { Link } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Github, X, ExternalLink, ArrowUpRight, User, Mail, Calendar, Code, BookOpen, Brain, FileText, Globe, ChevronRight } from 'lucide-react';
import { appConfig } from '../../config/app';

export function AboutPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-xl text-accent">
            <Code className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-text tracking-tight">About AiTools</h1>
            <p className="text-text-muted mt-1">Version {appConfig.version}</p>
          </div>
        </div>
        <p className="text-lg text-text-muted max-w-2xl">
          {appConfig.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-text flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              Purpose
            </h3>
            <p className="text-text-muted">
              AiTools is a personal AI developer workspace and knowledge hub. It collects and organizes useful resources, 
              tools, templates, documentation, and links related to AI development and AI usage.
            </p>
            <p className="text-text-muted">
              The goal is to create a centralized, extensible platform that grows with your needs — 
              whether you're building AI agents, writing prompts, documenting projects, or exploring new AI tools.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-text flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Features
            </h3>
            <ul className="space-y-2 text-text-muted">
              <li className="flex items-center gap-2"><Code className="h-4 w-4 text-accent" /> AI Tools & Documentation</li>
              <li className="flex items-center gap-2"><Brain className="h-4 w-4 text-accent" /> SKILL.md Resources</li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-accent" /> Markdown Templates</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-accent" /> Curated External Links</li>
              <li className="flex items-center gap-2"><ExternalLink className="h-4 w-4 text-accent" /> Global Search (⌘K)</li>
              <li className="flex items-center gap-2"><Code className="h-4 w-4 text-accent" /> Extensible Architecture</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            Author
          </h3>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-surface-elevated rounded-xl">
              <User className="h-10 w-10 text-text-muted" />
            </div>
            <div>
              <h4 className="text-xl font-medium text-text">{appConfig.author}</h4>
              <p className="text-text-muted">Creator of AiTools</p>
              <div className="flex items-center gap-4 mt-4">
                <a 
                  href={appConfig.authorUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span>@RulZharif</span>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-accent" />
            Extensibility
          </h3>
          <p className="text-text-muted">
            AiTools is built with extensibility as a core principle. The architecture supports:
          </p>
          <ul className="space-y-2 text-text-muted">
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-accent" /> Adding new pages via configuration</li>
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-accent" /> Adding new resource categories</li>
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-accent" /> Adding new skills and templates</li>
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-accent" /> Reordering navigation items</li>
            <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-accent" /> Future admin interface for content management</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <Code className="h-5 w-5 text-accent" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React 18', 'TypeScript', 'Vite', 'React Router', 'Tailwind CSS', 'Lucide Icons', 'React Markdown', 'React Syntax Highlighter'].map(tech => (
              <Badge key={tech} variant="accent">{tech}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="pt-8 border-t border-border text-center">
        <p className="text-text-muted">
          Built with care for AI developers and enthusiasts.
        </p>
        <p className="text-text-subtle text-sm mt-2">
          © {new Date().getFullYear()} {appConfig.author}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
