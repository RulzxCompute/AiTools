import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { cn } from '../utils/helpers';
import { SearchIcon, X, ChevronDown, ChevronUp, ExternalLink, Copy, Check, Loader2, Key } from 'lucide-react';
import type { SearchResult } from '../types';
import { Button } from './Button';

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => SearchResult[];
  placeholder?: string;
  shortcut?: string;
}

export function SearchCommand({ isOpen, onClose, onSearch, placeholder = 'Search resources, skills, templates...', shortcut = '⌘K' }: SearchCommandProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = onSearch(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, onSearch]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          window.open(results[selectedIndex].url, '_blank', 'noopener,noreferrer');
          onClose();
        }
        break;
      case 'Tab':
        e.preventDefault();
        break;
    }
  }, [results, selectedIndex, onClose]);

  const handleGlobalKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      // Toggle is handled by parent
    }
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl animate-in bg-surface border border-border rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="relative p-4 bg-surface-elevated border-b border-border">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-subtle" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full pl-10 pr-12 py-3 text-base bg-surface border border-border-hover rounded-lg text-text placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-text-subtle">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </span>
            <kbd className="px-2 py-1 text-xs font-mono bg-surface border border-border rounded text-text-subtle">
              {shortcut}
            </kbd>
          </div>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-8 text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-text-subtle/50 mb-4" />
              <p className="text-text-muted">Start typing to search resources, skills, and templates</p>
              <p className="text-text-subtle text-sm mt-1">Press <kbd className="px-1.5 py-0.5 font-mono bg-surface border border-border rounded">⌘K</kbd> to close</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <SearchIcon className="mx-auto h-12 w-12 text-text-subtle/50 mb-4" />
              <p className="text-text-muted">No results found for "{query}"</p>
              <p className="text-text-subtle text-sm mt-1">Try different keywords</p>
            </div>
          ) : (
            <ul className="divide-y divide-border" role="listbox">
              {results.map((result, index) => (
                <li key={result.id} role="option" aria-selected={index === selectedIndex}>
                  <button
                    className={cn(
                      'w-full px-4 py-3 text-left transition-colors',
                      index === selectedIndex ? 'bg-accent-muted' : 'hover:bg-surface-elevated'
                    )}
                    onClick={() => {
                      window.open(result.url, '_blank', 'noopener,noreferrer');
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start gap-3">
                      {result.icon && (
                        <div className="flex-shrink-0 mt-0.5 text-text-subtle">
                          <span className="text-lg">{result.icon}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text truncate">{result.title}</span>
                          {result.type && (
                            <Badge variant="accent" size="sm">{result.type}</Badge>
                          )}
                          {result.isExternal && (
                            <ExternalLink className="h-3 w-3 text-text-subtle/50" aria-label="External link" />
                          )}
                        </div>
                        {result.description && (
                          <p className="mt-1 text-sm text-text-muted line-clamp-2">{result.description}</p>
                        )}
                        {result.category && (
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="default" size="sm">{result.category}</Badge>
                            {result.tags && result.tags.length > 0 && (
                              <span className="text-xs text-text-subtle">
                                {result.tags.slice(0, 3).map(t => `#${t}`).join(' ')}
                                {result.tags.length > 3 && ` +${result.tags.length - 3}`}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-text-subtle hover:text-text"
                          onClick={e => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(result.url);
                          }}
                          aria-label="Copy link"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <ExternalLink className="h-4 w-4 text-text-subtle/50" aria-label="Open in new tab" />
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-3 bg-surface-elevated border-t border-border">
          <p className="text-xs text-text-subtle text-center">
            <kbd className="px-1.5 py-0.5 font-mono bg-surface border border-border rounded">↑</kbd>
            <kbd className="px-1.5 py-0.5 font-mono bg-surface border border-border rounded">↓</kbd>
            Navigate &nbsp;
            <kbd className="px-1.5 py-0.5 font-mono bg-surface border border-border rounded">Enter</kbd>
            Open &nbsp;
            <kbd className="px-1.5 py-0.5 font-mono bg-surface border border-border rounded">Esc</kbd>
            Close
          </p>
        </div>
      </div>
    </div>
  );
}
