# Fridge Flow ya

目前手機版畫面資訊過於擁擠，請幫我重新架構頁面，採用「多頁面路由 (Multi-page Navigation)」進行功能分流與模組化，調整如下：

1. 重構【首頁 (Homepage)】：

   - 保持極簡！頂部僅保留即期警告橫幅（例如：有 3 樣食材即將過期）。

   - 只顯示「🚨 優先處理食材」摘要（僅列出前 3 項最急迫的食材卡片）。

   - 只顯示「🍳 今日首選食譜」（1 張卡片，附帶【查看食譜】彈窗）。

   - 移除首頁底部的全庫存網格與分類篩選列，避免畫面過長。

2. 新建【我的冰箱庫存頁面 (`/inventory`)】：

   - 從側邊選單「🧊 我的冰箱庫存」點擊進入。

   - 將搜尋列、分類標籤（全部/蔬菜/肉品/乳製品/其他）移至此頁頂部。

   - 以兩欄網格 (2-column Grid) 完整展示所有冰箱食材倒數卡片。

   - 點擊任一食材卡片，需跳出 Modal 彈窗顯示食材詳細資訊與【編輯數量】/【刪除庫存】按鈕。

3. 新建【家常食譜與推薦頁面 (`/recipes`)】：

   - 從側邊選單「🍳 家常食譜與推薦」點擊進入。

   - 上方放置「即期食材勾選區」，勾選後可點擊【生成清冰箱料理】。

   - 下方列表展示多道 AI 推薦食譜卡片（包含：奶油燉菇燉飯、蒜香雞胸義大利麵等）。

   - 點擊食譜卡片跳出詳細步驟彈窗，並提供「🎉 已做完此料理（一鍵扣除冰箱食材）」按鈕。

4. 側邊選單 (Sidebar Drawer) 與底部導覽：

   - 側邊選單維持原樣，點擊各項目可順暢切換至對應頁面。

   - 底部懸浮「＋」按鈕保留（點擊由下往上彈出：發票匯入/AI拍照掃描/手動輸入選單）。

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/70214966-bf4c-47c5-ad82-ad889174c847).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
