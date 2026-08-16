export interface NavItem {
  slug: string;
  title: string;
  description?: string;
  icon: string;
  order?: number;
  visible?: boolean;
  group?: string;
  children?: NavItem[];
}

export interface PageConfig {
  slug: string;
  title: string;
  description?: string;
  icon: string;
  component?: string;
  order?: number;
  visible?: boolean;
  group?: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon?: string;
  tags?: string[];
  docsUrl?: string;
  githubUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  isExternal: boolean;
  enabled: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  skillMdContent: string;
  sourceRepo?: string;
  docsUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  tags?: string[];
  preview?: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  slug: string;
  order?: number;
  visible?: boolean;
  resourceCount?: number;
}

export interface SearchResult {
  id: string;
  type: 'resource' | 'skill' | 'template' | 'page';
  title: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  icon?: string;
}

export interface AppConfig {
  name: string;
  author: string;
  authorUrl: string;
  description: string;
  version: string;
}
