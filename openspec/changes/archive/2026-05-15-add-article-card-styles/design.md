## Context

当前卡片是纯白底 + 文字，所有卡片视觉一致。需要增加视觉层次：随机装饰色 + 可选封面图。

## Goals / Non-Goals

**Goals:**
- 每张卡片有独特的渐变色装饰（基于 slug hash 生成，确保稳定）
- frontmatter 新增 `cover` 字段指定封面图路径（相对于文档所在目录）
- 列表页卡片：上半部分展示封面图（有图）或渐变色块（无图），下半部分展示标题/摘要/日期
- 详情页：顶部全宽模糊背景图（高度有限，opacity 降低），正文浮于其上
- 构建索引时提取 cover 字段

**Non-Goals:**
- 不做图片上传功能（手动放图片文件即可）
- 不做图片裁剪/缩略图生成
- 不做暗色模式适配（后续再做）

## Decisions

### 1. 随机色方案：基于 slug 的确定性 hash

用文章 slug 字符串生成 hash，映射到预设的 8-10 种渐变色。每次渲染结果稳定，不会刷新变色。

```typescript
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  // ...
]
function getGradient(slug: string): string {
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}
```

### 2. 封面图路径约定

frontmatter 中 `cover: ./cover.jpg` → 解析为相对于文档目录的路径 → 索引中存储为可 fetch 的完整路径（如 `solutions/ai/cover.jpg`）。

### 3. 详情页模糊背景实现

```css
.detail-cover-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background-size: cover;
  filter: blur(20px);
  opacity: 0.3;
  z-index: -1;
}
```

## Risks / Trade-offs

- **[图片加载慢时卡片抖动]** → 给图片区域固定 aspect-ratio
- **[无图时渐变色可能与站点配色冲突]** → 选用柔和渐变，降低饱和度
