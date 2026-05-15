## Context

当前网站是纯项目展示站，NavBar 只有品牌 logo + 返回按钮，路由只有首页和项目详情。需要在不破坏现有架构的前提下，增加「椰菜优解」博客功能，从静态 markdown 文件加载内容。

现有技术栈：Vue 3 + Vite + TypeScript + Vue Router 4 (hash mode)，零外部运行时依赖。

## Goals / Non-Goals

**Goals:**
- 导航栏支持多 tab 切换（开源项目 / 椰菜优解）
- 博客文章从 `public/solutions/` 目录的 md 文件加载
- 支持多级目录分类（如 `ai/`, `devops/`）
- 文章列表页 + 文章详情页，类 blog 美观排版
- 构建时生成文章索引（避免运行时遍历目录）

**Non-Goals:**
- 不做搜索功能
- 不做评论系统
- 不做 RSS/订阅
- 不做服务端渲染（维持纯静态部署）
- 不做标签/分类筛选（首版）

## Decisions

### 1. Markdown 内容管理方式：构建时生成索引 JSON

**选择**：在 `public/solutions/` 放 md 文件，用 Vite 插件或构建脚本生成 `solutions-index.json`（包含标题、日期、摘要、路径、分类）。运行时 fetch JSON 获取列表，fetch 单个 md 获取内容。

**备选**：
- A) 运行时用 `import.meta.glob` 导入所有 md → 会打包进 JS bundle，不适合内容频繁更新
- B) 手写索引文件 → 容易忘记更新，维护成本高

**理由**：静态站无后端，构建时生成索引兼顾自动化和性能。md 放 public/ 目录不经 Vite 处理，可独立更新。

### 2. Markdown 渲染：marked + 自定义样式

**选择**：使用 `marked` 库运行时渲染 markdown。轻量（~40KB gzipped），无需构建时转换，支持 GFM 表格等。

**备选**：
- A) markdown-it → 插件体系强但体积更大，当前需求不需要
- B) 构建时转为 HTML 静态文件 → 失去 SPA 体验，且需额外构建步骤

### 3. 导航架构：tab 式顶部导航

**选择**：NavBar 增加 tab 链接（开源项目 → `/`，椰菜优解 → `/solutions`），当前 tab 高亮。保留品牌 logo 不变。

**理由**：最小改动，符合用户心智模型，不需要侧边栏或下拉菜单。

### 4. 文章元数据：md frontmatter

**选择**：每篇 md 用 YAML frontmatter 定义 title、date、category、summary。构建脚本解析 frontmatter 生成索引。

```yaml
---
title: Agent信息收集
date: 2025-05-15
category: ai
summary: 个人Agent环境方案与工具推荐
---
```

### 5. URL 结构

- 列表页：`/#/solutions`
- 详情页：`/#/solutions/:category/:slug`（slug = 文件名去 .md）

## Risks / Trade-offs

- **[md 文件更新需重新构建]** → 可接受：GitHub Actions 推送后自动 build。后续可加 watch 脚本。
- **[marked 运行时渲染有 XSS 风险]** → 内容均为自己撰写，非用户输入。仍启用 marked 的 sanitize 选项。
- **[首版无搜索/筛选]** → 文章少时不需要，后续按需加。
