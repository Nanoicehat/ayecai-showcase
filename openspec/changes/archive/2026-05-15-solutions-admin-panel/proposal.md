## Why

当前管理 solutions 文档需要手动创建 Markdown 文件、编辑 frontmatter、放置封面图、运行索引生成脚本——流程繁琐且易出错。需要一个本地管理后台提供 Web UI 来完成这些操作，同时在 CLAUDE.md 中提供项目初始化交互指南，让 Claude 能协助完成新项目的引入。

## What Changes

- 新增 `admin/` 目录作为独立应用（独立 git repo，主 repo .gitignore 排除）
- Admin 后端：Node.js API 服务，端口 4000，提供文档 CRUD、文件上传、索引重新生成接口
- Admin 前端：Vue 3 SPA，通过 API 管理 `public/solutions/` 下的文章和分类
- 更新主 repo CLAUDE.md：新增「项目初始化指南」章节，描述 Claude 交互式引入新项目的流程（打标签、生成 showcase 样式、生成详情页样式、注册到 registry 和 tags）

## Capabilities

### New Capabilities
- `solutions-crud-api`: 后端 API 层——文章增删改查、分类管理、封面图上传、触发索引生成
- `solutions-admin-ui`: 前端管理界面——文章列表/编辑器/Markdown 预览、分类树管理、封面图上传
- `project-init-guide`: CLAUDE.md 中的项目初始化交互指南——定义 Claude 如何询问标签、生成样式配置、完成注册

### Modified Capabilities
- `solutions-blog`: 新增 .gitignore 中排除 admin/ 目录；prebuild/predev 钩子保持不变，admin 通过 API 调用同一脚本

## Impact

- 新增 `admin/` 目录（~整个子项目，独立 package.json）
- 主 repo `.gitignore` 新增 `/admin/` 行
- 主 repo `CLAUDE.md` 新增项目初始化指南章节
- 依赖：admin 后端需 express/fastify、multer（文件上传）、gray-matter（frontmatter 解析）
- 文件系统：admin 通过相对路径 `../public/solutions/` 读写 showcase 的文档目录
- 端口：admin dev server 占用 4000（不与 showcase 5173 冲突）
