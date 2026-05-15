## Why

新增项目文件夹时，如果不提供 `showcase` 配置，首页卡片没有个性化样式（无背景渐变、无强调色、默认动画）。需要一套内置的随机样式预设，让新项目即使不配置 showcase 也能有视觉区分度。同时，新项目不应默认绑定任何分类标签。

## What Changes

- 新增随机 showcase 样式预设池（8-10 种配色/渐变/动画组合）
- 项目注册时若未配置 `showcase`，自动基于 slug hash 从预设池确定性分配一套样式
- 新注册的项目不自动归入任何 tag 分类（仅出现在「全部」标签下）
- `tags` 字段在 `ProjectConfig` 中变为可选（默认空数组）

## Capabilities

### New Capabilities
- `random-showcase-presets`: 内置随机样式预设系统 — 提供多种 bgGradient + accentColor + animation 组合，基于 slug hash 确定性分配

### Modified Capabilities
- `solutions-blog`: 无变更

## Impact

- `src/types/project.ts` — `tags` 变为可选
- `src/components/ProjectCard.vue` — 无 showcase 时从预设池取值
- `src/config/tags.ts` — 新项目不需要手动添加到任何标签
- 新增 `src/config/showcase-presets.ts` — 预设样式定义
