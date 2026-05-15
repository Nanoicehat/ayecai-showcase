## MODIFIED Requirements

### Requirement: Vue 3 application bootstrap
系统 SHALL 使用 `base: '/'` 配置 Vite，URL 路径中不包含仓库文件夹名。页面标题 SHALL 为中文。

#### Scenario: Root path access
- **WHEN** 用户访问 `http://localhost:5173/`
- **THEN** 页面正确加载首页，URL 中无 `demo-proj-260515`

#### Scenario: Page title in Chinese
- **WHEN** 页面加载完成
- **THEN** 浏览器标签页标题显示中文（如"我的项目展示"）

### Requirement: Global layout structure
导航栏 SHALL 显示中文网站标题和中文返回链接。

#### Scenario: Chinese navigation
- **WHEN** 用户在任意页面
- **THEN** 导航栏显示中文标题，返回链接显示"← 返回"
