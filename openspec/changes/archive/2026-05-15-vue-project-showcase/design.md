## Context

构建个人项目展示网站，部署到 GitHub Pages。核心挑战：每个项目需要独立的视觉风格，同时共享统一的应用框架。需要在模块隔离和代码复用之间取得平衡。

当前状态：从零开始，无现有代码。

约束：
- GitHub Pages 仅支持静态文件，无服务端
- 使用 hash 路由（`#/`）避免 GitHub Pages 刷新 404
- 所有项目数据静态化，构建时确定

## Goals / Non-Goals

**Goals:**
- 建立可扩展的项目模块化架构，新增项目只需添加文件夹和配置
- 每个项目样式完全隔离，互不影响
- 首页清新浅色系，项目页可自定义风格
- 路由懒加载，按需加载项目模块
- 移动端友好的响应式布局

**Non-Goals:**
- 不做 CMS 或后台管理系统
- 不做用户登录/评论等动态功能
- 不做 SSR/SSG（纯 SPA 即可）
- 不做国际化
- 不集成博客功能

## Decisions

### 1. Vue 3 + Vite + Vue Router

**选择**: Vue 3 Composition API + Vite + Vue Router 4

**理由**: Vite 开发体验好，构建快。Vue 3 Composition API 适合模块化组织代码。Vue Router 4 支持动态路由添加。

**备选**: Nuxt 3（SSG 能力更强，但 GitHub Pages 部署复杂度高，且本项目不需要 SSG）

### 2. 项目模块化架构

**选择**: 每个项目一个独立目录 `src/projects/<name>/`，包含：
```
src/projects/<name>/
  ├── index.vue          # 项目入口组件
  ├── config.ts          # 项目元数据和风格配置
  ├── components/        # 项目私有组件
  └── assets/            # 项目私有资源
```

**理由**: 文件系统级隔离，新增项目只需复制模板目录。删除项目只需删除目录并移除注册。

**备选**: 单目录多文件（隔离性差）；monorepo 多包（过度工程化）

### 3. 样式隔离策略

**选择**: Vue Scoped CSS + CSS 变量覆盖

每个项目通过 `config.ts` 声明自己的 CSS 变量值（主色、背景色、字体等），项目页面挂载时注入到根元素。全局使用 CSS 变量，项目级覆盖实现风格切换。

**理由**: 原生支持，无额外依赖。Scoped CSS 防止样式泄漏，CSS 变量实现主题切换。

**备选**: CSS Modules（配置稍复杂）；Tailwind（增加学习成本，对自定义风格灵活度有限）

### 4. 项目注册机制

**选择**: 集中式注册文件 `src/projects/registry.ts`，导出项目配置数组。路由在应用启动时根据注册信息动态生成。

```ts
// src/projects/registry.ts
import type { ProjectConfig } from '@/types'

export const projects: ProjectConfig[] = [
  // 每个项目的 config.ts 导出的配置
]
```

**理由**: 简单直接，类型安全。新增项目只需在 registry 中添加一行 import。

**备选**: 基于文件系统的自动发现（Vite glob import——隐式依赖，调试困难）

### 5. 路由与懒加载

**选择**: 基于注册表动态生成路由，项目入口组件使用 `defineAsyncComponent` + `import()` 懒加载。

```ts
// 路由自动生成
projects.forEach(p => {
  router.addRoute({
    path: `/project/${p.slug}`,
    component: () => import(`./projects/${p.slug}/index.vue`)
  })
})
```

**理由**: 每个项目独立 chunk，首屏只加载首页代码。

### 6. 部署方案

**选择**: GitHub Actions 自动构建 + 部署到 `gh-pages` 分支

**理由**: 推送即部署，零手动操作。Vite 构建产物直接部署。

## Risks / Trade-offs

- **[动态 import 路径]** Vite 要求动态 import 路径有明确模式 → 使用 glob pattern `./projects/${slug}/index.vue`，确保路径可静态分析
- **[样式隔离不完全]** Scoped CSS 不阻止子组件继承全局样式 → 项目组件使用 CSS 变量而非硬编码颜色值，避免全局样式干扰
- **[项目间路由冲突]** 多项目共享路由空间 → 所有项目路由统一前缀 `/project/:slug`，项目内部不使用子路由
- **[构建体积增长]** 项目数量增加导致总体积增大 → 懒加载确保每次只加载一个项目的代码
