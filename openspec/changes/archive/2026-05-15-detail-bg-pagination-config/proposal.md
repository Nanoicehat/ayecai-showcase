## Why

1. 详情页背景图太模糊/太淡看不清楚，需要更清晰地展示
2. 文章多时列表页需要翻页功能，每页数量和每行列数应可配置
3. 需要清理所有自定义封面图，统一看默认风景图效果

## What Changes

- 详情页背景图：提高清晰度和可见度，但不遮挡中间内容区
- 列表页新增分页功能，每页数量和每行列数从配置文件读取
- 配置文件 `src/config/solutions.ts`，含每页数量、每行列数（min=2, max=3）
- 删除所有文档对应的自定义封面图文件

## Capabilities

### Modified Capabilities

- `article-cover-image`: 详情页背景图展示更清晰
- `solutions-blog`: 列表页新增分页，布局参数可配置

## Impact

- `src/views/SolutionDetail.vue` — 调整背景图样式（降低 blur，提高 opacity）
- `src/views/SolutionsList.vue` — 添加分页逻辑和配置引用
- `src/config/solutions.ts` — 新增配置文件
- 删除 `public/solutions/` 下所有非默认的图片文件
