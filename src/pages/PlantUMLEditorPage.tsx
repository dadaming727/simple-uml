import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Workflow, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import PageMeta from '@/components/common/PageMeta';
import plantumlEncoder from 'plantuml-encoder';

const defaultPlantUML = `@startuml
Alice -> Bob: 认证请求
Bob --> Alice: 认证响应

Alice -> Bob: 另一个认证请求
Alice <-- Bob: 另一个认证响应
@enduml`;

export default function PlantUMLEditorPage() {
  const [code, setCode] = useState(defaultPlantUML);
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    try {
      const encoded = plantumlEncoder.encode(code);
      const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
      setImageUrl(url);
    } catch (error) {
      console.error('生成图表失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPNG = async () => {
    if (!imageUrl) return;
    
    try {
      const encoded = plantumlEncoder.encode(code);
      const pngUrl = `https://www.plantuml.com/plantuml/png/${encoded}`;
      const response = await fetch(pngUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'plantuml-diagram.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出 PNG 失败:', error);
    }
  };

  const handleExportSVG = async () => {
    if (!imageUrl) return;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'plantuml-diagram.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出 SVG 失败:', error);
    }
  };

  return (
    <>
      <PageMeta title="PlantUML 编辑器 - 在线编辑器工具集" description="在线绘制 UML 图表" />
      
      <div className="container py-6">
        {/* 工具栏 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Workflow className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">PlantUML 编辑器</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              <Play className="mr-2 h-4 w-4" />
              {isGenerating ? '生成中...' : '生成图表'}
            </Button>
            <Button onClick={handleExportPNG} variant="outline" disabled={!imageUrl}>
              <Download className="mr-2 h-4 w-4" />
              导出 PNG
            </Button>
            <Button onClick={handleExportSVG} variant="outline" disabled={!imageUrl}>
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
              placeholder="在此输入 PlantUML 代码..."
            />
            <div className="mt-3 text-sm text-muted-foreground">
              <p>提示：输入 PlantUML 语法后，点击"生成图表"按钮查看效果</p>
            </div>
          </Card>

          {/* 下方预览区 */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3">预览</h2>
            <div className="min-h-[400px] flex items-center justify-center bg-muted/30 rounded-lg">
              {imageUrl ? (
                <img src={imageUrl} alt="PlantUML Diagram" className="max-w-full h-auto" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Workflow className="h-16 w-16 mx-auto mb-4 opacity-50" />
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
