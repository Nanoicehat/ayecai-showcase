## Why

当前文章卡片样式单一，缺乏视觉区分度和个性化表现力。需要让每篇文章卡片有独特的视觉风格，同时支持文档背景图功能增强阅读体验。

## What Changes

- 文章卡片样式随机化，每张卡片有不同的渐变色/装饰色，提供视觉区分度
- 新增文档背景图功能（frontmatter 中 `cover` 字段指定图片路径）
- 列表页卡片：有背景图时上半部分展示图片、下半部分展示标题等信息；无图时用随机渐变色装饰
- 详情页：有背景图时在页面顶部展示模糊背景图作为装饰，不影响正文内容阅读

## Capabilities

### New Capabilities

- `article-cover-image`: 文档背景图/封面图功能，支持在 frontmatter 中指定封面图路径，列表页和详情页分别以不同方式展示

### Modified Capabilities

- `solutions-blog`: 文章卡片布局改为上图下文结构，无图时使用随机渐变装饰；详情页顶部增加模糊背景图区域

## Impact

- `src/views/SolutionsList.vue` — 卡片结构改为上图下文
- `src/views/SolutionDetail.vue` — 顶部增加模糊背景图
- `public/solutions/index.json` — 索引增加 cover 字段
- `scripts/generate-solutions-index.ts` — 解析 frontmatter 中的 cover 字段
- 部分 mock 文档添加示例封面图
