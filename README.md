<img src="https://raw.githubusercontent.com/suanriz/rizi/refs/heads/master/public/img/logoFooter.webp" height="96px" alt="logo">

# [好日子咖啡輕食 (RIZI COFE HOUSE)](https://suanriz.github.io/rizi/)

[![Build](https://github.com/suanriz/rizi/actions/workflows/ci.yaml/badge.svg)](https://github.com/suanriz/rizi/actions/workflows/ci.yaml)
[![Codecov](https://codecov.io/gh/suanriz/rizi/branch/master/graph/badge.svg)](https://codecov.io/gh/suanriz/rizi)
[![Node.js](https://img.shields.io/badge/Node.js-v20.19.6-0FC93F?logo=node.js&logoColor=FFFFFF&labelColor=505050)](https://nodejs.org/en/blog/release/v20.19.6)
[![Pnpm](https://img.shields.io/badge/Pnpm-10.26.0-0FC93F?logo=pnpm&logoColor=FFFFFF&labelColor=505050)](https://pnpm.io/)
<br/>
<br/>
<br/>

## 特色功能 (Features)
- **響應式設計 (Responsive Design)**：
  - 支援 Desktop、Tablet 與 Mobile 裝置瀏覽。
- **購物車系統 (Shopping Cart)**：
  - 支援商品加入購物車與收藏清單。
  - 自動計算總價、折扣與優惠金額。
  - 支援結帳寄發 Email 確認功能。
- **資訊展示**：
  - 展示品牌核心價值與最新活動。
- **高品質程式碼**：
  - 嚴格的 ESLint 規範。
  - 單元測試。
<br/>

## 技術棧 (Tech Stack)

| 類別         | 技術                           |
| ------------ | ----------------------------- |
| **核心框架** | Nuxt 4 (Vue 3 Composition API), TypeScript        |
| **狀態管理** | Pinia, pinia-plugin-persistedstate |
| **樣式設計** | TailwindCSS 4, Ant Design Vue  |
| **測試框架** | Vitest, Nuxt Test Utils         |
| **代碼管理** | Esint 9                        |
<br/>

## 測試覆蓋率 (Test Coverage)

```text
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |     100 |      100 |     100 |     100 | 
 stores             |     100 |      100 |     100 |     100 | 
  cartStore.ts      |     100 |      100 |     100 |     100 | 
  favouriteStore.ts |     100 |      100 |     100 |     100 | 
 utils              |     100 |      100 |     100 |     100 | 
  tool.ts           |     100 |      100 |     100 |     100 | 
 utils/simulation   |     100 |      100 |     100 |     100 | 
  banners.ts        |     100 |      100 |     100 |     100 | 
  goods.ts          |     100 |      100 |     100 |     100 | 
  menu.ts           |     100 |      100 |     100 |     100 | 
  news.ts           |     100 |      100 |     100 |     100 | 
--------------------|---------|----------|---------|---------|-------------------
