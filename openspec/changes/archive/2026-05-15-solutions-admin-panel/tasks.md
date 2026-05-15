## 1. 项目初始化

- [x] 1.1 主 repo .gitignore 添加 /admin/ 行
- [x] 1.2 创建 admin/ 目录，git init，初始化 package.json
- [x] 1.3 安装后端依赖：express, cors, multer, gray-matter, tsx
- [x] 1.4 安装前端依赖：vue3, vite, vue-router, axios
- [x] 1.5 配置 TypeScript (tsconfig.json for server + client)
- [x] 1.6 配置 Vite（前端 dev server 5174，API proxy 到 4000）

## 2. 后端 API — 文章 CRUD

- [x] 2.1 创建 Express 服务入口 (server/index.ts)，启动时校验 ../public/solutions/ 存在
- [x] 2.2 实现 GET /api/articles — 列表（复用 gray-matter 解析，支持 category 查询参数）
- [x] 2.3 实现 GET /api/articles/:path — 获取单篇文章（frontmatter + content）
- [x] 2.4 实现 POST /api/articles — 创建文章（写 frontmatter + content 到 .md 文件）
- [x] 2.5 实现 PUT /api/articles/:path — 更新文章
- [x] 2.6 实现 DELETE /api/articles/:path — 删除文章及关联封面

## 3. 后端 API — 封面图与分类

- [x] 3.1 实现 POST /api/articles/:path/cover — 上传封面图（multer，限 jpg/png/svg/webp）
- [x] 3.2 实现 DELETE /api/articles/:path/cover — 删除封面图
- [x] 3.3 实现 GET /api/categories — 返回目录树结构 + 文章计数
- [x] 3.4 实现 POST /api/categories — 创建分类目录
- [x] 3.5 实现 DELETE /api/categories/:path — 删除空分类
- [x] 3.6 实现 PATCH /api/categories/:path — 重命名分类（含更新子文章 frontmatter）

## 4. 后端 API — 索引重新生成

- [x] 4.1 实现 POST /api/regenerate-index — exec 调用 generate-solutions-index.ts
- [x] 4.2 在所有写操作（创建/更新/删除文章、封面图、分类）后自动触发索引重新生成

## 5. 前端 — 布局与路由

- [x] 5.1 创建 App.vue 主布局（侧边栏导航 + 内容区）
- [x] 5.2 配置 Vue Router：/ (文章列表), /edit/:path? (编辑器), /categories (分类管理)
- [x] 5.3 创建 API 服务层 (api.ts)，封装 axios 调用

## 6. 前端 — 文章列表

- [x] 6.1 实现文章列表视图（卡片展示 title/date/category/summary/cover）
- [x] 6.2 实现搜索框（客户端 title/summary 过滤）
- [x] 6.3 实现分类侧边栏筛选
- [x] 6.4 实现删除按钮 + 确认对话框

## 7. 前端 — 文章编辑器

- [x] 7.1 实现 frontmatter 表单（title, date, category 下拉, summary, slug）
- [x] 7.2 实现 Markdown 文本编辑区（textarea）
- [x] 7.3 实现 Markdown 预览面板（切换显示）
- [x] 7.4 实现封面图上传/删除/预览
- [x] 7.5 实现保存逻辑（区分新建 POST vs 更新 PUT）

## 8. 前端 — 分类管理

- [x] 8.1 实现分类树展示（递归组件 + 文章计数）
- [x] 8.2 实现新建分类（输入名称 + 选择父级）
- [x] 8.3 实现重命名分类
- [x] 8.4 实现删除分类（非空时提示）

## 9. 前端 — 通用组件

- [x] 9.1 实现 Toast 通知组件（成功/错误）
- [x] 9.2 实现 Loading 状态指示器
- [x] 9.3 实现确认对话框组件

## 10. CLAUDE.md 更新 — 项目初始化指南

- [x] 10.1 编写「项目初始化交互指南」章节，包含完整交互流程定义
- [x] 10.2 定义 tag 选择流程（读 tags.ts → AskUserQuestion）
- [x] 10.3 定义 showcase 样式生成规则（bgGradient/accentColor/animation）
- [x] 10.4 定义 theme CSS 变量生成规则
- [x] 10.5 定义 registry.ts + tags.ts 注册步骤
- [x] 10.6 定义验证清单

## 11. 收尾

- [x] 11.1 admin/README.md 使用说明
- [x] 11.2 admin/package.json scripts：dev (并行启动前后端), build, start
- [x] 11.3 验证完整流程：启动 admin → 创建文章 → 上传封面 → 确认 showcase 前端显示正确
