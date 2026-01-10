import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { FileText, Workflow, GitBranch, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navigation = [
  { name: '首页', path: '/', icon: FileText },
  { name: 'Markdown', path: '/markdown', icon: FileText },
  { name: 'PlantUML', path: '/plantuml', icon: Workflow },
  { name: 'Mermaid', path: '/mermaid', icon: GitBranch }
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">在线编辑器工具集</span>
            </Link>
            
            {/* 桌面导航 */}
            <nav className="hidden lg:flex items-center gap-2">
              <NavLinks />
            </nav>
          </div>

          {/* 移动端菜单按钮 */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1">
        {children}
      </main>

      {/* 底部 */}
      <footer className="border-t border-border bg-background">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2026 在线编辑器工具集. 支持 Markdown、PlantUML 和 Mermaid 在线编辑
        </div>
      </footer>
    </div>
  );
}
