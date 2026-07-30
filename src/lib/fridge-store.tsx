import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { RECIPES, SEED_ITEMS, statusOf, type FridgeItem } from "./fridge-data";

type FridgeContextValue = {
  items: FridgeItem[];
  recipes: typeof RECIPES;
  urgentItems: FridgeItem[];
  counts: { total: number; urgent: number; warn: number; safe: number };
  updateItem: (id: string, patch: Partial<FridgeItem>) => void;
  removeItem: (id: string) => void;
  consumeItems: (ids: string[]) => void;
};

const FridgeContext = createContext<FridgeContextValue | null>(null);

export function FridgeProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FridgeItem[]>(() => SEED_ITEMS.map((i) => ({ ...i })));

  const value = useMemo<FridgeContextValue>(() => {
    const sorted = [...items].sort((a, b) => a.daysLeft - b.daysLeft);
    return {
      items: sorted,
      recipes: RECIPES,
      urgentItems: sorted.filter((i) => i.daysLeft <= 4),
      counts: {
        total: items.length,
        urgent: items.filter((i) => statusOf(i.daysLeft) === "urgent").length,
        warn: items.filter((i) => statusOf(i.daysLeft) === "warn").length,
        safe: items.filter((i) => statusOf(i.daysLeft) === "safe").length,
      },
      updateItem: (id, patch) =>
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i))),
      removeItem: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      consumeItems: (ids) => setItems((prev) => prev.filter((i) => !ids.includes(i.id))),
    };
  }, [items]);

  return <FridgeContext.Provider value={value}>{children}</FridgeContext.Provider>;
}

export function useFridge() {
  const ctx = useContext(FridgeContext);
  if (!ctx) throw new Error("useFridge must be used within FridgeProvider");
  return ctx;
}
