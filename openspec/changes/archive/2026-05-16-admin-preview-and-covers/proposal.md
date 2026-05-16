## Why

1. 编辑器预览使用简单正则替换，不支持列表、表格、代码块等 Markdown 特性，预览效果差
2. 文章列表卡片看不到封面图 — 后端不serve静态文件 + 无封面文章没有随机默认图兜底

## What Changes

1. 编辑器预览改用 `marked` 库（admin 已安装相关依赖）进行真正的 Markdown 渲染
2. Admin 后端添加 `express.static` 挂载 `public/solutions/` 目录
3. 文章列表/卡片对无封面文章显示随机默认背景图（同前台逻辑）

## Capabilities

### New Capabilities
- `admin-markdown-preview`: 编辑器使用 marked 渲染真实 Markdown 预览
- `admin-cover-display`: 后端静态文件服务 + 前端默认封面兜底
