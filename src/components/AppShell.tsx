import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Bell, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ManualEntryDialog } from "@/components/ManualEntryDialog";
import { toast } from "sonner";

const NAV = [
  { to: "/", emoji: "🏠", label: "首頁" },
  { to: "/inventory", emoji: "🧊", label: "我的冰箱庫存" },
  { to: "/recipes", emoji: "🍳", label: "家常食譜與推薦" },
  { to: "/shopping", emoji: "🛒", label: "採買與補貨清單" },
  { to: "/members", emoji: "👥", label: "共享冰箱設定（家庭/宿舍成員）" },
  { to: "/settings", emoji: "⚙️", label: "系統設定" },
] as const;

const ADD_OPTIONS = [
  { id: "invoice", emoji: "💳", title: "全聯 / 發票載具自動匯入", desc: "自動解析消費明細並匯入庫存" },
  { id: "scan", emoji: "📷", title: "AI 拍照 / 發票掃描", desc: "透過 YOLO 模型辨識食材與實體發票" },
  { id: "manual", emoji: "✏️", title: "手動輸入 / 家常食譜建立", desc: "手動增減庫存數量或建立家常食譜" },
];


export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <button
          aria-label="開啟選單"
          onClick={() => setNavOpen(true)}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-lg font-bold">智慧冰箱助手</h1>
        <button
          aria-label="通知"
          onClick={() => toast("目前有 3 項即期提醒")}
          className="relative grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
        </button>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-4">{children}</main>

      <button
        aria-label="新增庫存"
        onClick={() => setAddOpen(true)}
        className="fixed bottom-6 left-1/2 z-30 grid size-16 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95"
      >
        <Plus className="size-8" />
      </button>

      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-[85%] max-w-sm bg-card p-0">
          <SheetHeader className="px-6 pt-6">
            <SheetTitle className="text-left text-xl font-bold">智慧冰箱助手</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col gap-1 px-3 pb-8">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setNavOpen(false)}
                className={`flex items-start gap-4 rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                  pathname === n.to ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/60"
                }`}
              >
                <span className="text-xl leading-6">{n.emoji}</span>
                <span className="min-w-0">{n.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl border-none bg-muted p-0">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border" />
          <SheetHeader className="flex-row items-center justify-between px-5 pt-3">
            <SheetTitle className="text-xl font-bold">新增庫存</SheetTitle>
            <button aria-label="關閉" onClick={() => setAddOpen(false)}>
              <X className="size-5 text-muted-foreground" />
            </button>
          </SheetHeader>
          <div className="flex flex-col gap-3 p-5 pb-8">
            {ADD_OPTIONS.map((o) => (
              <button
                key={o.title}
                onClick={() => {
                  setAddOpen(false);
                  toast.success(`已啟動：${o.title}`);
                }}
                className="flex items-center gap-4 rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.99]"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-2xl">
                  {o.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-bold">{o.title}</span>
                  <span className="block text-sm text-muted-foreground">{o.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
