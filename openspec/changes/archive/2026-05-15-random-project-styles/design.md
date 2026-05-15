## Context

当前每个项目必须在 config.ts 中手动配置 `showcase` 对象（bgGradient, accentColor, animation）才能有个性化卡片样式。新项目如果跳过此步骤，卡片会没有背景渐变和强调色，视觉上缺乏区分度。

## Goals / Non-Goals

**Goals:**
- 新项目无需配置 showcase 即可获得个性化卡片样式
- 样式基于 slug 确定性分配（同一项目每次渲染一致）
- 新项目默认不绑定任何标签分类
- 预设池提供足够区分度（8+ 种组合）

**Non-Goals:**
- 不改变已有项目的显式 showcase 配置行为
- 不做运行时随机（每次刷新变化）
- 不自动推断标签分类

## Decisions

1. **预设池独立文件** — 新建 `src/config/showcase-presets.ts` 存放预设数组。与项目 config 解耦，方便后续增减预设。

2. **确定性分配算法** — 复用 solutions 模块已验证的 slug charCode 求和 + 取模方式。简单可靠，无需引入额外依赖。

3. **应用层在 ProjectCard** — 在 `ProjectCard.vue` 的 `showcaseVars` computed 中，若 `project.showcase` 为空则从预设池取值。改动集中在一个文件。

4. **tags 变为可选** — `ProjectConfig.tags` 类型改为 `tags?: string[]`，ProjectCard 渲染时默认空数组。新项目不加入 tags.ts 的任何分类即仅出现在「全部」标签下（已有逻辑支持）。

## Risks / Trade-offs

- [预设池较小时多项目可能撞色] → 提供 10 种预设，覆盖不同色相
- [修改 tags 为可选可能影响类型检查] → 所有现有项目已显式配置 tags，影响最小
