## 1. 依赖与基础设施

- [x] 1.1 安装 marked 依赖（markdown 渲染）和 gray-matter（frontmatter 解析，dev 依赖）
- [x] 1.2 创建构建脚本 `scripts/generate-solutions-index.ts`，扫描 `public/solutions/` 生成 `public/solutions/index.json`
- [x] 1.3 在 package.json 中添加 `prebuild` 和 `predev` 脚本调用索引生成

## 2. 内容准备

- [x] 2.1 创建 `public/solutions/ai/` 目录结构
- [x] 2.2 将桌面「Agent信息收集.md」复制到 `public/solutions/ai/agent-info.md`，添加 YAML frontmatter（title, date, category, summary）

## 3. 导航栏改造

- [x] 3.1 重构 NavBar.vue，增加「开源项目」和「椰菜优解」tab 链接
- [x] 3.2 实现 tab active 状态高亮（根据当前路由判断）
- [x] 3.3 响应式适配（移动端 tab 样式）

## 4. 路由配置

- [x] 4.1 在 router.ts 添加 `/solutions` 路由（列表页）
- [x] 4.2 在 router.ts 添加 `/solutions/:category/:slug` 路由（详情页）

## 5. 文章列表页

- [x] 5.1 创建 `src/views/SolutionsList.vue`，fetch index.json 展示文章卡片列表
- [x] 5.2 实现文章卡片组件（标题、日期、分类、摘要、hover 效果）
- [x] 5.3 响应式布局（移动单列，桌面双列网格）
- [x] 5.4 按日期降序排列，空状态处理

## 6. 文章详情页

- [x] 6.1 创建 `src/views/SolutionDetail.vue`，根据路由参数 fetch 对应 md 文件
- [x] 6.2 使用 marked 渲染 markdown 内容为 HTML
- [x] 6.3 文章头部元信息展示（标题、日期、分类）
- [x] 6.4 "返回列表" 导航链接
- [x] 6.5 文章不存在时的错误处理与提示

## 7. 样式与排版

- [x] 7.1 文章详情页 markdown 排版样式（prose 风格：标题、段落、表格、代码块、链接）
- [x] 7.2 文章列表页 blog 风格视觉设计（卡片阴影、间距、入场动画）
- [x] 7.3 整体配色与现有站点风格统一

## 8. 验证

- [x] 8.1 运行 dev server 验证导航切换、列表加载、文章渲染完整流程
- [x] 8.2 TypeScript 类型检查通过（`npx vue-tsc --noEmit`）
- [x] 8.3 构建无报错（`npm run build`）
