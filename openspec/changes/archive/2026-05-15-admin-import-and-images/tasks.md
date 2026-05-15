## 1. Admin UI 修改

- [x] 1.1 App.vue 导航图标改为 🚗
- [x] 1.2 ArticleList.vue 移除「新建文章」按钮，改为「导入文章」按钮
- [x] 1.3 实现 ImportDialog 组件（md 文件选择 + 图片文件选择 + 分类下拉 + 导入按钮）
- [x] 1.4 ArticleEditor.vue 移除新建模式（仅保留编辑已有文章）

## 2. Admin API — 导入端点

- [x] 2.1 实现 POST /api/articles/import（multer 接收 md + images + category）
- [x] 2.2 实现图片路径解析：正则提取 md 中所有相对路径图片引用
- [x] 2.3 实现 frontmatter 自动生成（无 frontmatter 时从文件名生成 title/date/category）
- [x] 2.4 实现图片文件迁移：创建 assets/<slug>/ 目录，复制图片
- [x] 2.5 实现路径重写：将 md 中的旧相对路径替换为新的 assets/<slug>/filename 路径
- [x] 2.6 冲突检测：slug 已存在时返回 409
- [x] 2.7 未匹配图片警告：response 中包含 warnings 数组

## 3. Showcase 前端 — 图片路径适配

- [x] 3.1 SolutionDetail.vue 自定义 marked renderer，重写相对图片路径为绝对 URL
- [x] 3.2 确保 https:// 开头的图片 URL 不被修改

## 4. 验证

- [x] 4.1 导入含图片的 Obsidian 文档，确认图片正确迁移和路径重写
- [x] 4.2 在 showcase 详情页确认图片正常显示
