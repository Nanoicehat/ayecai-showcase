## Why

网站当前只有「开源项目」展示功能，缺少技术内容输出渠道。新增「椰菜优解」tab 提供解决方案/技术博客展示能力，从本地 markdown 文件读取内容，支持多级目录分类，让网站兼具项目展示和知识分享双重定位。

## What Changes

- 导航栏从品牌+返回按钮改为支持多 tab 导航（开源项目、椰菜优解）
- 新增「椰菜优解」路由及页面，展示博客文章列表
- 新增文章详情页，渲染 markdown 内容
- 从 `public/solutions/` 目录读取 md 文件，支持多级目录结构
- 首篇文章：「Agent信息收集」（已有内容）
- 界面风格：类 blog 网站，文章卡片列表 + 文章详情阅读页

## Capabilities

### New Capabilities

- `solutions-navigation`: 导航栏多 tab 切换能力，支持「开源项目」和「椰菜优解」两个顶级页面
- `solutions-blog`: 解决方案博客页面，文章列表展示 + 文章详情渲染，从 markdown 文件读取内容，支持多级目录分类

### Modified Capabilities

（无需修改已有 spec）

## Impact

- `src/components/NavBar.vue` — 重构为多 tab 导航
- `src/router.ts` — 新增 solutions 相关路由
- `src/views/` — 新增 SolutionsList.vue、SolutionDetail.vue
- `public/solutions/` — 新增 md 内容目录及索引
- 构建配置可能需要 markdown 解析依赖（如 marked）
