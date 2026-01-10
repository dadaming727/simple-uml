import HomePage from './pages/HomePage';
import MarkdownEditorPage from './pages/MarkdownEditorPage';
import PlantUMLEditorPage from './pages/PlantUMLEditorPage';
import MermaidEditorPage from './pages/MermaidEditorPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Markdown 编辑器',
    path: '/markdown',
    element: <MarkdownEditorPage />
  },
  {
    name: 'PlantUML 编辑器',
    path: '/plantuml',
    element: <PlantUMLEditorPage />
  },
  {
    name: 'Mermaid 编辑器',
    path: '/mermaid',
    element: <MermaidEditorPage />
  }
];

export default routes;
