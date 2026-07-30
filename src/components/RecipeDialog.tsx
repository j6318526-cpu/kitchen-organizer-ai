import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/fridge-data";
import { useFridge } from "@/lib/fridge-store";
import { toast } from "sonner";

export function RecipeDialog({
  recipe,
  onOpenChange,
}: {
  recipe: Recipe | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, consumeItems } = useFridge();

  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto rounded-3xl">
        {recipe && (
          <>
            <DialogHeader>
              <div className="grid h-32 w-full place-items-center rounded-3xl bg-secondary text-5xl">
                {recipe.emoji}
              </div>
              <DialogTitle className="pt-3 text-left text-xl">{recipe.name}</DialogTitle>
              <p className="text-left text-sm text-muted-foreground">
                {recipe.minutes} 分鐘 · {recipe.style}
              </p>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <div>
                <h3 className="mb-2 font-bold">使用食材</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.uses.map((id) => {
                    const it = items.find((i) => i.id === id);
                    return (
                      <span key={id} className="rounded-full bg-secondary px-3 py-1">
                        {it ? `${it.emoji} ${it.name}` : id}
                      </span>
                    );
                  })}
                </div>
              </div>
              {recipe.missing.length > 0 && (
                <p className="rounded-2xl bg-destructive/10 p-3 font-medium text-destructive">
                  ⚠️ 缺少食材：{recipe.missing.join("、")}（已自動加入採買清單）
                </p>
              )}
              <div>
                <h3 className="mb-2 font-bold">料理步驟</h3>
                <ol className="space-y-2">
                  {recipe.steps.map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="min-w-0">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <DialogFooter>
              <Button
                className="w-full"
                onClick={() => {
                  consumeItems(recipe.uses);
                  onOpenChange(false);
                  toast.success("🎉 已做完此料理，冰箱食材已自動扣除");
                }}
              >
                🎉 已做完此料理（一鍵扣除冰箱食材）
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
