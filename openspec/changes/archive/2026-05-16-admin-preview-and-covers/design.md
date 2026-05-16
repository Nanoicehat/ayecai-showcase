## Architecture

### Markdown 预览

- 在 ArticleEditor.vue 中 import `marked`（admin package.json 无 marked，需安装）
- 替换 `renderMarkdown()` 正则函数为 `marked(text)` 调用
- 复用前台 SolutionDetail 的 `.prose` 样式（复制关键规则到 editor 的 preview 区域）

### 封面图显示

- admin/server/index.ts 添加 `app.use('/solutions', express.static(SOLUTIONS_DIR))` 挂载静态
- ArticleList.vue 卡片 `src` 从 `'/' + article.cover` → `/solutions/...`（已正确）
- 无封面时，前端根据 slug hash 计算默认图路径（同 SolutionsList.vue 的逻辑）
- 默认图在 `_default-covers/` 目录，URL: `/solutions/_default-covers/{n}.jpg`

## Scope

- `admin/server/index.ts` — 添加 static 中间件
- `admin/src/views/ArticleEditor.vue` — marked 预览
- `admin/src/views/ArticleList.vue` — 默认封面兜底
- `admin/package.json` — 添加 marked 依赖（如未安装）
