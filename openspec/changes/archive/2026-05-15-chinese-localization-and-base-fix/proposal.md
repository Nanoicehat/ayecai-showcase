## Why

当前网站 URL 路径包含仓库文件夹名 `demo-proj-260515`，部署到 GitHub Pages 用户自定义域名或 `<user>.github.io` 根站点时路径不正确。同时网站界面为英文，目标用户为中文用户，需要全站中文化。此外缺少真实感的 mock 项目内容来展示网站效果。

## What Changes

- **BREAKING** Vite `base` 从 `/demo-proj-260515/` 改为 `/`，所有资源路径不再包含仓库名
- 网站全部中文化：页面标题、导航栏、hero 文案、项目卡片、项目详情内容
- 三个 demo 项目内容改为中文，贴近真实项目介绍
- 创建一个新的 mock 项目文件夹，包含实际可展示内容

## Capabilities

### New Capabilities
- `mock-project-content`: 创建贴近真实场景的 mock 项目内容，用于展示网站效果

### Modified Capabilities
- `app-shell`: 页面标题和导航栏文案改为中文，base 路径从 `/demo-proj-260515/` 改为 `/`
- `showcase-home`: hero 区域文案改为中文
- `project-page`: 返回链接等 UI 文案改为中文
- `project-module`: 三个 demo 项目标题、描述、内容全部中文化

## Impact

- `vite.config.ts` — base 路径变更
- `index.html` — 页面标题
- `src/components/NavBar.vue` — 导航文案
- `src/views/Home.vue` — hero 文案
- `src/views/ProjectPage.vue` — UI 文案
- `src/projects/*/config.ts` — 项目元数据
- `src/projects/*/index.vue` — 项目内容
- `.github/workflows/deploy.yml` — 无需变更（base 变更不影响构建流程）
