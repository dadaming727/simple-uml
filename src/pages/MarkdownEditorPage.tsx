import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Textarea } from '@/components/ui/textarea';
import PageMeta from '@/components/common/PageMeta';
import 'highlight.js/styles/github-dark.css';

const defaultMarkdown = `# 欢迎使用 Markdown 编辑器

## 功能特性

- 支持 **粗体** 和 *斜体*
- 支持 \`代码\` 高亮
- 支持列表和引用

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 表格示例

| 功能 | 支持 |
|------|------|
| 实时预览 | ✅ |
| 语法高亮 | ✅ |
| 导出功能 | ✅ |

> 这是一个引用示例

[访问链接](https://example.com)
`;

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleExportHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown 导出</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background: #f4f4f4; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
  </style>
</head>
<body>
${document.querySelector('.markdown-preview')?.innerHTML || ''}
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown-export.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageMeta title="Markdown 编辑器 - 在线编辑器工具集" description="支持实时预览的 Markdown 编辑器" />
      
      <div className="container py-6">
        {/* 工具栏 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Markdown 编辑器</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportMarkdown} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              导出 MD
            </Button>
            <Button onClick={handleExportHTML}>
              <Download className="mr-2 h-4 w-4" />
              导出 HTML
            </Button>
          </div>
        </div>

        {/* 编辑器区域 */}
        <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
          {/* 左侧编辑区 */}
          <Card className="p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-3">编辑区</h2>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-1 font-mono text-sm resize-none"
              placeholder="在此输入 Markdown 内容..."
            />
          </Card>

          {/* 右侧预览区 */}
          <Card className="p-4 flex flex-col overflow-hidden">
            <h2 className="text-lg font-semibold mb-3">预览</h2>
            <div className="flex-1 overflow-auto prose prose-sm max-w-none dark:prose-invert markdown-preview">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
