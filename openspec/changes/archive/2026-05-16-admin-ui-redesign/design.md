## Architecture

管理后台是独立 Vue 3 应用（admin/），有自己的 style.css 全局样式和组件 scoped styles。改动范围限于 admin/ 目录。

### 设计策略

**不复制前台代码**，而是将前台的设计 token（CSS 变量）移植到 admin/src/style.css，然后逐个组件调整。

## Design Decisions

### 1. 色彩体系

从前台 variables.css 提取：
- `--color-primary: #5b9bd5`（主色）
- `--color-primary-light: #a8d0f0`
- `--color-primary-dark: #3a7bc8`
- `--color-secondary: #7ec8a4`（绿色辅助）
- `--color-accent: #f0c27a`（点缀）
- 背景/文字/边框等同步对齐

### 2. 侧边栏

- 深色 → 白底 + 左侧细线分隔
- 导航项 active 状态：左侧 3px 主色竖线 + 浅蓝背景 + 主色文字
- hover：浅灰背景过渡

### 3. 卡片和间距

- 卡片圆角 10px（前台 --radius-md）
- 柔和阴影 `0 4px 12px rgba(0,0,0,0.06)`
- 内边距适当增大

### 4. 文章列表

- 从水平列表 → 卡片网格（2列）
- 每张卡片有封面图区域（或渐变占位）+ 标题 + 分类标签 + 日期
- hover 微上移 + 阴影增强

### 5. 按钮

- 主按钮渐变：`linear-gradient(135deg, #5b9bd5, #7ec8a4)`
- ghost 按钮保留但边框细化
- 圆角 6px

### 6. 输入框/Select

- 圆角 6px
- focus 边框 #5b9bd5 + 浅蓝 box-shadow
- 柔和 transition

## Scope

只涉及 admin/ 目录下：
- `admin/src/style.css` — 全局 CSS 变量 + 基础样式
- `admin/src/App.vue` — 侧边栏布局
- `admin/src/views/ArticleList.vue` — 文章列表网格化
- `admin/src/views/ArticleEditor.vue` — 编辑器页面微调
- `admin/src/views/CategoryManager.vue` — 分类页面微调
- `admin/src/components/ImportDialog.vue` — 对话框样式微调

## Dependencies

无外部依赖变更。纯 CSS 重构。
