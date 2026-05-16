## 1. Markdown 预览修复

- [x] 1.1 admin/ 安装 marked 依赖
- [x] 1.2 ArticleEditor.vue 替换 renderMarkdown 为 marked 库渲染
- [x] 1.3 预览区域添加 prose 排版样式

## 2. 封面图显示

- [x] 2.1 admin/server/index.ts 添加 express.static 挂载 solutions 目录
- [x] 2.2 ArticleList.vue 添加默认封面兜底逻辑（slug hash → _default-covers）
- [x] 2.3 vite proxy 转发 /solutions 到后端 + 确保图片路径正确
