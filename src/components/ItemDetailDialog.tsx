import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORY_LABELS, type FridgeItem } from "@/lib/fridge-data";
import { useFridge } from "@/lib/fridge-store";
import { DaysBadge } from "./ItemTile";
import { toast } from "sonner";

export function ItemDetailDialog({
  item,
  onOpenChange,
}: {
  item: FridgeItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { updateItem, removeItem } = useFridge();
  const [editing, setEditing] = useState(false);
  const [qty, setQty] = useState("");

  useEffect(() => {
    setEditing(false);
    setQty(item?.quantity ?? "");
  }, [item]);

  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl">
        {item && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{item.emoji}</span>
                <DialogTitle className="text-xl">{item.name}</DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">保存期限</span>
                <DaysBadge days={item.daysLeft} prefix />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">分類</span>
                <span className="font-medium">{CATEGORY_LABELS[item.category]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">存放位置</span>
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">數量</span>
                {editing ? (
                  <Input value={qty} onChange={(e) => setQty(e.target.value)} className="h-9 w-32" />
                ) : (
                  <span className="font-medium">{item.quantity}</span>
                )}
              </div>
              {item.note && (
                <p className="rounded-2xl bg-secondary p-3 text-secondary-foreground">💡 {item.note}</p>
              )}
              {editing && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">快速調整剩餘天數</Label>
                  <div className="flex gap-2">
                    {[1, 3, 7, 14].map((d) => (
                      <Button
                        key={d}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => updateItem(item.id, { daysLeft: d })}
                      >
                        {d} 天
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex-row gap-2 sm:justify-between">
              {editing ? (
                <Button
                  className="flex-1"
                  onClick={() => {
                    updateItem(item.id, { quantity: qty });
                    setEditing(false);
                    toast.success("已更新庫存");
                  }}
                >
                  儲存變更
                </Button>
              ) : (
                <Button className="flex-1" onClick={() => setEditing(true)}>
                  編輯數量
                </Button>
              )}
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  removeItem(item.id);
                  onOpenChange(false);
                  toast(`已刪除 ${item.name}`);
                }}
              >
                刪除庫存
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
