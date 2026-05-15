## Context

椰菜优解页面当前是全宽文章卡片网格。index.json 已包含每篇文章的 `category` 和 `path` 字段，可从中推导目录结构。需要在不引入额外依赖的情况下实现目录树。

## Goals / Non-Goals

**Goals:**
- 左侧目录树展示所有分类文件夹，支持多级嵌套
- 默认展开所有节点
- 点击箭头折叠/展开子目录
- 点击文件夹名筛选右侧文章列表（只显示该目录及子目录下的内容）
- 移动端隐藏侧边栏或收起

**Non-Goals:**
- 不做文件级别的树节点（只展示文件夹，不展示单篇文章）
- 不做拖拽排序
- 不做搜索过滤

## Decisions

### 1. 目录树数据结构：从 index.json 动态构建

从文章的 `category` 字段提取所有唯一路径，构建树形结构。无需额外接口或文件。

```typescript
interface TreeNode {
  name: string
  path: string
  children: TreeNode[]
  expanded: boolean
}
```

### 2. 组件拆分

- `SolutionsTree.vue` — 独立目录树组件，递归渲染
- `SolutionsList.vue` — 改为双栏布局，管理选中状态和筛选逻辑

### 3. 筛选逻辑

选中文件夹时，过滤 `article.category.startsWith(selectedPath)`，这样选中父目录自动包含子目录文章。

### 4. 移动端适配

移动端目录树默认隐藏，通过按钮切换显示。

## Risks / Trade-offs

- **[文件夹没有文章时仍显示]** → 可接受，展示目录结构本身有导航价值
- **[深层嵌套可能撑宽侧边栏]** → 限制侧边栏宽度，超出文字省略
