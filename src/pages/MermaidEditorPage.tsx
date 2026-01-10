import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, GitBranch, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PageMeta from '@/components/common/PageMeta';
import mermaid from 'mermaid';

const defaultMermaid = `graph TD
    A[开始] --> B{是否继续?}
    B -->|是| C[执行操作]
    B -->|否| D[结束]
    C --> E[处理结果]
    E --> B`;

export default function MermaidEditorPage() {
  const [code, setCode] = useState(defaultMermaid);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose'
    });
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const { svg: generatedSvg } = await mermaid.render('mermaid-preview', code);
      setSvg(generatedSvg);
    } catch (err) {
      setError('生成图表失败，请检查语法是否正确');
      console.error('Mermaid 渲染错误:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPNG = async () => {
    if (!previewRef.current || !svg) return;

    try {
      const svgElement = previewRef.current.querySelector('svg');
      if (!svgElement) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'mermaid-diagram.png';
            a.click();
            URL.revokeObjectURL(downloadUrl);
          }
        });
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (error) {
      console.error('导出 PNG 失败:', error);
    }
  };

  const handleExportSVG = () => {
    if (!svg) return;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mermaid-diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageMeta title="Mermaid 编辑器 - 在线编辑器工具集" description="使用 Mermaid 语法创建流程图、时序图等" />
      
      <div className="container py-6">
        {/* 工具栏 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Mermaid 编辑器</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              <Play className="mr-2 h-4 w-4" />
              {isGenerating ? '生成中...' : '生成图表'}
            </Button>
            <Button onClick={handleExportPNG} variant="outline" disabled={!svg}>
              <Download className="mr-2 h-4 w-4" />
              导出 PNG
            </Button>
            <Button onClick={handleExportSVG} variant="outline" disabled={!svg}>
              <Download className="mr-2 h-4 w-4" />
              导出 SVG
            </Button>
          </div>
        </div>

        {/* 编辑器区域 */}
        <div className="flex flex-col gap-4">
          {/* 上方编辑区 */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">编辑区</h2>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[200px] font-mono text-sm resize-none"
              placeholder="在此输入 Mermaid 代码..."
            />
            <div className="mt-3 text-sm text-muted-foreground">
              <p>提示：输入 Mermaid 语法后，点击"生成图表"按钮查看效果</p>
            </div>
          </Card>

          {/* 下方预览区 */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">预览</h2>
            <div className="min-h-[400px] flex items-center justify-center bg-muted/30 rounded-lg">
              {error ? (
                <div className="text-center text-destructive">
                  <p>{error}</p>
                </div>
              ) : svg ? (
                <div ref={previewRef} dangerouslySetInnerHTML={{ __html: svg }} className="max-w-full" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <GitBranch className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>点击"生成图表"按钮查看预览</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
