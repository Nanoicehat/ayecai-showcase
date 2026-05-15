## ADDED Requirements

### Requirement: Tag configuration file
系统 SHALL 在 `src/config/tags.ts` 中定义标签配置，包含标签文本、图标和关联项目 slug 列表。

#### Scenario: Tags loaded from config
- **WHEN** 首页加载
- **THEN** 标签栏显示配置文件中定义的标签，而非从项目自动聚合

#### Scenario: "全部" tag shows all projects
- **WHEN** 用户点击"全部"标签（projects 为空数组）
- **THEN** 显示所有项目

#### Scenario: Tag filters by mapped projects
- **WHEN** 用户点击"前端"标签，配置映射为 ['creative-portfolio', 'minimal-blog']
- **THEN** 仅显示 creative-portfolio 和 minimal-blog 两个项目

### Requirement: TagConfig type definition
系统 SHALL 定义 `TagConfig` 接口，包含 `label: string`、`icon?: string`、`projects: string[]` 字段。

#### Scenario: Type safety
- **WHEN** 开发者添加新标签配置
- **THEN** TypeScript 确保 label 和 projects 字段存在且类型正确
