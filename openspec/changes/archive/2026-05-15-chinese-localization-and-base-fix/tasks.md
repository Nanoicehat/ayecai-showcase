## 1. Base 路径修复

- [x] 1.1 `vite.config.ts` 中 `base` 改为 `'/'`
- [x] 1.2 `index.html` 标题改为中文

## 2. 全局组件中文化

- [x] 2.1 `NavBar.vue` 标题改为中文
- [x] 2.2 `Home.vue` hero 文案改为中文
- [x] 2.3 `ProjectPage.vue` 返回链接和加载提示改为中文

## 3. Demo 项目中文化

- [x] 3.1 `creative-portfolio/config.ts` 标题、描述、标签改中文
- [x] 3.2 `creative-portfolio/index.vue` 画廊内容改中文
- [x] 3.3 `tech-dashboard/config.ts` 标题、描述、标签改中文
- [x] 3.4 `tech-dashboard/index.vue` 数据和任务列表改中文
- [x] 3.5 `minimal-blog/config.ts` 标题、描述、标签改中文
- [x] 3.6 `minimal-blog/index.vue` 博文内容改中文

## 4. 新增 Mock 项目

- [x] 4.1 创建 `src/projects/ai-chat-app/` 目录结构（config.ts、index.vue、assets/cover.svg）
- [x] 4.2 实现聊天界面 mock 组件（对话气泡、输入框）
- [x] 4.3 在 `registry.ts` 中注册新项目

## 5. 验证

- [x] 5.1 `npm run build` 构建成功
- [x] 5.2 启动 dev server 验证 URL 路径正确（无 demo-proj-260515）
