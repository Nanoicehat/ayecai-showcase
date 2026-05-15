## ADDED Requirements

### Requirement: Project page wrapper
系统 SHALL 提供项目页面包装组件，负责加载项目配置、注入项目主题变量、渲染项目入口组件。

#### Scenario: Theme injection on mount
- **WHEN** 用户导航到项目页面
- **THEN** 项目 config 中的 theme CSS 变量被注入到页面，视觉风格切换为项目自定义风格

#### Scenario: Theme cleanup on leave
- **WHEN** 用户离开项目页面返回首页
- **THEN** 项目自定义 CSS 变量被移除，恢复全局默认主题

### Requirement: Project header
项目页 SHALL 显示项目标题、描述和返回首页链接。

#### Scenario: Header content
- **WHEN** 项目页加载完成
- **THEN** 页面顶部显示项目标题、简介描述，以及"← 返回"链接

### Requirement: Custom layout support
每个项目入口组件（`index.vue`）SHALL 可以自由定义页面布局和内容，不受全局布局约束（导航栏除外）。

#### Scenario: Project with gallery layout
- **WHEN** 项目 A 的 `index.vue` 使用图片画廊布局
- **THEN** 项目 A 页面按画廊布局渲染

#### Scenario: Project with dashboard layout
- **WHEN** 项目 B 的 `index.vue` 使用仪表盘布局
- **THEN** 项目 B 页面按仪表盘布局渲染，风格完全不同于项目 A

### Requirement: Loading state
项目页 SHALL 在异步组件加载期间显示加载状态。

#### Scenario: Async loading indicator
- **WHEN** 项目组件正在异步加载中
- **THEN** 页面显示加载动画或占位内容

#### Scenario: Load complete
- **WHEN** 项目组件加载完成
- **THEN** 加载状态消失，项目内容正常显示
