## Why

阿椰菜补丁铺详情页（creative-portfolio/index.vue）是展示站唯一的项目入口，目前视觉表现平庸，缺乏让人驻足的视觉亮点。需要将详情页升级为更有层次感、动效丰富、交互精致的高品质展示页。

## What Changes

- 重写 Hero 区域：视差粒子背景 + 大标题 + 光晕 + 数字统计
- 特性卡片：玻璃态（glassmorphism）+ hover 3D 翻转 + 图标微交互动效
- 技术栈：进度条动画 + 滚动触发（Intersection Observer）
- 新增流程步骤时间轴（新增项目 → 注册 → 部署）
- 终端区域：添加打字机光标闪烁 + 复制按钮
- 全页滚动触发 reveal 动画（fade-in-up, scale-in）
- 背景装饰元素：渐变波纹、网格纹理
- 纯 CSS 动画 + vanilla Intersection Observer，零第三方依赖

## Capabilities

### New Capabilities

- `detail-page-hero`: 视差粒子背景Hero，含数字统计和大标题入场动画
- `detail-page-cards`: 玻璃态特性卡片，hover 3D 效果，滚动 reveal
- `detail-page-tech`: 技术栈进度条，Intersection Observer 触发计数动画
- `detail-page-timeline`: 项目流程时间轴组件
- `detail-page-terminal`: 终端模拟器，打字机效果 + 复制按钮
- `scroll-reveal`: Intersection Observer 驱动的通用滚动入场动画

### Modified Capabilities

<!-- No existing specs to modify -->

## Impact

- `src/projects/creative-portfolio/index.vue` — 模板 + 脚本 + 样式全面重构
- 不修改 config.ts、registry.ts、路由、ProjectPage.vue
- 不引入新依赖
