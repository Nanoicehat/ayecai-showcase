## Context

creative-portfolio 是项目展示站中唯一的项目卡片，目前显示为虚构画廊 Demo。项目展示站本身需要自述入口，因此将该卡片重新定位为展示站的信息页。

## Goals / Non-Goals

**Goals:**
- config.ts 中 title →「阿椰菜补丁铺」
- config.ts 中 description → 本项目简介（基于 README）
- config.ts 中 github → `https://Nanoicehat.github.io/ayecai-showcase/`

**Non-Goals:**
- 不修改 index.vue（详情页内容作为 Demo 保留）
- 不修改 registry.ts / tags.ts
- 不涉及路由或其他基础设施

## Decisions

- 仅修改 config.ts 三个字段，index.vue 保持画廊展示内容不变。标题和介绍在卡片/详情页头部渲染，详情页主体由 index.vue 控制，两者独立。

## Risks / Trade-offs

- 无风险。纯静态配置修改，不影响构建。
