## ADDED Requirements

### Requirement: Vue 3 application bootstrap
系统 SHALL 使用 Vue 3 + Vite 初始化项目，配置 Vue Router 4 并使用 hash 模式路由。

#### Scenario: Application loads successfully
- **WHEN** 用户访问网站根路径
- **THEN** Vue 应用成功挂载，显示首页内容

#### Scenario: Hash routing works
- **WHEN** 用户刷新 `/#/project/demo` 页面
- **THEN** 页面正确加载对应项目页，无 404 错误

### Requirement: Light theme system
系统 SHALL 提供浅色系全局主题，使用 CSS 变量定义主题色。主色调为柔和的蓝绿色系，背景使用白色和浅灰色。

#### Scenario: Default theme applied
- **WHEN** 应用加载完成
- **THEN** 页面背景为浅色（白/浅灰），文字为深色，整体色调清新

#### Scenario: CSS variables available
- **WHEN** 任意组件需要使用主题色
- **THEN** 可通过 `var(--color-primary)`、`var(--color-bg)`、`var(--color-text)` 等 CSS 变量获取

### Requirement: Global layout structure
系统 SHALL 提供全局布局，包含顶部导航栏和主内容区域。导航栏包含网站标题和返回首页链接。

#### Scenario: Navigation bar display
- **WHEN** 用户在任意页面
- **THEN** 页面顶部显示导航栏，包含网站标题，点击标题可返回首页

#### Scenario: Content area rendering
- **WHEN** 路由切换到不同页面
- **THEN** 主内容区域更新为对应页面内容，导航栏保持不变

### Requirement: GitHub Pages deployment config
系统 SHALL 配置 Vite 的 `base` 路径为仓库名，确保 GitHub Pages 上资源路径正确。

#### Scenario: Assets load on GitHub Pages
- **WHEN** 网站部署到 GitHub Pages（`https://<user>.github.io/<repo>/`）
- **THEN** 所有 JS、CSS、图片资源正确加载，无 404

### Requirement: Responsive meta viewport
系统 SHALL 在 `index.html` 中配置 viewport meta 标签，确保移动端正确缩放。

#### Scenario: Mobile viewport
- **WHEN** 用户在移动设备上访问网站
- **THEN** 页面按设备宽度正确缩放，无需手动缩放即可阅读
