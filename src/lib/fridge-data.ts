export type Category = "vegetable" | "meat" | "dairy" | "fruit" | "seafood" | "other";

export const CATEGORY_LABELS: Record<Category | "all", string> = {
  all: "全部",
  vegetable: "蔬菜",
  meat: "肉品",
  dairy: "乳製品",
  fruit: "水果",
  seafood: "海鮮",
  other: "其他",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  vegetable: "🥬",
  meat: "🥩",
  dairy: "🥛",
  fruit: "🍎",
  seafood: "🐟",
  other: "🍱",
};

export type FridgeItem = {
  id: string;
  name: string;
  emoji: string;
  category: Category;
  daysLeft: number;
  quantity: string;
  location: string;
  note: string;
};

export type Recipe = {
  id: string;
  name: string;
  emoji: string;
  minutes: number;
  style: string;
  uses: string[];
  missing: string[];
  steps: string[];
};

export const SEED_ITEMS: FridgeItem[] = [
  { id: "spinach", name: "菠菜", emoji: "🥬", category: "vegetable", daysLeft: 1, quantity: "1 把", location: "冷藏 · 蔬果層", note: "葉菜類建議兩天內食用完畢" },
  { id: "milk", name: "鮮奶", emoji: "🥛", category: "dairy", daysLeft: 2, quantity: "930 ml", location: "冷藏 · 門邊", note: "開封後請盡快飲用" },
  { id: "chicken", name: "雞胸肉", emoji: "🍗", category: "meat", daysLeft: 2, quantity: "2 片", location: "冷藏 · 生鮮層", note: "可分裝冷凍延長保存" },
  { id: "mushroom", name: "香菇", emoji: "🍄", category: "vegetable", daysLeft: 3, quantity: "150 g", location: "冷藏 · 蔬果層", note: "保持乾燥避免出水" },
  { id: "pork", name: "豬五花肉片", emoji: "🥩", category: "meat", daysLeft: 3, quantity: "300 g", location: "冷藏 · 生鮮層", note: "適合火鍋或炒菜" },
  { id: "pepper", name: "青椒", emoji: "🫑", category: "vegetable", daysLeft: 4, quantity: "3 顆", location: "冷藏 · 蔬果層", note: "" },
  { id: "corn", name: "甜玉米", emoji: "🌽", category: "vegetable", daysLeft: 7, quantity: "2 根", location: "冷藏 · 蔬果層", note: "" },
  { id: "carrot", name: "胡蘿蔔", emoji: "🥕", category: "vegetable", daysLeft: 8, quantity: "4 根", location: "冷藏 · 蔬果層", note: "" },
  { id: "apple", name: "蘋果", emoji: "🍎", category: "other", daysLeft: 10, quantity: "5 顆", location: "冷藏 · 蔬果層", note: "" },
  { id: "egg", name: "雞蛋", emoji: "🥚", category: "other", daysLeft: 14, quantity: "12 顆", location: "冷藏 · 門邊", note: "" },
  { id: "onion", name: "洋蔥", emoji: "🧅", category: "vegetable", daysLeft: 15, quantity: "3 顆", location: "常溫 · 儲物櫃", note: "" },
  { id: "cheese", name: "起司片", emoji: "🧀", category: "dairy", daysLeft: 20, quantity: "8 片", location: "冷藏 · 門邊", note: "" },
  { id: "butter", name: "奶油", emoji: "🧈", category: "dairy", daysLeft: 30, quantity: "200 g", location: "冷藏 · 門邊", note: "" },
  { id: "stock", name: "罐頭高湯", emoji: "🥫", category: "other", daysLeft: 60, quantity: "2 罐", location: "常溫 · 儲物櫃", note: "" },
];

export const RECIPES: Recipe[] = [
  {
    id: "mushroom-risotto",
    name: "奶油蘑菇燉飯",
    emoji: "🍲",
    minutes: 40,
    style: "家常",
    uses: ["mushroom", "milk", "butter", "onion", "stock"],
    missing: [],
    steps: [
      "洋蔥切碎，香菇切片備用。",
      "鍋中放入奶油，炒香洋蔥至透明。",
      "加入香菇拌炒出香氣，倒入米粒略炒。",
      "分次加入高湯，邊煮邊攪拌約 20 分鐘。",
      "最後加入鮮奶與起司調味，收汁即可上桌。",
    ],
  },
  {
    id: "garlic-chicken-pasta",
    name: "蒜香雞胸義大利麵",
    emoji: "🍜",
    minutes: 25,
    style: "家常",
    uses: ["chicken", "pepper", "butter"],
    missing: ["蒜頭 1 瓣"],
    steps: [
      "雞胸肉切片，以鹽與黑胡椒醃 10 分鐘。",
      "煮滾一鍋水，加鹽下義大利麵煮 8 分鐘。",
      "熱鍋下奶油與蒜片爆香，放入雞胸煎至金黃。",
      "加入青椒拌炒，倒入麵條與少許煮麵水拌勻。",
      "起鍋前撒上黑胡椒與起司即完成。",
    ],
  },
  {
    id: "spinach-egg-soup",
    name: "菠菜蛋花湯",
    emoji: "🥣",
    minutes: 15,
    style: "快煮",
    uses: ["spinach", "egg", "stock"],
    missing: [],
    steps: ["高湯煮滾。", "放入菠菜煮軟。", "蛋液沿鍋邊繞圈倒入，輕輕攪散。", "加鹽與香油調味。"],
  },
  {
    id: "pork-pepper-stirfry",
    name: "青椒炒五花肉",
    emoji: "🥘",
    minutes: 20,
    style: "家常",
    uses: ["pork", "pepper", "onion"],
    missing: [],
    steps: ["五花肉片下鍋煸出油脂。", "加入洋蔥拌炒。", "放入青椒快炒 2 分鐘。", "以醬油與糖調味起鍋。"],
  },
  {
    id: "cheese-corn-bake",
    name: "起司玉米焗烤",
    emoji: "🧀",
    minutes: 30,
    style: "烤箱",
    uses: ["corn", "cheese", "milk", "butter"],
    missing: [],
    steps: ["玉米粒與奶油拌勻鋪盤。", "淋上鮮奶。", "鋪滿起司片。", "200°C 烤 15 分鐘至金黃。"],
  },
];

export function statusOf(daysLeft: number) {
  if (daysLeft <= 2) return "urgent" as const;
  if (daysLeft <= 4) return "warn" as const;
  return "safe" as const;
}
