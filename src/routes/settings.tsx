import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "系統設定 — 智慧冰箱助手" },
      { name: "description", content: "調整提醒天數、通知方式與發票匯入偏好設定。" },
      { property: "og:title", content: "系統設定 — 智慧冰箱助手" },
      { property: "og:description", content: "調整提醒天數、通知方式與發票匯入偏好設定。" },
    ],
  }),
  component: SettingsPage,
});

const SETTINGS = [
  { emoji: "🔔", name: "即期提醒天數", value: "3 天前提醒" },
  { emoji: "📩", name: "補貨通知", value: "已開啟" },
  { emoji: "🧾", name: "發票載具自動匯入", value: "每日 22:00 同步" },
];

function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">⚙️ 系統設定</h1>
      <ul className="space-y-3">
        {SETTINGS.map((s) => (
          <li key={s.name} className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm">
            <span className="text-2xl">{s.emoji}</span>
            <span className="min-w-0 flex-1 truncate font-bold">{s.name}</span>
            <span className="shrink-0 text-sm text-muted-foreground">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
