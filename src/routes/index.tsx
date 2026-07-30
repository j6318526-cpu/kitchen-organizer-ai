import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useFridge } from "@/lib/fridge-store";
import { DaysBadge } from "@/components/ItemTile";
import { RecipeDialog } from "@/components/RecipeDialog";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/fridge-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "智慧冰箱助手 — 即期提醒與今日菜單" },
      { name: "description", content: "掌握冰箱即期食材，一鍵取得今日首選清冰箱食譜。" },
      { property: "og:title", content: "智慧冰箱助手 — 即期提醒與今日菜單" },
      { property: "og:description", content: "掌握冰箱即期食材，一鍵取得今日首選清冰箱食譜。" },
    ],
  }),
  component: Home,
});

function Home() {
  const { urgentItems, recipes, counts } = useFridge();
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null);
  const top3 = urgentItems.slice(0, 3);
  const featured = recipes[0];

  return (
    <div className="space-y-5">
      <section className="flex items-start gap-4 rounded-3xl bg-warning-soft p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-warning text-warning-foreground">
          <AlertTriangle className="size-6" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">今日提醒</p>
          <h2 className="text-xl font-bold">有 {counts.urgent} 樣食材即將過期</h2>
          <p className="text-sm text-muted-foreground">
            {top3.map((i) => i.name).join("、")} 將在 2 天內到期
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">🚨 優先處理食材</h2>
          <Link to="/inventory" className="shrink-0 text-sm font-semibold text-primary">
            查看全部
          </Link>
        </div>
        <ul className="space-y-2">
          {top3.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">{item.name}</span>
                <span className="block text-xs text-muted-foreground">{item.quantity}</span>
              </span>
              <DaysBadge days={item.daysLeft} />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-card p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-bold">🍳 今日首選食譜</h2>
        <div className="grid h-40 w-full place-items-center rounded-3xl bg-secondary text-5xl">
          {featured.emoji}
        </div>
        <h3 className="mt-3 text-xl font-bold">{featured.name}</h3>
        <p className="text-sm text-muted-foreground">
          {featured.minutes} 分鐘 · {featured.style}
        </p>
        <p className="mt-3 rounded-2xl bg-secondary p-3 text-sm text-secondary-foreground">
          ✅ 現有食材齊全（清掉 {featured.uses.length} 樣庫存）
        </p>
        <Button className="mt-4 w-full" onClick={() => setOpenRecipe(featured)}>
          查看食譜
        </Button>
        <Link to="/recipes" className="mt-3 block text-center text-sm font-semibold text-primary">
          更多 AI 推薦食譜 →
        </Link>
      </section>

      <RecipeDialog recipe={openRecipe} onOpenChange={(o) => !o && setOpenRecipe(null)} />
    </div>
  );
}
