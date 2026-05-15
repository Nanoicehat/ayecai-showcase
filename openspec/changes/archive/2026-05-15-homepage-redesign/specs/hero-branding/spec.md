## ADDED Requirements

### Requirement: Personal branding hero
首页 Hero 区域 SHALL 展示"阿椰菜"个人品牌，包含大号名称标题和打字机效果副标题。

#### Scenario: Name display with animation
- **WHEN** 首页加载
- **THEN** "阿椰菜"名称以渐入+上移动画出现

#### Scenario: Typing effect subtitle
- **WHEN** 名称动画完成后
- **THEN** 副标题以打字机效果逐字显示，展示个人简介

### Requirement: Logo text effect
系统 SHALL 用 CSS 渐变或特殊字体效果装饰"阿椰菜"文字，使其具有 logo 般的视觉效果。

#### Scenario: Gradient text
- **WHEN** Hero 区域渲染
- **THEN** 名称文字显示渐变色彩或装饰效果，区别于普通文字
