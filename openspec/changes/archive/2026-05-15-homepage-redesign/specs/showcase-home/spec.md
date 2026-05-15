## MODIFIED Requirements

### Requirement: Project card grid
首页 SHALL 将项目展示从 3 列网格改为竖排单列布局。每个项目占一整行，左右分栏交替排列（zigzag）：奇数行左文右图，偶数行左图右文。

#### Scenario: Vertical single-column layout
- **WHEN** 首页加载
- **THEN** 项目以竖排方式展示，每个项目独占一行

#### Scenario: Zigzag alternating layout
- **WHEN** 有多个项目
- **THEN** 第 1 个项目信息在左、预览在右；第 2 个项目预览在左、信息在右；依此交替

#### Scenario: Mobile stacked layout
- **WHEN** 屏幕宽度 < 768px
- **THEN** 所有项目改为上下堆叠布局（预览在上、信息在下），不再左右交替

### Requirement: Tag filtering
首页标签 SHALL 从 `src/config/tags.ts` 配置文件读取，不再自动聚合。

#### Scenario: Configured tags displayed
- **WHEN** 配置文件定义了 4 个标签
- **THEN** 首页标签栏显示这 4 个标签（含图标）

#### Scenario: Tag with icon
- **WHEN** 标签配置了 icon 字段
- **THEN** 标签前显示对应 emoji 图标
