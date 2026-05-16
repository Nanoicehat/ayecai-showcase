## admin-markdown-preview

编辑器预览区域使用 marked 库渲染 Markdown。

### 实现

- 安装 marked: `npm install marked` (in admin/)
- ArticleEditor.vue 中 `import { marked } from 'marked'`
- 替换 `renderMarkdown(text)` 为异步/同步 marked 调用
- 预览区域添加 `.prose` class，包含基础排版样式（h2/h3/p/ul/code/pre/table/blockquote）
- 样式参考前台 SolutionDetail.vue 的 `.prose` 全局样式
