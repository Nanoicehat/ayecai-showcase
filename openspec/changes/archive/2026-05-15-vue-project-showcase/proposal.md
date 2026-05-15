## Why

需要一个部署在 GitHub Pages 上的个人项目展示网站，用于集中展示多个独立项目。每个项目可能有完全不同的视觉风格和交互模式，因此需要模块化架构来支持样式隔离和动态加载。当前没有统一的展示平台，新增项目需要手动搭建页面，效率低且风格不统一。

## What Changes

- 使用 Vue 3 + Vite 搭建项目框架，配置 GitHub Pages 部署
- 实现清新浅色系主题的首页和全局布局
- 建立项目模块化架构：每个项目独立文件夹，包含自己的组件、样式和配置
- 实现数据驱动的项目注册机制，通过配置文件声明项目元数据
- 支持每个项目页面使用不同的页面风格（布局、配色、字体等）
- 实现项目模块的动态加载（路由懒加载 + 异步组件）
- 响应式设计，适配桌面端和移动端

## Capabilities

### New Capabilities
- `app-shell`: 全局应用框架——Vue 3 + Vue Router + Vite 配置、GitHub Pages 部署、浅色主题系统
- `project-registry`: 项目注册与发现——数据驱动的项目配置、元数据管理、项目列表生成
- `project-module`: 项目模块化架构——独立文件夹结构、样式隔离、动态路由注册、异步组件加载
- `showcase-home`: 首页展示——项目卡片网格、筛选/搜索、响应式布局
- `project-page`: 项目详情页——支持多种布局模板、项目自定义风格覆盖、内容渲染

### Modified Capabilities

## Impact

- 新建整个 Vue 3 项目结构
- 依赖：vue 3、vue-router 4、vite
- 部署目标：GitHub Pages（静态站点，hash 路由模式）
- 项目文件组织：`src/projects/<project-name>/` 每个项目独立目录
