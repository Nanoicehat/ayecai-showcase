## Why

椰菜优解页面文章增多后，纯列表展示缺乏目录导航能力。用户需要按文件夹浏览内容，快速定位某个分类下的文章。

## What Changes

- 椰菜优解列表页左侧新增目录树侧边栏
- 目录树从 index.json 自动构建，反映 `public/solutions/` 的多级目录结构
- 目录默认全部展开，支持点击折叠/展开
- 点击某个文件夹时，右侧文章列表只显示该文件夹下的内容
- 点击根节点或"全部"时恢复显示所有文章

## Capabilities

### New Capabilities

- `solutions-sidebar`: 椰菜优解页面的目录树侧边栏，支持文件夹折叠展开和按目录筛选文章列表

### Modified Capabilities

- `solutions-blog`: 列表页布局从全宽改为左侧目录+右侧内容的双栏布局；文章列表支持按 category 过滤

## Impact

- `src/views/SolutionsList.vue` — 重构为双栏布局，新增筛选逻辑
- 可能新增 `src/components/SolutionsTree.vue` 目录树组件
