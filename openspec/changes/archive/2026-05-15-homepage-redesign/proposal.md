## Why

当前首页功能基本可用但视觉体验平淡：标签从所有项目自动聚合导致过多且不可控，项目卡片是标准网格布局缺乏个性，没有个人品牌展示，缺少动画让页面显得静态。需要一次首页体验升级，让网站更有个人特色和视觉吸引力。

## What Changes

- **标签系统重构**：从自动聚合改为可配置化，通过配置文件定义展示标签及其与项目文件夹的映射关系，减少标签数量
- **个人品牌 Hero**：Hero 区域加入"阿椰菜"个人 logo/头像、打字动画、渐入效果
- **项目展示重设计**：从 3 列网格改为竖排单列，每个项目占一行，独立模块化展示；每个项目可从自己的文件夹提供自定义展示动画组件
- **全局动画增强**：滚动入场动画、hover 微交互、过渡动效

## Capabilities

### New Capabilities
- `tag-config`: 可配置标签系统——标签定义、标签与项目映射、标签显示控制
- `project-showcase-animation`: 项目展示动画模块化——每个项目文件夹可导出自定义预览动画组件
- `hero-branding`: 个人品牌 Hero 区域——"阿椰菜" logo、打字动画、渐入效果
- `scroll-animations`: 滚动驱动入场动画——Intersection Observer 实现元素滚动时渐入

### Modified Capabilities
- `showcase-home`: 项目展示从网格布局改为竖排单列独立模块

## Impact

- `src/types/project.ts` — ProjectConfig 新增可选 `preview` 组件字段
- `src/projects/registry.ts` — 标签配置从自动聚合改为配置文件驱动
- `src/views/Home.vue` — 全面重写：Hero、标签、项目列表
- `src/components/ProjectCard.vue` — 重写为竖排全宽展示模块
- 每个项目文件夹新增可选 `preview.vue` — 项目个性化展示动画组件
- 新增 `src/composables/useScrollReveal.ts` — 滚动入场动画 composable
- 新增 `src/config/tags.ts` — 标签配置文件
