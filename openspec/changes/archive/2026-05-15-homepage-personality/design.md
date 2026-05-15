## Context

首页已有竖排 zigzag 布局 + preview 动画 + 标签配置。但所有项目模块视觉风格统一，缺乏辨识度。Hero 只有渐变文字名称，NavBar 是通用标题。需要在不改变架构的前提下，通过配置驱动实现每个模块的视觉差异化。

## Goals / Non-Goals

**Goals:**
- 每个项目模块在首页有独立的视觉表现（背景色、入场动画方向、按钮/标签颜色）
- 样式配置从 `config.ts` 的 `showcase` 字段读取，通过 CSS 变量注入
- Hero 区域：加入身份角色标签（如"前端开发者 / 创意极客"）、装饰浮动图形
- NavBar："阿椰菜"渐变品牌文字 + 旋转星标动画，替代"我的项目展示"

**Non-Goals:**
- 不改变项目详情页
- 不改变路由或标签配置系统
- 不引入第三方库

## Decisions

### 1. ProjectConfig.showcase 字段

```ts
interface ShowcaseStyle {
  bgGradient: string       // 模块背景渐变 CSS
  accentColor: string      // 强调色（标签、按钮）
  animation?: 'slide-up' | 'slide-left' | 'slide-right' | 'fade-scale' | 'rotate-in'
}
```

ProjectCard 根据此配置通过 CSS 变量注入 `--showcase-bg`、`--showcase-accent`，并动态绑定入场动画 class。

**理由**: 最小侵入性。现有 `theme` 字段用于项目详情页全局覆盖，`showcase` 仅控制首页模块展示，职责分离。

### 2. 个性化入场动画

提供 5 种入场动画供项目选择：
- `slide-up`（默认）：从下向上渐入
- `slide-left`：从左滑入
- `slide-right`：从右滑入
- `fade-scale`：放大渐入
- `rotate-in`：微旋转渐入

通过 CSS class 切换，不需要 JS 动画。

### 3. Hero 个性化

- 保留"阿椰菜"渐变大字
- 名称上方加身份标签行（小字，带装饰线）
- 名称下方打字机效果保留
- 添加 CSS 装饰元素：浮动的几何图形（圆、三角、方块），低透明度，缓慢浮动动画

### 4. NavBar 品牌化

- "我的项目展示" → "阿椰菜"渐变文字
- 星标 icon `✦` 加旋转 hover 动画
- 字体加粗，渐变与 Hero logo 一致

## Risks / Trade-offs

- **[showcase 字段缺省]** 未配置 showcase 的项目 → 使用默认样式（白底、slide-up 动画）
- **[装饰元素性能]** CSS 动画在低端设备 → 使用 `will-change` + `prefers-reduced-motion` 媒体查询关闭动画
