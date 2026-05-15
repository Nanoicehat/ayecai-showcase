## ADDED Requirements

### Requirement: Hero section
首页 SHALL 显示一个简洁的 hero 区域，包含个人名称/标题和一句简短介绍。

#### Scenario: Hero content display
- **WHEN** 用户访问首页
- **THEN** 页面顶部显示个人名称和简介文字，风格清新简约

### Requirement: Project card grid
首页 SHALL 以卡片网格形式展示所有已注册项目。每张卡片显示项目封面图、标题、简介和标签。

#### Scenario: All projects displayed
- **WHEN** 注册表中有 3 个项目
- **THEN** 首页显示 3 张项目卡片，每张包含封面图、标题、简介和标签

#### Scenario: Card click navigation
- **WHEN** 用户点击某个项目卡片
- **THEN** 导航到该项目的详情页 `/project/<slug>`

#### Scenario: Empty state
- **WHEN** 注册表中没有项目
- **THEN** 显示"暂无项目"提示信息

### Requirement: Tag filtering
首页 SHALL 支持按标签筛选项目。点击标签后只显示包含该标签的项目。

#### Scenario: Filter by tag
- **WHEN** 用户点击标签"Vue"
- **THEN** 只显示标签中包含"Vue"的项目卡片

#### Scenario: Clear filter
- **WHEN** 用户再次点击已激活的标签
- **THEN** 取消筛选，显示所有项目

### Requirement: Responsive grid layout
项目卡片网格 SHALL 根据屏幕宽度自适应列数：桌面端 3 列，平板 2 列，手机 1 列。

#### Scenario: Desktop layout
- **WHEN** 屏幕宽度 >= 1024px
- **THEN** 项目卡片以 3 列网格排列

#### Scenario: Mobile layout
- **WHEN** 屏幕宽度 < 640px
- **THEN** 项目卡片以 1 列排列，卡片宽度铺满
