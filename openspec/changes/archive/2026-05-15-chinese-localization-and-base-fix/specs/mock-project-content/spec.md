## ADDED Requirements

### Requirement: AI 聊天助手 mock 项目
系统 SHALL 包含第四个示例项目 `ai-chat-app`，展示一个 AI 聊天助手界面。使用渐变紫色主题，包含模拟的聊天气泡和功能介绍。

#### Scenario: Project registered
- **WHEN** 首页加载
- **THEN** 项目列表中包含"AI 聊天助手"卡片

#### Scenario: Chat interface display
- **WHEN** 用户进入 ai-chat-app 项目页
- **THEN** 显示模拟的聊天界面，包含多条中文对话气泡

#### Scenario: Distinct theme
- **WHEN** 用户进入 ai-chat-app 项目页
- **THEN** 页面主色调切换为紫色系，与其他项目明显不同
