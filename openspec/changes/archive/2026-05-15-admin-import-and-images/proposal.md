## Why

管理后台目前用「新建文章」手写 Markdown，但实际场景是从 Obsidian 等工具导入已有文档。这些文档通常包含相对路径引用的图片（如 `![](assets/xxx.png)`），当前导入流程无法处理图片迁移，且 showcase 详情页也无法正确显示内嵌图片。

## What Changes

- 管理后台导航栏图标改为 🚗
- 移除「新建文章」功能，替换为「导入文章」：上传 .md 文件 + 关联图片，自动解析相对路径并迁移
- Admin API 新增导入端点：接收 md + 图片文件，解析图片引用，重写路径，写入 solutions 目录
- Showcase 前端 SolutionDetail.vue 适配图片显示：将 Markdown 中相对图片路径转换为正确的绝对 URL

## Capabilities

### New Capabilities
- `article-import`: 后端导入 API + 前端导入界面——上传 md 文件及关联图片，解析相对链接，迁移文件，重写路径

### Modified Capabilities
- `solutions-blog`: SolutionDetail.vue 的 Markdown 渲染需要重写图片相对路径为绝对 URL

## Impact

- `admin/server/routes/articles.ts`: 新增导入端点
- `admin/src/views/ArticleList.vue`: 移除新建按钮，新增导入按钮和导入界面
- `admin/src/views/ArticleEditor.vue`: 移除新建模式（仅保留编辑模式）
- `admin/src/App.vue`: 修改导航图标
- `src/views/SolutionDetail.vue`: Markdown 渲染时重写图片路径
- `public/solutions/<category>/assets/`: 新增图片存储目录
