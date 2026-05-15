<!-- superpowers-zh:begin (do not edit between these markers) -->
# Superpowers-ZH 中文增强版

本项目已安装 superpowers-zh 技能框架（20 个 skills）。

## 核心规则

1. **收到任务时，先检查是否有匹配的 skill** — 哪怕只有 1% 的可能性也要检查
2. **设计先于编码** — 收到功能需求时，先用 brainstorming skill 做需求分析
3. **测试先于实现** — 写代码前先写测试（TDD）
4. **验证先于完成** — 声称完成前必须运行验证命令

## 可用 Skills

Skills 位于 `.claude/skills/` 目录，每个 skill 有独立的 `SKILL.md` 文件。

- **brainstorming**: 在任何创造性工作之前必须使用此技能——创建功能、构建组件、添加功能或修改行为。在实现之前先探索用户意图、需求和设计。
- **chinese-code-review**: 中文 review 沟通参考——话术模板、分级标注（必须修复/建议修改/仅供参考）、国内团队常见反模式应对。仅在用户显式 /chinese-code-review 时调用，不要根据上下文自动触发。
- **chinese-commit-conventions**: 中文 commit 与 changelog 配置参考——Conventional Commits 中文适配、commitlint/husky/commitizen 中文模板、conventional-changelog 中文配置。仅在用户显式 /chinese-commit-conventions 时调用，不要根据上下文自动触发。
- **chinese-documentation**: 中文文档排版参考——中英文空格、全半角标点、术语保留、链接格式、中文文案排版指北约定。仅在用户显式 /chinese-documentation 时调用，不要根据上下文自动触发。
- **chinese-git-workflow**: 国内 Git 平台配置参考——Gitee、Coding.net、极狐 GitLab、CNB 的 SSH/HTTPS/凭据/CI 接入差异与镜像同步配置。仅在用户显式 /chinese-git-workflow 时调用，不要根据上下文自动触发。
- **dispatching-parallel-agents**: 当面对 2 个以上可以独立进行、无共享状态或顺序依赖的任务时使用
- **executing-plans**: 当你有一份书面实现计划需要在单独的会话中执行，并设有审查检查点时使用
- **finishing-a-development-branch**: 当实现完成、所有测试通过、需要决定如何集成工作时使用——通过提供合并、PR 或清理等结构化选项来引导开发工作的收尾
- **mcp-builder**: MCP 服务器构建方法论 — 系统化构建生产级 MCP 工具，让 AI 助手连接外部能力
- **receiving-code-review**: 收到代码审查反馈后、实施建议之前使用，尤其当反馈不明确或技术上有疑问时——需要技术严谨性和验证，而非敷衍附和或盲目执行
- **requesting-code-review**: 完成任务、实现重要功能或合并前使用，用于验证工作成果是否符合要求
- **subagent-driven-development**: 当在当前会话中执行包含独立任务的实现计划时使用
- **systematic-debugging**: 遇到任何 bug、测试失败或异常行为时使用，在提出修复方案之前执行
- **test-driven-development**: 在实现任何功能或修复 bug 时使用，在编写实现代码之前
- **using-git-worktrees**: 当需要开始与当前工作区隔离的功能开发或执行实现计划之前使用——创建具有智能目录选择和安全验证的隔离 git 工作树
- **using-superpowers**: 在开始任何对话时使用——确立如何查找和使用技能，要求在任何响应（包括澄清性问题）之前调用 Skill 工具
- **verification-before-completion**: 在宣称工作完成、已修复或测试通过之前使用，在提交或创建 PR 之前——必须运行验证命令并确认输出后才能声称成功；始终用证据支撑断言
- **workflow-runner**: 在 Claude Code / OpenClaw / Cursor 中直接运行 agency-orchestrator YAML 工作流——无需 API key，使用当前会话的 LLM 作为执行引擎。当用户提供 .yaml 工作流文件或要求多角色协作完成任务时触发。
- **writing-plans**: 当你有规格说明或需求用于多步骤任务时使用，在动手写代码之前
- **writing-skills**: 当创建新技能、编辑现有技能或在部署前验证技能是否有效时使用

## 如何使用

当任务匹配某个 skill 时，使用 `Skill` 工具加载对应 skill 并严格遵循其流程。绝不要用 Read 工具读取 SKILL.md 文件。

如果你认为哪怕只有 1% 的可能性某个 skill 适用于你正在做的事情，你必须调用该 skill 检查。
<!-- superpowers-zh:end -->

# 阿椰菜的项目展示站

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npx vue-tsc --noEmit

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

**环境要求**: Node.js >= 18, npm >= 9

**部署**: 推送到 GitHub 后，GitHub Actions (`.github/workflows/deploy.yml`) 会自动构建并部署到 gh-pages 分支。首次部署需在仓库 Settings → Pages 中选择 gh-pages 分支。

## 项目简介

