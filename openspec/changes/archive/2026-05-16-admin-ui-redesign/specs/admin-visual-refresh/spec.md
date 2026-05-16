## admin-visual-refresh

管理后台视觉风格全面对齐前台 showcase 设计语言。

### CSS 变量体系（style.css :root）

```css
:root {
  --color-primary: #5b9bd5;
  --color-primary-light: #a8d0f0;
  --color-primary-dark: #3a7bc8;
  --color-secondary: #7ec8a4;
  --color-accent: #f0c27a;
  --color-bg: #fafbfc;
  --color-bg-card: #ffffff;
  --color-sidebar: #ffffff;
  --color-sidebar-border: #e8ecf0;
  --color-border: #e8ecf0;
  --color-text: #2c3e50;
  --color-text-muted: #6b7c8d;
  --color-text-light: #94a3b8;
  --color-success: #7ec8a4;
  --color-danger: #ef4444;
  --radius: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.06);
  --transition-fast: 0.15s ease;
  --transition-normal: 0.25s ease;
}
```

### 侧边栏（App.vue）

- 白色背景 + 右边框 `1px solid var(--color-sidebar-border)`
- 标题区加柔和渐变或主色文字
- nav-item active：左侧 3px solid 主色 + 背景 `rgba(91,155,213,0.08)` + 文字色 `var(--color-primary-dark)`
- nav-item hover：背景 `rgba(0,0,0,0.03)`
- 图标和文字颜色从白色 → `var(--color-text)` / `var(--color-text-muted)`

### 按钮

- `.primary`：`background: linear-gradient(135deg, #5b9bd5 0%, #7ec8a4 100%)`，hover 稍加深
- `.ghost`：保持透明，hover 背景 `var(--color-bg)`
- 圆角统一 `var(--radius)`

### 文章列表（ArticleList.vue）

- 从垂直列表 → 2 列网格 `grid-template-columns: repeat(2, 1fr)`
- 卡片：上图下文布局，圆角 `var(--radius-md)`，阴影 `var(--shadow-sm)`
- 封面区域：高 140px，无封面时显示柔和渐变占位
- hover：translateY(-2px) + shadow-md
- 分类标签：小圆角胶囊，渐变背景同主按钮
- 日期：右上角小字

### 输入框/Select

- 圆角 var(--radius)
- focus：border-color var(--color-primary) + box-shadow `0 0 0 3px rgba(91,155,213,0.12)`
- transition var(--transition-fast)

### 对话框

- 圆角 var(--radius-md)
- 阴影 var(--shadow-lg)
- 标题用主色

### 页面标题

- 带渐变色文字效果（同前台 solutions-title）：`background: linear-gradient(135deg, #5b9bd5, #7ec8a4); -webkit-background-clip: text; color: transparent`
