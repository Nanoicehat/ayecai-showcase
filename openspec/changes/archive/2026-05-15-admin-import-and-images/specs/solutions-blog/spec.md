## MODIFIED Requirements

### Requirement: Markdown image rendering in detail page
The system SHALL rewrite relative image paths in Markdown content to absolute URLs when rendering article detail pages. The SolutionDetail.vue component MUST transform relative image references (e.g., `assets/<slug>/image.png`) into full URLs using the base URL and article path context.

#### Scenario: Render article with relative images
- **WHEN** user views an article at path "ai/任务管理数据库配置" that contains `![](assets/任务管理数据库配置/img-1.png)`
- **THEN** the rendered HTML displays the image with src resolved to `<BASE_URL>solutions/ai/assets/任务管理数据库配置/img-1.png`

#### Scenario: Render article with absolute image URLs
- **WHEN** article contains `![](https://example.com/img.png)`
- **THEN** the rendered HTML keeps the absolute URL unchanged

#### Scenario: Render article with no images
- **WHEN** article contains no image references
- **THEN** rendering proceeds normally with no path transformation
