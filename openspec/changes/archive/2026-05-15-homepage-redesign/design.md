## Context

首页当前是标准 3 列卡片网格 + 自动聚合标签。用户"阿椰菜"希望首页更有个人辨识度和视觉冲击力。核心改动：标签可配置、竖排项目展示、项目级自定义动画、个人品牌 Hero。

## Goals / Non-Goals

**Goals:**
- 标签从配置文件读取，少量精选标签而非全部自动聚合
- 首页 Hero 展示"阿椰菜"品牌，带入场动画
- 项目展示竖排，每个项目一行，视觉独立
- 每个项目可提供可选的 `preview.vue` 组件作为展示动画
- 无 `preview.vue` 时使用默认封面图展示
- 滚动入场动画让页面有层次感

**Non-Goals:**
- 不做全屏 landing page 或视差滚动
- 不改变项目详情页
- 不改变路由结构
- 不引入第三方动画库（纯 CSS + Intersection Observer）

## Decisions

### 1. 标签配置方案

**选择**: 新建 `src/config/tags.ts` 配置文件，定义 `TagConfig` 数组：

```ts
export interface TagConfig {
  label: string           // 展示文本
  icon?: string           // 可选 emoji 图标
  projects: string[]      // 关联的项目 slug 列表
}

export const tags: TagConfig[] = [
  { label: '全部', icon: '📦', projects: [] },  // 空数组 = 显示全部
  { label: '前端', icon: '🎨', projects: ['creative-portfolio', 'minimal-blog'] },
  { label: '数据', icon: '📊', projects: ['tech-dashboard'] },
  { label: 'AI', icon: '🤖', projects: ['ai-chat-app'] },
]
```

首页从此配置读取标签，而不是从项目 tags 字段自动聚合。项目 `config.ts` 中的 `tags` 字段仍保留用于卡片内展示。

**理由**: 完全控制首页显示哪些标签、标签数量、标签与项目的多对多关系。比在项目 config 里加分类字段更灵活。

### 2. 项目展示动画模块化

**选择**: 每个项目文件夹可选导出 `preview.vue` 组件。ProjectConfig 类型新增可选字段 `previewComponent`，通过动态 import 懒加载。

```
src/projects/<slug>/
  ├── index.vue       # 项目详情页（已有）
  ├── config.ts       # 项目配置（已有）
  ├── preview.vue     # [新增·可选] 首页展示动画组件
  └── ...
```

首页展示区域检测项目是否有 preview 组件：有则渲染，无则使用默认封面图+悬浮效果。

**理由**: 最大化模块隔离。每个项目完全控制自己在首页的展示效果，不污染全局代码。

### 3. 竖排项目展示布局

**选择**: 每个项目一行，左右分栏：一侧是项目信息（标题/描述/标签/链接），另一侧是 preview 动画或封面图。奇偶行交替左右布局（zigzag）增加视觉变化。

**理由**: 竖排让每个项目有足够空间展示个性化内容，zigzag 布局避免单调。

### 4. 滚动入场动画

**选择**: 自定义 composable `useScrollReveal`，基于 Intersection Observer API，元素进入视口时添加 CSS class 触发动画。

**理由**: 零依赖、性能好、声明式使用。

### 5. Hero 品牌区域

**选择**: 居中大标题"阿椰菜"，打字机效果展示副标题（多行轮播），CSS 渐入动画。用 CSS 文字动画做 logo 效果，不需要图片。

**理由**: 纯代码实现，无额外资源依赖，加载快。

## Risks / Trade-offs

- **[Preview 组件找不到]** 动态 import 可能在无 preview.vue 时报错 → config.ts 中声明 `hasPreview: true` 字段，仅 true 时尝试加载
- **[滚动动画性能]** 大量元素同时监听 → Intersection Observer 本身高性能，且仅 4 个项目，无问题
- **[Zigzag 移动端]** 左右交替在窄屏不适用 → 移动端统一改为上下排列
