## Context

4 个项目各有 `preview.vue`，当前动画效果较基础。所有动画纯 CSS + 少量 JS（requestAnimationFrame 数字动画）。项目间隔离良好，每个 preview.vue 独立于各自文件夹，通过 `defineAsyncComponent` 懒加载到首页 ProjectCard 中。

## Goals / Non-Goals

**Goals:**
- 每个项目 preview 动画更丰富、更有辨识度
- 保持纯 CSS 动画 + 少量 vanilla JS，不引入第三方库
- 4 个 preview 可独立并行开发（用不同 agent 分别实现）
- 保持 preview 容器尺寸兼容（aspect-ratio 4/3 在 ProjectCard 中）

**Non-Goals:**
- 不改变 ProjectCard 容器或 showcase 样式系统
- 不改变项目详情页
- 不增加新的 composable 或共享组件

## Decisions

### 1. creative-portfolio — 画廊拼贴

- 3-4 张图片卡片，Masonry 风格错落排列
- 每张卡片交错淡入 + 微旋转（不同角度）
- Hover 状态：卡片微放大 + 阴影加深
- 背景：暖色渐变底 + 散落的小圆点装饰

### 2. tech-dashboard — 数据可视化

- 保留数值滚动动画（已有 requestAnimationFrame）
- 柱状图改为折线图 SVG path 绘制动画（stroke-dashoffset）
- 指标卡片入场改为翻转效果（rotateX）
- 添加数据点脉冲闪烁效果

### 3. minimal-blog — 沉浸排版

- 保留骨架线条概念但改为更真实的排版模拟
- 添加标题行（粗体块）、引用块（左侧竖线装饰）
- 段落逐行从左淡入，模拟打字效果
- 闪烁光标在最后一行闪烁
- 整体更黑白简约，高对比

### 4. ai-chat-app — 对话流

- 气泡入场改用弹性动画（cubic-bezier 弹跳）
- 用户/AI 头像添加呼吸光圈（box-shadow 脉冲）
- AI 思考指示器：3 个点改为更有节奏的波浪跳动
- 最后添加一个 AI 回复气泡的逐字展开效果

## Risks / Trade-offs

- **[SVG 路径动画兼容性]** stroke-dashoffset 动画在所有现代浏览器支持良好，无风险
- **[动画性能]** 所有动画使用 transform/opacity，不触发 layout，保持 60fps
- **[并行开发]** 4 个 preview.vue 完全独立，可安全并行修改无冲突
