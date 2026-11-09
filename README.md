# Laly Chang 履歷作品集

純靜態網站（HTML/CSS/JS），可直接部署到 GitHub Pages。

## 部署
1. 在 GitHub 建立 repo（例如 `portfolio`）
2. 上傳本資料夾所有檔案（index.html 與 assets/）
3. Settings → Pages → Branch 選 `main`、資料夾 `/ (root)` → Save
4. 約 1 分鐘後網址：`https://你的帳號.github.io/portfolio/`

## 修改
- 專案內容：編輯 `index.html` 中的 `const P=[...]`
- 自我介紹、Email、GitHub 連結：搜尋 `your@email.com` / `your-name` 替換
- 換封面圖：把 PNG 放進 `assets/`，檔名對應 `i` 欄位
- 履歷 PDF：放一份 `resume.pdf` 在同層，「下載履歷」按鈕就會生效
- 品牌色：改 `index.html` 最上方 `:root` 的 `--accent` 等變數
