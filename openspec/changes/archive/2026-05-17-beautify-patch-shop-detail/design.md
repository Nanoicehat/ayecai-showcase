## Context

`src/projects/creative-portfolio/index.vue` 是当前唯一的项目详情页，370 行。现需要升级视觉设计而不引入第三方库。ProjectPage.vue 通过 `<Suspense>` 加载此组件并注入主题 CSS 变量。

主题色：`--color-primary: #e07c54`（暖橙）。所有新组件复用此变量，保持一致性。

## Goals / Non-Goals

**Goals:**
- Hero 区域：粒子浮动背景 + 逐字标题入场 + 统计数字跳动
- 特性卡片：玻璃态（backdrop-filter blur）+ hover 3D translate + 滚动 reveal
- 技术栈：CSS 进度条 + Intersection Observer 驱动填充动画
- 时间轴：CSS 竖线 + 步骤卡片，滚动依次点亮
- 终端模拟器：打字机光标 + 按钮复制命令
- 全页 scroll reveal（Intersection Observer + class toggle）
- 零第三方依赖，纯 CSS 动画 + vanilla JS

**Non-Goals:**
- 不改 config.ts / registry.ts / ProjectPage.vue / router.ts
- 不引入 Three.js、GSAP、Animate.css 等库
- 不修改项目 slug 或路由

## Decisions

1. **Scroll reveal 策略**：`onMounted` 中创建 IntersectionObserver，observe 所有 `[data-reveal]` 元素。进入 viewport 时添加 `.revealed` class，CSS transition 处理动画。`onUnmounted` disconnect。理由：轻量，无框架依赖，性能好。

2. **粒子背景**：CSS-only 多层 div + absolute 定位 + 随机 keyframes。不用 canvas，因为粒子数少（~15 个），CSS 足够且更易维护。

3. **玻璃态卡片**：`background: rgba(255,255,255,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.8);`。Safari 支持 backdrop-filter，本项目无 IE 需求。

4. **统计数字跳动**：IntersectionObserver 触发 → JS `requestAnimationFrame` 从 0 缓动到目标值。不依赖 countUp 库。

5. **进度条动画**：CSS `@property` 或内联 `style.setProperty('--progress', value)` 驱动 `width` transition。Observer 进入时设置目标值。

6. **终端复制按钮**：`navigator.clipboard.writeText()` + toast 提示。减少 4 个独立按钮，改为每行一个复制图标。

## Risks / Trade-offs

- [backdrop-filter 性能] → 仅用于 4 张卡片，hover 时才 blur，不会触发大面积重绘
- [IntersectionObserver 兼容性] → 所有现代浏览器支持，本项目目标用户为 GitHub Pages 访客
- [文件变长] → 单文件 ~500 行，仍在可维护范围内，比拆分更简单