个人项目展示网站，部署在 GitHub Pages。Vue 3 + Vite + TypeScript，hash 路由。

### 核心特性

- **模块化项目架构** — 每个项目独立文件夹（`src/projects/<slug>/`），包含自己的组件、样式、资源，互不干扰
- **项目级主题覆盖** — 每个项目通过 CSS 变量定义独立配色，进入项目页自动切换，离开后恢复
- **可配置标签系统** — `src/config/tags.ts` 定义首页标签与项目的映射关系，非自动聚合
- **模块化首页动画** — 每个项目可提供 `preview.vue` 作为首页展示动画，按需懒加载
- **数据驱动** — 新增项目只需创建文件夹 + 注册，无需修改布局或路由代码

### 技术栈

- Vue 3 (Composition API + `<script setup>`)
- Vue Router 4 (hash mode)
- Vite
- TypeScript
- 纯 CSS 动画 + Intersection Observer（零第三方动画依赖）

### 当前 Demo 项目

| 项目 | 风格 | 主题色 |
|:--|:--|:--|
| 创意作品集 (`creative-portfolio`) | 画廊布局 | 暖橙 #e07c54 |
| 数据仪表盘 (`tech-dashboard`) | Dashboard | 靛蓝 #6366f1 |
| 极简博客 (`minimal-blog`) | 排版驱动 | 黑白 #333 |
| AI 聊天助手 (`ai-chat-app`) | 聊天界面 | 紫色 #8b5cf6 |

## 新增项目指南

### 目录结构

每个项目独立存放在 `src/projects/<slug>/`：

```
src/projects/<slug>/
  ├── config.ts        # 项目配置（必须）
  ├── index.vue        # 项目详情页（必须）
  ├── preview.vue      # 首页展示动画组件（可选）
  ├── components/      # 项目私有组件（可选）
  └── assets/
      └── cover.svg    # 封面图（必须）
```

### 新增步骤

#### 第 1 步：创建项目文件夹

复制现有项目目录（如 `src/projects/ai-chat-app/`）作为模板，重命名为 `src/projects/<slug>/`。

#### 第 2 步：编写 config.ts

修改 `config.ts`，所有字段说明：

```ts
import type { ProjectConfig } from '@/types/project'
import coverImage from './assets/cover.svg'

const config: ProjectConfig = {
  slug: 'my-project',              // URL 路径标识，与文件夹名一致
  title: '项目名称',                // 首页卡片和详情页标题
  description: '项目描述文字',       // 首页卡片和详情页副标题
  tags: ['标签1', '标签2'],         // 首页卡片显示的标签
  coverImage,                       // 封面图（无 preview 时显示）
  hasPreview: true,                  // 是否有首页预览动画组件
  theme: {                          // 进入详情页时覆盖的 CSS 变量（可选）
    '--color-primary': '#6366f1',
    '--color-primary-light': '#a5b4fc',
    '--color-primary-dark': '#4338ca',
    '--color-bg': '#f5f5ff',
    '--color-bg-card': '#ffffff'
  },
  showcase: {                        // 首页卡片个性化样式（可选）
    bgGradient: 'linear-gradient(135deg, #f5f5ff 0%, #e0e7ff 100%)',
    accentColor: '#6366f1',          // 标签和按钮颜色
    animation: 'fade-scale'          // 入场动画：slide-up | slide-left | slide-right | fade-scale | rotate-in
  },
  github: 'https://github.com/...'  // GitHub 仓库地址，详情页显示（可选）
}

export default config
```

#### 第 3 步：创建封面图

在 `assets/cover.svg` 放置封面 SVG。无 preview.vue 时首页展示此图。

#### 第 4 步：编写 index.vue（详情页）

项目详情页组件，Vue 3 SFC。`ProjectPage.vue` 会自动加载此组件并注入 theme CSS 变量。自由设计页面内容和布局。

#### 第 5 步：编写 preview.vue（首页预览动画，可选）

首页卡片中展示的动画组件，容器尺寸 aspect-ratio 4/3。要求：
- 纯 CSS 动画 + 少量 vanilla JS，不引入第三方库
- 自动播放入场动画，无需用户交互
- 如果创建了此文件，需在 `config.ts` 中设置 `hasPreview: true`

#### 第 6 步：注册项目

在 `src/projects/registry.ts` 中 import config 并添加到 `projects` 数组：

```ts
import myProjectConfig from './my-project/config'
// 添加到 projects 数组中
```

#### 第 7 步：关联首页标签

在 `src/config/tags.ts` 中将 slug 添加到对应标签的 `projects` 数组。如需新标签，直接添加新的 TagConfig 对象。

### 关键文件

