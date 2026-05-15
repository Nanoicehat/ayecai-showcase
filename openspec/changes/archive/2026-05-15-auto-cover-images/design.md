## Context

当前 cover 字段需手动写在 frontmatter 中。改为约定优于配置：同名图片自动作为封面。无图时用默认风景图。

## Goals / Non-Goals

**Goals:**
- 构建时自动检测 `<slug>.jpg|png|svg|webp` 是否存在于同目录
- 存在 → index.json 的 cover 字段填完整路径
- 不存在 → cover 为空，前端用默认风景图
- 默认风景图放在 `public/solutions/defaults/`，6-8 张风景图
- 前端基于 slug hash 确定性选择默认图（不随机跳变）

**Non-Goals:**
- 不做图片压缩/缩略图
- 不做上传界面

## Decisions

### 1. 同名图片检测逻辑

构建脚本遍历 md 文件时，检查同目录下是否存在同名图片：

```typescript
const imageExts = ['.jpg', '.jpeg', '.png', '.svg', '.webp']
const coverFile = imageExts
  .map(ext => path.join(dir, slug + ext))
  .find(p => fs.existsSync(p))
```

### 2. 默认风景图来源

使用 picsum.photos 服务的固定 seed 图片下载为本地文件。图片尺寸 800x450（16:9），体积适中。

### 3. 前端默认图选择

```typescript
const defaultCovers = [
  'solutions/defaults/1.jpg',
  'solutions/defaults/2.jpg',
  // ...
]
function getDefaultCover(slug: string): string {
  const hash = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return defaultCovers[hash % defaultCovers.length]
}
```

## Risks / Trade-offs

- **[默认图体积增加仓库大小]** → 压缩到 50-100KB 每张可接受
- **[picsum.photos 外部依赖]** → 只用于初始下载，之后是本地文件
