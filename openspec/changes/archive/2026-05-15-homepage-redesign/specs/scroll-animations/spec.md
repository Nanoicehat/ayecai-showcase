## ADDED Requirements

### Requirement: Scroll reveal composable
系统 SHALL 提供 `useScrollReveal` composable，基于 Intersection Observer，元素进入视口时触发 CSS 动画。

#### Scenario: Element enters viewport
- **WHEN** 项目模块滚动进入可视区域
- **THEN** 该模块执行渐入+上移入场动画

#### Scenario: Element already visible
- **WHEN** 页面加载时元素已在视口内
- **THEN** 元素直接显示，不播放动画

### Requirement: Staggered animation
系统 SHALL 支持列表元素的交错延迟动画（stagger），每个元素比前一个延迟一小段时间入场。

#### Scenario: Multiple projects stagger
- **WHEN** 多个项目模块依次滚动进入视口
- **THEN** 每个模块的入场动画有递增延迟，形成瀑布流效果
