import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useFridge } from "@/lib/fridge-store";
import { RecipeDialog } from "@/components/RecipeDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DaysBadge } from "@/components/ItemTile";
import type { Recipe } from "@/lib/fridge-data";
import { toast } from "sonner";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "家常食譜與推薦 — 智慧冰箱助手" },
      { name: "description", content: "勾選即期食材，生成清冰箱料理與 AI 推薦家常食譜。" },
      { property: "og:title", content: "家常食譜與推薦 — 智慧冰箱助手" },
      { property: "og:description", content: "勾選即期食材，生成清冰箱料理與 AI 推薦家常食譜。" },
    ],
  }),
  component: RecipesPage,
});

function RecipesPage() {
  const { urgentItems, recipes } = useFridge();
  const [checked, setChecked] = useState<string[]>([]);
  const [open, setOpen] = useState<Recipe | null>(null);

  const toggle = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">🍳 家常食譜與推薦</h1>

      <section className="rounded-3xl bg-card p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-destructive">⚠️ 即期食材</h2>
        <ul className="space-y-1">
          {urgentItems.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-2 hover:bg-secondary/60">
                <Checkbox checked={checked.includes(item.id)} onCheckedChange={() => toggle(item.id)} />
                <span className="text-xl">{item.emoji}</span>
                <span className="min-w-0 flex-1 truncate font-bold">{item.name}</span>
                <DaysBadge days={item.daysLeft} />
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          已勾選 {checked.length} 項 / 共 {urgentItems.length} 項待處理
        </p>
        <Button
          className="mt-3 w-full"
          disabled={checked.length === 0}
          onClick={() => {
            setOpen(recipes[0]);
            toast.success("已依勾選食材生成清冰箱料理");
          }}
        >
          生成清冰箱料理
        </Button>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">AI 推薦食譜</h2>
        {recipes.map((r) => (
          <button
            key={r.id}
            onClick={() => setOpen(r)}
            className="flex w-full items-center gap-4 rounded-3xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.99]"
          >
            <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-secondary text-3xl">
              {r.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-lg font-bold">{r.name}</span>
              <span className="block text-sm text-muted-foreground">
                {r.minutes} 分鐘 · {r.style}
              </span>
              <span
                className={`mt-1 block text-xs font-semibold ${
                  r.missing.length ? "text-destructive" : "text-primary"
                }`}
              >
                {r.missing.length ? `缺少食材：${r.missing.join("、")}` : "現有食材齊全"}
              </span>
            </span>
          </button>
        ))}
      </section>

      <RecipeDialog recipe={open} onOpenChange={(o) => !o && setOpen(null)} />
    </div>
  );
}
