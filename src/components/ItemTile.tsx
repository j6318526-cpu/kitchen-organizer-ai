import { statusOf, type FridgeItem } from "@/lib/fridge-data";

export function DaysBadge({ days, prefix }: { days: number; prefix?: boolean }) {
  const s = statusOf(days);
  const cls =
    s === "urgent"
      ? "bg-destructive text-destructive-foreground"
      : s === "warn"
        ? "bg-warning text-warning-foreground"
        : "bg-primary text-primary-foreground";
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-sm font-bold ${cls}`}>
      {prefix ? `剩 ${days} 天` : `${days} 天`}
    </span>
  );
}

export function ItemTile({ item, onClick }: { item: FridgeItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col items-start gap-2 rounded-3xl bg-secondary p-4 text-left transition-transform active:scale-[0.98]"
    >
      <span className="text-4xl">{item.emoji}</span>
      <span className="w-full truncate text-lg font-bold">{item.name}</span>
      <span className="text-sm text-muted-foreground">{item.quantity}</span>
      <DaysBadge days={item.daysLeft} prefix />
    </button>
  );
}
