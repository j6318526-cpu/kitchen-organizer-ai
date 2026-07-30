import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shopping")({
  head: () => ({
    meta: [
      { title: "採買與補貨清單 — 智慧冰箱助手" },
      { name: "description", content: "自動彙整缺少食材，隨時掌握採買與補貨進度。" },
      { property: "og:title", content: "採買與補貨清單 — 智慧冰箱助手" },
      { property: "og:description", content: "自動彙整缺少食材，隨時掌握採買與補貨進度。" },
    ],
  }),
  component: ShoppingPage,
});

const LIST = [
  { emoji: "🧄", name: "蒜頭", note: "蒜香雞胸義大利麵缺少 1 瓣" },
  { emoji: "🍚", name: "義大利米", note: "奶油蘑菇燉飯建議補貨" },
  { emoji: "🧂", name: "海鹽", note: "庫存偏低" },
];

function ShoppingPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">🛒 採買與補貨清單</h1>
      <ul className="space-y-3">
        {LIST.map((i) => (
          <li key={i.name} className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm">
            <span className="text-3xl">{i.emoji}</span>
            <span className="min-w-0">
              <span className="block font-bold">{i.name}</span>
              <span className="block text-sm text-muted-foreground">{i.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
