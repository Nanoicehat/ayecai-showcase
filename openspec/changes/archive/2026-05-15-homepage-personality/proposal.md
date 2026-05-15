## Why

当前首页所有项目模块使用相同的背景色、边框样式和入场动画，缺乏个性。每个项目明明有自己的主题色，但在首页展示时看不出差异。Hero 区域只有渐变文字"阿椰菜"略显单薄，导航栏标题"我的项目展示"也过于普通。需要让每个项目在首页就展现自己的性格，同时让个人品牌更有记忆点。

## What Changes

- 项目模块个性化：每个项目在首页展示时使用自己的主题色作为背景渐变、标签颜色、按钮颜色、入场动画方向
- ProjectConfig 新增 `showcase` 可选字段，定义首页展示样式（背景渐变、入场动画类型等）
- Hero 区域升级：加入副标题装饰元素、个人身份标签、动态装饰粒子/图形
- NavBar 个性化：左上角改为"阿椰菜"品牌标识 + 渐变装饰 + hover 动画

## Capabilities

### New Capabilities
- `project-showcase-style`: 项目模块个性化样式——从 config 读取背景、入场动画类型、强调色
- `hero-personality`: Hero 区域个性升级——身份标签、装饰元素、更丰富的视觉层次
- `navbar-branding`: 导航栏品牌化——"阿椰菜"标识替代通用标题

### Modified Capabilities

## Impact

- `src/types/project.ts` — ProjectConfig 新增 `showcase` 字段
- `src/components/ProjectCard.vue` — 读取 showcase 配置，应用个性化样式和动画
- `src/views/Home.vue` — Hero 区域重新设计
- `src/components/NavBar.vue` — 品牌标识替代通用标题
- 各项目 `config.ts` — 添加 showcase 配置
