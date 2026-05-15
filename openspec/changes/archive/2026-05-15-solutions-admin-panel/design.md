## Context

ayecai-showcase 是一个 Vue 3 + Vite 个人项目展示站，其中「椰菜优解」模块用 Markdown 文件存放文章，通过构建脚本生成 index.json 供前端运行时加载。当前管理文档全靠手动文件操作 + 命令行脚本。

现有文档系统特点：
- 文章存放在 `public/solutions/<category>/<name>.md`
- frontmatter: title, date, category, summary
- 封面图: 同目录同名图片文件（.jpg/.png/.svg/.webp）
- 索引生成: `scripts/generate-solutions-index.ts`（用 gray-matter 解析）
- 无封面时按 slug hash 分配 `public/solutions/defaults/` 中的默认图

## Goals / Non-Goals

**Goals:**
- 提供 Web UI 管理 solutions 文档（CRUD + 封面图 + 分类目录）
- admin 独立运行，不影响 showcase 构建流程
- admin 代码不进入 showcase GitHub 仓库
- CLAUDE.md 中提供项目初始化交互指南

**Non-Goals:**
- 不做项目（projects）的 CRUD 管理（项目是定制 Vue 组件，不适合模板化）
- 不做用户认证（本地工具，无需登录）
- 不做在线部署/CI 触发（本地开发辅助工具）
- 不做 Markdown 实时渲染（编辑器提供基础预览即可）

## Decisions

### 1. 技术栈：Express + Vue 3

**选择**: 后端 Express，前端 Vue 3 (Vite)

**理由**: 
- Express 轻量，文件操作场景不需要复杂框架
- Vue 3 与 showcase 同生态，减少学习成本
- 前后端分离，后端 4000 端口 API，前端 5174 端口 dev server（或 build 后由 Express 静态托管）

**替代方案考虑**:
- Fastify: 性能更好但文件操作场景无差异，Express 生态更大
- Nuxt/Next: 过重，本地工具不需要 SSR
- 纯前端 + File System Access API: 浏览器兼容性差，且无法执行脚本

### 2. 文件操作策略：直接相对路径

**选择**: admin 通过 `path.resolve(__dirname, '../../public/solutions/')` 访问 showcase 文件

**理由**: 
- 目录结构固定（admin 在 showcase/admin/ 下）
- 无需配置文件指定路径
- 启动时验证路径存在

### 3. 索引重新生成：fork 执行现有脚本

**选择**: admin API 在文件变更后 `child_process.exec('npx tsx ../scripts/generate-solutions-index.ts')` 

**理由**:
- 复用现有逻辑，不重复实现
- 保证 admin 和手动执行结果一致

### 4. 前端架构：单页面多视图

**选择**: Vue Router，3 个主视图：
- 文章列表（搜索/筛选/删除）
- 文章编辑器（新建/编辑 Markdown + frontmatter 表单）
- 分类管理（目录树操作）

### 5. 项目初始化：CLAUDE.md 指南 + 读 tags.ts

**选择**: 在 CLAUDE.md 增加交互指南章节，Claude 读取 `src/config/tags.ts` 获取现有标签作为选项

**理由**: 
- 项目初始化不适合 Web UI（需要生成 Vue 组件代码）
- Claude 交互式引导更灵活
- 读取 tags.ts 保证标签选项实时准确

## Risks / Trade-offs

- [文件冲突] admin 和用户同时手动编辑 solutions 文件 → 无锁机制，但本地单人使用场景风险极低
- [脚本变更] showcase 的 generate-solutions-index.ts 如改动，admin 无需修改（直接调用）→ 风险低
- [路径耦合] admin 硬编码相对路径 → 如果目录结构变化需要改 admin 配置。启动时校验路径存在可提前发现
- [无持久化] admin 本身无数据库，所有状态来自文件系统 → 符合场景，无额外维护成本
