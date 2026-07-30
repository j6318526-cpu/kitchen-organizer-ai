import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "共享冰箱設定 — 智慧冰箱助手" },
      { name: "description", content: "邀請家庭或宿舍成員共同管理冰箱庫存與採買清單。" },
      { property: "og:title", content: "共享冰箱設定 — 智慧冰箱助手" },
      { property: "og:description", content: "邀請家庭或宿舍成員共同管理冰箱庫存與採買清單。" },
    ],
  }),
  component: MembersPage,
});

const MEMBERS = [
  { emoji: "🧑‍🍳", name: "小美", role: "管理員" },
  { emoji: "🧑‍💻", name: "阿哲", role: "成員" },
  { emoji: "👵", name: "外婆", role: "成員" },
];

function MembersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">👥 共享冰箱設定</h1>
      <ul className="space-y-3">
        {MEMBERS.map((m) => (
          <li key={m.name} className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm">
            <span className="text-3xl">{m.emoji}</span>
            <span className="min-w-0 flex-1 truncate font-bold">{m.name}</span>
            <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm">{m.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
