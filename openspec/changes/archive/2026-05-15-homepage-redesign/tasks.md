## 1. 类型与配置基础

- [x] 1.1 `ProjectConfig` 新增 `hasPreview?: boolean` 字段
- [x] 1.2 创建 `src/config/tags.ts`，定义 `TagConfig` 接口和标签配置（全部/前端/数据/AI 四个标签）
- [x] 1.3 各项目 `config.ts` 中添加 `hasPreview: true`

## 2. Composables

- [x] 2.1 创建 `src/composables/useScrollReveal.ts`，基于 Intersection Observer 实现滚动入场动画
- [x] 2.2 创建 `src/composables/useTypewriter.ts`，实现打字机效果

## 3. Hero 品牌区域

- [x] 3.1 重写 `Home.vue` Hero 区域：「阿椰菜」渐变 logo 文字 + 渐入动画
- [x] 3.2 实现打字机效果副标题（多条介绍文案轮播）

## 4. 标签系统重构

- [x] 4.1 `Home.vue` 标签逻辑改为从 `tags.ts` 配置读取
- [x] 4.2 标签过滤逻辑改为按 `TagConfig.projects` 匹配 slug
- [x] 4.3 标签样式加入 icon 显示和选中动画

## 5. 项目展示重设计

- [x] 5.1 重写 `ProjectCard.vue` 为竖排全宽展示模块（左右分栏 zigzag 布局）
- [x] 5.2 实现 preview 组件动态加载逻辑（有 hasPreview 时加载 preview.vue，否则用封面图）
- [x] 5.3 `Home.vue` 项目列表从网格改为竖排，接入 useScrollReveal 滚动入场动画
- [x] 5.4 移动端响应式：项目展示改为上下堆叠

## 6. 项目 Preview 组件

- [x] 6.1 创建 `creative-portfolio/preview.vue`（浮动画廊卡片动画）
- [x] 6.2 创建 `tech-dashboard/preview.vue`（数据仪表盘数字跳动动画）
- [x] 6.3 创建 `minimal-blog/preview.vue`（文字淡入排版动画）
- [x] 6.4 创建 `ai-chat-app/preview.vue`（聊天气泡逐条弹出动画）

## 7. 验证

- [x] 7.1 `npm run build` 构建成功
- [x] 7.2 Dev server 验证：Hero 动画、标签过滤、项目展示、preview 动画、滚动入场
