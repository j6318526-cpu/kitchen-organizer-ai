import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useFridge } from "@/lib/fridge-store";
import { ItemTile } from "@/components/ItemTile";
import { ItemDetailDialog } from "@/components/ItemDetailDialog";
import { CATEGORY_LABELS, type Category, type FridgeItem } from "@/lib/fridge-data";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "我的冰箱庫存 — 智慧冰箱助手" },
      { name: "description", content: "搜尋、篩選並管理冰箱內所有食材的保存倒數。" },
      { property: "og:title", content: "我的冰箱庫存 — 智慧冰箱助手" },
      { property: "og:description", content: "搜尋、篩選並管理冰箱內所有食材的保存倒數。" },
    ],
  }),
  component: InventoryPage,
});

const TABS: (Category | "all")[] = ["all", "vegetable", "meat", "dairy", "other"];

function InventoryPage() {
  const { items, counts } = useFridge();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<FridgeItem | null>(null);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) => (tab === "all" || i.category === tab) && i.name.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [items, tab, q],
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">🧊 我的冰箱庫存</h1>
      <p className="text-sm text-muted-foreground">
        共 {counts.total} 項食材 · {counts.urgent} 項即期 · {counts.warn} 項注意 · {counts.safe} 項安全
      </p>

      <div className="space-y-3 rounded-3xl bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋食材..."
            className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {CATEGORY_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-3xl bg-card p-8 text-center text-muted-foreground shadow-sm">
          沒有符合條件的食材
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item) => (
            <ItemTile key={item.id} item={item} onClick={() => setSelected(item)} />
          ))}
        </div>
      )}

      <ItemDetailDialog item={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </div>
  );
}
