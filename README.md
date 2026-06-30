# Sun Pixel Verse Portfolio

一个 React + Vite 实现的个人作品集基础版本，定位为 AI 开发 / AI 产品经理方向的个人视觉档案馆。

## 初始化步骤

```bash
npm install
npm run dev
```

## 运行预览

开发预览：

```bash
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 文件结构

```text
D:\SunPixelVerse
├─ index.html
├─ package.json
├─ vite.config.js
├─ README.md
├─ public
│  └─ assets
│     └─ hero-ai-studio.png
└─ src
   ├─ App.jsx
   ├─ main.jsx
   ├─ components
   │  ├─ About.jsx
   │  ├─ Contact.jsx
   │  ├─ Hero.jsx
   │  ├─ Navbar.jsx
   │  ├─ Strengths.jsx
   │  └─ Works.jsx
   ├─ data
   │  └─ portfolio.js
   └─ styles
      └─ global.css
```

## 替换位置

- 个人信息、联系方式、CSDN/Gitee 链接：`src/data/portfolio.js`
- 首页 Hero 图片：替换 `public/assets/hero-ai-studio.png`
- 项目卡片标题、描述、标签和图标：`src/data/portfolio.js` 的 `works`
- About 简历亮点和统计数据：`src/data/portfolio.js` 的 `about` 和 `stats`
- 整体配色、玻璃拟态、像素动效和响应式：`src/styles/global.css`
