import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ResourceList } from './pages/ResourceList';
import { SkillsPage } from './pages/SkillsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AboutPage } from './pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'tools', element: <ResourceList categorySlug="ai-tools" title="AI Tools" description="Curated AI development and productivity tools" icon="Wrench" /> },
      { path: 'documentation', element: <ResourceList categorySlug="documentation" title="Documentation" description="Official documentation and references for AI services" icon="BookOpen" /> },
      { path: 'claude-code', element: <ResourceList categorySlug="claude-code" title="Claude Code" description="Claude Code specific resources and guides" icon="Terminal" /> },
      { path: 'skills', element: <SkillsPage /> },
      { path: 'skills/:skillId', element: <SkillsPage /> },
      { path: 'prompts', element: <TemplatesPage category="prompts" /> },
      { path: 'markdown', element: <TemplatesPage category="markdown" /> },
      { path: 'markdown/:templateId', element: <TemplatesPage /> },
      { path: 'markdown/:category/:templateId', element: <TemplatesPage /> },
      { path: 'developer', element: <ResourceList categorySlug="developer" title="Developer Resources" description="Tools and references for developers" icon="Code" /> },
      { path: 'design', element: <ResourceList categorySlug="design" title="Design Resources" description="UI/UX design references and tools" icon="Palette" /> },
      { path: 'websites', element: <ResourceList categorySlug="websites" title="Useful Websites" description="External AI and development resources" icon="Globe" /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
]);
