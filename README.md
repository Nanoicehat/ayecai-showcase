# 阿椰菜的项目展示站

个人开源项目展示 & 技术方案收录，部署在 GitHub Pages。

## 功能概览

- **开源项目** — 作品集展示，每个项目独立页面，支持自定义主题色和首页预览动画
- **椰菜优解** — 技术文章 / 解决方案，Markdown 编写，自动生成目录树和索引

## 技术栈

Vue 3 + Vite + TypeScript，纯 CSS 动画，零第三方动画依赖。

## 本地运行

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器
npm run build      # 构建
npm run preview    # 预览构建结果
```

Node.js >= 18，npm >= 9。

## 新增项目

每个项目放在 `src/projects/<slug>/`，最少只需三个文件：

```
src/projects/my-project/
├── config.ts        # 项目配置（标题、标签、主题色等）
├── index.vue        # 详情页组件
└── assets/
    └── cover.svg    # 封面图
```

然后在 `src/projects/registry.ts` 注册即可。可选提供 `preview.vue` 实现首页动画预览。

## 新增文章

Markdown 文件放入 `public/solutions/` 对应分类目录，YAML frontmatter 声明标题、日期、分类和摘要：

```markdown
---
title: 文章标题
date: 2025-05-15
category: ai
summary: 一句话摘要
---

正文内容...
```

运行 `npm run generate-index` 刷新索引。

## 部署

推送 `main` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。需在仓库 Settings → Pages 中将 Source 设为 "GitHub Actions"。

## 目录结构

```
src/
├── components/       # 公共组件
├── composables/      # 组合式函数
├── config/           # 标签、文章配置
├── projects/         # 各项目目录
├── router.ts         # 路由（hash 模式）
├── views/            # 页面视图
└── types/            # 类型定义
public/solutions/     # 技术文章 Markdown
scripts/              # 索引生成等辅助脚本
```
