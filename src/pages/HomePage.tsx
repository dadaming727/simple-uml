import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Workflow, GitBranch, ArrowRight } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';

const editors = [
  {
    title: 'Markdown 编辑器',
    description: '支持实时预览的 Markdown 编辑器，提供语法高亮和多种导出格式',
    icon: FileText,
    path: '/markdown',
    features: ['实时预览', '语法高亮', '导出 HTML/PDF', '支持 GFM 语法']
  },
  {
    title: 'PlantUML 编辑器',
    description: '在线绘制 UML 图表，支持类图、时序图、流程图等多种图表类型',
    icon: Workflow,
    path: '/plantuml',
    features: ['类图', '时序图', '流程图', '导出 PNG/SVG']
  },
  {
    title: 'Mermaid 编辑器',
    description: '使用 Mermaid 语法创建流程图、时序图、甘特图等多种图表',
    icon: GitBranch,
    path: '/mermaid',
    features: ['流程图', '时序图', '甘特图', '导出 PNG/SVG']
  }
];

export default function HomePage() {
  return (
    <>
      <PageMeta title="首页 - 在线编辑器工具集" description="集成 Markdown、PlantUML 和 Mermaid 在线编辑功能的 web 工具平台" />
      
      <div className="container py-12">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">在线编辑器工具集</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            集成 Markdown、PlantUML 和 Mermaid 在线编辑功能，支持实时预览效果，帮助您快速完成文档编写和图表绘制
          </p>
        </div>

        {/* 编辑器卡片 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {editors.map((editor) => {
            const Icon = editor.icon;
            return (
              <Card key={editor.path} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{editor.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {editor.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4 flex-1">
                    <h4 className="text-sm font-semibold mb-2">主要特性：</h4>
                    <ul className="space-y-1">
                      {editor.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={editor.path}>
                    <Button className="w-full">
                      开始使用
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 快速指引 */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>快速开始</CardTitle>
              <CardDescription>选择您需要的编辑器，开始创作</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-2">1. 选择编辑器</h4>
                  <p className="text-sm text-muted-foreground">
                    根据您的需求选择 Markdown、PlantUML 或 Mermaid 编辑器
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. 编写内容</h4>
                  <p className="text-sm text-muted-foreground">
                    在编辑区域输入内容，实时查看预览效果
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. 导出结果</h4>
                  <p className="text-sm text-muted-foreground">
                    使用导出功能保存您的作品为多种格式
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