| 文件 | 用途 |
|:--|:--|
| `src/types/project.ts` | `ProjectConfig` 和 `ShowcaseStyle` 类型定义 |
| `src/projects/registry.ts` | 项目注册表，所有项目在此导入 |
| `src/config/tags.ts` | 首页标签配置，定义标签与项目 slug 的映射 |
| `src/views/ProjectPage.vue` | 项目详情页包装器（主题注入/清理 + GitHub 链接） |
| `src/components/ProjectCard.vue` | 首页项目卡片（showcase 样式 + 入场动画） |
| `src/composables/useScrollReveal.ts` | 滚动入场动画 composable |

## 新增文档指南（椰菜优解）

### 概述

「椰菜优解」是导航栏中与「开源项目」平级的第二个 tab，用于展示技术文章/解决方案。文章以 Markdown 文件形式存放在 `public/solutions/` 目录，支持多级目录分类。

### 目录结构

```
public/solutions/
├── index.json              ← 构建时自动生成，勿手动编辑
├── defaults/               ← 默认风景图（无封面时的兜底图）
│   ├── 1.jpg ... 6.jpg
├── ai/                     ← 分类目录
│   ├── Agent信息收集.md
│   ├── Agent信息收集.jpg   ← 同名图片即为封面（可选）
│   └── frameworks/         ← 子分类（支持多级嵌套）
│       └── LangGraph快速入门.md
├── devops/
├── frontend/
└── backend/
    └── database/           ← 二级嵌套示例
```

### 新增文章步骤

#### 第 1 步：选择或创建分类目录

在 `public/solutions/` 下选择已有目录或创建新目录。目录名即为分类名，支持嵌套（如 `backend/database/`）。

#### 第 2 步：创建 Markdown 文件

文件名即为文章标识（slug），使用中文命名即可。**必须**包含 YAML frontmatter：

```markdown
---
title: 文章标题
date: 2025-05-15
category: ai
summary: 一句话摘要，显示在列表页卡片中
---

正文内容（支持 GFM 表格、代码块等）...
```

**frontmatter 字段说明：**

| 字段 | 必须 | 说明 |
|:--|:--|:--|
| `title` | 是 | 文章标题，显示在卡片和详情页 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD`，用于排序（降序） |
| `category` | 是 | 分类路径，与目录结构一致（如 `ai`、`backend/database`） |
| `summary` | 是 | 一句话摘要，显示在列表页卡片中 |

#### 第 3 步：添加封面图（可选）

在**同目录**下放一张与 md 文件**同名**的图片文件，支持格式：`.jpg`、`.jpeg`、`.png`、`.svg`、`.webp`。

示例：`public/solutions/ai/Agent信息收集.md` → 封面图为 `public/solutions/ai/Agent信息收集.jpg`

如果不提供封面图，系统会从 `public/solutions/defaults/` 中基于文件名 hash 确定性分配一张默认风景图。

#### 第 4 步：生成索引

```bash
npm run generate-index
```

或直接启动 dev server（`npm run dev` 会自动执行 `predev` 钩子生成索引）。

#### 第 5 步：验证

启动 dev server 后访问 `/#/solutions`，确认：
- 文章出现在列表中
- 封面图正确显示
- 点击可进入详情页
- 左侧目录树自动包含新分类

### 注意事项

1. **不要手动编辑 `index.json`** — 由构建脚本自动生成
2. **frontmatter 中的 `category` 必须与目录路径一致** — 否则目录树筛选会出错
3. **文件名避免特殊字符** — 中文、英文、数字、连字符均可，避免 `#`、`?`、`&` 等 URL 特殊字符
4. **图片大小建议** — 封面图建议 800x450（16:9），文件大小控制在 100KB 以内
5. **默认图目录 `defaults/` 勿放 md 文件** — 该目录被构建脚本排除扫描（因为子目录名作为分类）
6. **部署后自动生效** — GitHub Actions 构建时会自动执行 `prebuild` 生成索引

### 配置文件

`src/config/solutions.ts` 控制列表页展示参数：

```typescript
export const solutionsConfig = {
  pageSize: 6,    // 每页展示文章数
  columns: 3,     // 每行列数（桌面端）
  columnsMin: 2,  // 最小列数
  columnsMax: 3,  // 最大列数（受内容区宽度限制）
}
```

### 关键文件

| 文件 | 用途 |
|:--|:--|
| `public/solutions/` | 文章 Markdown 文件存放目录 |
| `public/solutions/index.json` | 自动生成的文章索引 |
| `public/solutions/defaults/` | 默认封面风景图 |
| `scripts/generate-solutions-index.ts` | 索引生成脚本 |
| `src/config/solutions.ts` | 列表页分页/列数配置 |
| `src/views/SolutionsList.vue` | 文章列表页（含目录树 + 分页） |
| `src/views/SolutionDetail.vue` | 文章详情页（Markdown 渲染 + 背景图） |
| `src/components/SolutionsTree.vue` | 左侧目录树组件 |
| `src/components/TreeNode.vue` | 目录树递归节点组件 |
