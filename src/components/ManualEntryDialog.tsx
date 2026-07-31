import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY_EMOJI, CATEGORY_LABELS, type Category } from "@/lib/fridge-data";
import { useFridge } from "@/lib/fridge-store";
import { toast } from "sonner";

const CATEGORIES: Category[] = ["vegetable", "meat", "dairy", "fruit", "seafood", "other"];

export function ManualEntryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, addItem, addRecipe } = useFridge();

  // Tab 1
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("vegetable");
  const [quantity, setQuantity] = useState("");
  const [days, setDays] = useState("");

  // Tab 2
  const [recipeName, setRecipeName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [uses, setUses] = useState<string[]>([]);
  const [extra, setExtra] = useState("");
  const [steps, setSteps] = useState("");

  const itemValid = name.trim().length > 0 && Number(days) > 0;
  const recipeValid = recipeName.trim().length > 0 && steps.trim().length > 0;

  const reset = () => {
    setName("");
    setCategory("vegetable");
    setQuantity("");
    setDays("");
    setRecipeName("");
    setMinutes("");
    setUses([]);
    setExtra("");
    setSteps("");
  };

  const close = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent className="max-h-[88vh] max-w-md overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-left text-xl">✏️ 手動輸入 / 家常食譜建立</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="item">
          <TabsList className="grid w-full grid-cols-2 rounded-full">
            <TabsTrigger value="item" className="rounded-full">
              新增食材
            </TabsTrigger>
            <TabsTrigger value="recipe" className="rounded-full">
              建立食譜
            </TabsTrigger>
          </TabsList>

          <TabsContent value="item" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">食材名稱</Label>
              <Input
                id="item-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：高麗菜"
              />
            </div>
            <div className="space-y-2">
              <Label>食材分類</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_EMOJI[c]} {CATEGORY_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-qty">剩餘數量 / 單位</Label>
              <Input
                id="item-qty"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="例如：1 顆、300g"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-days">保存剩餘天數</Label>
              <Input
                id="item-days"
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="例如：5"
              />
            </div>
            <Button
              className="w-full"
              disabled={!itemValid}
              onClick={() => {
                addItem({
                  name: name.trim(),
                  emoji: CATEGORY_EMOJI[category],
                  category,
                  daysLeft: Number(days),
                  quantity: quantity.trim() || "1 份",
                  location: "冷藏",
                  note: "手動新增",
                });
                close();
                toast.success(`已將「${name.trim()}」新增至冰箱`);
              }}
            >
              新增至冰箱
            </Button>
          </TabsContent>

          <TabsContent value="recipe" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="recipe-name">食譜名稱</Label>
              <Input
                id="recipe-name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="例如：阿嬤的紅燒肉"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipe-min">預估烹飪時間（分鐘）</Label>
              <Input
                id="recipe-min"
                type="number"
                min={1}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="例如：45"
              />
            </div>
            <div className="space-y-2">
              <Label>所需食材（從冰箱庫存勾選）</Label>
              <div className="max-h-44 space-y-1 overflow-y-auto rounded-2xl bg-secondary/50 p-2">
                {items.map((i) => (
                  <label
                    key={i.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-background"
                  >
                    <Checkbox
                      checked={uses.includes(i.id)}
                      onCheckedChange={() =>
                        setUses((prev) =>
                          prev.includes(i.id) ? prev.filter((x) => x !== i.id) : [...prev, i.id],
                        )
                      }
                    />
                    <span>{i.emoji}</span>
                    <span className="min-w-0 flex-1 truncate text-sm">{i.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipe-extra">額外需採買食材（以、分隔）</Label>
              <Input
                id="recipe-extra"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="例如：蒜頭 1 瓣、米酒"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipe-steps">烹飪步驟（每行一個步驟）</Label>
              <Textarea
                id="recipe-steps"
                rows={5}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder={"五花肉切塊汆燙。\n下鍋煸香後加入醬油與糖。\n小火燉煮 40 分鐘。"}
              />
            </div>
            <Button
              className="w-full"
              disabled={!recipeValid}
              onClick={() => {
                addRecipe({
                  name: recipeName.trim(),
                  emoji: "🍽️",
                  minutes: Number(minutes) || 30,
                  style: "自訂",
                  uses,
                  missing: extra
                    .split(/[、,，]/)
                    .map((s) => s.trim())
                    .filter(Boolean),
                  steps: steps
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                });
                close();
                toast.success(`已儲存家常食譜「${recipeName.trim()}」`);
              }}
            >
              儲存家常食譜
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
