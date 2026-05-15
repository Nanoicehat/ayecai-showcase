## 1. 类型修改

- [x] 1.1 将 ProjectConfig.tags 改为可选字段（`tags?: string[]`）

## 2. 预设池

- [x] 2.1 创建 `src/config/showcase-presets.ts`，定义 10 种 showcase 预设（bgGradient + accentColor + animation）

## 3. 卡片组件适配

- [x] 3.1 在 ProjectCard.vue 中，当 project.showcase 未定义时从预设池基于 slug hash 分配样式
- [x] 3.2 确保 tags 为空时不渲染标签区域
