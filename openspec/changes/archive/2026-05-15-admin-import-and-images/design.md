## Context

Admin 后台已实现文章 CRUD，但「新建」功能在实际使用中不如「导入」实用——用户的文档通常已经在 Obsidian 中写好，包含相对路径图片引用。Showcase 的 SolutionDetail.vue 用 `marked` 渲染 Markdown，但不处理相对图片路径，导致图片 404。

## Goals / Non-Goals

**Goals:**
- 支持从本地导入 .md 文件 + 关联图片
- 自动解析 `![alt](relative/path.png)` 格式的图片引用
- 图片按 slug 隔离存储在 `assets/<slug>/` 子目录
- Showcase 详情页正确显示文章内嵌图片

**Non-Goals:**
- 不支持批量导入多篇文章（单篇导入即可）
- 不处理 Obsidian wiki-link 格式 `![[image.png]]`（只处理标准 Markdown 图片语法）
- 不做图片压缩/转码

## Decisions

### 1. 导入 API 设计：multipart 表单上传

**选择**: POST /api/articles/import，multipart/form-data，包含 md 文件 + 多个图片文件 + category 字段

**理由**: 
- 浏览器原生支持 multipart 文件上传
- 一次请求完成所有文件传输
- 无需用户手动指定图片路径，后端自动匹配

### 2. 图片存储结构：assets/<slug>/ 子目录

**选择**: `public/solutions/<category>/assets/<slug>/image.png`

**理由**:
- 按 slug 隔离避免不同文章的图片命名冲突
- assets 目录与 md 同级，路径简洁
- 导入后 md 中的图片路径重写为 `assets/<slug>/image.png`

### 3. 图片路径解析策略

**选择**: 正则匹配 `!\[.*?\]\(((?!https?://)[^)]+)\)` 提取所有相对路径图片引用

**理由**:
- 排除 http/https 绝对链接
- 捕获 `assets/xxx.png`、`./images/foo.jpg`、`../shared/bar.png` 等各种相对路径
- basename 匹配上传的图片文件名

### 4. Showcase 图片路径重写：marked renderer 自定义

**选择**: 在 SolutionDetail.vue 中自定义 marked 的 image renderer，将相对路径转为基于 BASE_URL + solutions path 的绝对路径

**理由**:
- 不修改存储的 md 内容（保持 md 便携性）
- 渲染时动态计算正确路径
- `${BASE_URL}solutions/<category>/assets/<slug>/image.png`

### 5. 前端导入界面

**选择**: ArticleList 页面新增「导入文章」按钮，弹出导入对话框，选择 md 文件 + 图片 + 分类

**理由**:
- 保持列表页为入口
- 对话框模式避免跳转页面
- 移除原有「新建文章」按钮和 ArticleEditor 的新建模式

## Risks / Trade-offs

- [图片名冲突] 如果上传的图片文件名与 md 中引用的 basename 不匹配 → 导入时后端报告未匹配的引用，但不阻断
- [大文件] 图片文件可能较大 → multer 限制单文件 10MB，总请求 50MB
- [路径格式多样] Obsidian 可能用 `assets/` 或 `./assets/` 或 `../assets/` → basename 匹配解决
