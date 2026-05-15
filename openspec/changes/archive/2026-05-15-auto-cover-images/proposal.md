## Why

当前封面图需要手动在 frontmatter 中指定路径，维护成本高。改为自动按约定查找同名图片，无图时展示默认风景图，降低使用门槛。

## What Changes

- 封面图改为自动匹配：与 md 文件同名的图片文件（`.jpg/.png/.svg/.webp`）即为封面图
- 移除 frontmatter 中的 `cover` 字段需求
- 构建脚本自动检测同目录下同名图片是否存在
- 无封面图时，从预设的默认风景图列表中随机分配一张（基于 slug hash，确定性）
- 下载几张高质量风景图作为默认封面放入 `public/solutions/defaults/`

## Capabilities

### Modified Capabilities

- `article-cover-image`: 封面图改为同名自动匹配 + 默认风景图兜底，移除手动 frontmatter 配置需求

## Impact

- `scripts/generate-solutions-index.ts` — 改为自动检测同名图片
- `public/solutions/defaults/` — 新增默认风景图目录
- `src/views/SolutionsList.vue` — 无封面时使用默认图而非渐变色
- 现有 mock 文档移除 `cover` frontmatter 字段
