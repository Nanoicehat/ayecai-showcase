## 1. Project Scaffolding

- [x] 1.1 使用 Vite 初始化 Vue 3 + TypeScript 项目，配置 `vite.config.ts`（base 路径、路径别名）
- [x] 1.2 安装 vue-router 4，配置 hash 模式路由
- [x] 1.3 配置 `index.html` 的 viewport meta 标签和基础 HTML 结构
- [x] 1.4 创建项目目录结构：`src/projects/`、`src/components/`、`src/styles/`、`src/types/`

## 2. Theme System

- [x] 2.1 创建全局 CSS 变量文件 `src/styles/variables.css`，定义浅色主题变量（颜色、字体、间距、圆角、阴影）
- [x] 2.2 创建全局基础样式 `src/styles/base.css`（reset、body 默认样式、通用工具类）
- [x] 2.3 在 `main.ts` 中引入全局样式

## 3. Type Definitions & Registry

- [x] 3.1 定义 `ProjectConfig` 类型接口（`src/types/project.ts`）：slug、title、description、tags、coverImage、theme
- [x] 3.2 创建项目注册表 `src/projects/registry.ts`，导出项目配置数组
- [x] 3.3 实现动态路由生成逻辑：遍历注册表，为每个项目添加 `/project/:slug` 路由（懒加载）

## 4. Global Layout

- [x] 4.1 创建顶部导航栏组件 `src/components/NavBar.vue`（网站标题 + 返回首页链接）
- [x] 4.2 创建全局布局组件 `src/App.vue`（NavBar + router-view）
- [x] 4.3 导航栏响应式样式（移动端适配）

## 5. Home Page

- [x] 5.1 创建首页组件 `src/views/Home.vue`，包含 hero 区域（名称 + 简介）
- [x] 5.2 创建项目卡片组件 `src/components/ProjectCard.vue`（封面图、标题、简介、标签）
- [x] 5.3 实现项目卡片网格布局（桌面 3 列、平板 2 列、手机 1 列）
- [x] 5.4 实现标签筛选功能：点击标签过滤项目，再次点击取消筛选
- [x] 5.5 实现空状态提示（无项目时显示"暂无项目"）

## 6. Project Page

- [x] 6.1 创建项目页包装组件 `src/views/ProjectPage.vue`（加载配置、注入主题、渲染异步组件）
- [x] 6.2 实现主题注入/清理逻辑：mounted 时注入 CSS 变量，unmounted 时恢复
- [x] 6.3 实现加载状态（Suspense 或自定义 loading 组件）
- [x] 6.4 实现 404 处理（未注册项目 slug 重定向到首页）

## 7. Demo Projects

- [x] 7.1 创建示例项目 A `src/projects/creative-portfolio/`（画廊风格，暖色调主题）
- [x] 7.2 创建示例项目 B `src/projects/tech-dashboard/`（仪表盘风格，冷色调主题）
- [x] 7.3 创建示例项目 C `src/projects/minimal-blog/`（极简风格，黑白主题）
- [x] 7.4 在 registry.ts 中注册所有示例项目

## 8. Deployment

- [x] 8.1 创建 GitHub Actions workflow 文件 `.github/workflows/deploy.yml`（构建 + 部署到 gh-pages）
- [x] 8.2 本地构建验证：`npm run build` 成功且产物可预览
