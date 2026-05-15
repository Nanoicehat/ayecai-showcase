## ADDED Requirements

### Requirement: Project configuration type
系统 SHALL 定义 `ProjectConfig` 类型，包含以下字段：
- `slug`: string — URL 路径标识符（kebab-case）
- `title`: string — 项目显示名称
- `description`: string — 项目简介
- `tags`: string[] — 项目标签
- `coverImage`: string — 封面图路径
- `theme`: object — 项目自定义主题变量（可选）

#### Scenario: Type definition exists
- **WHEN** 开发者创建新项目配置
- **THEN** TypeScript 类型检查确保所有必填字段存在且类型正确

### Requirement: Centralized project registry
系统 SHALL 在 `src/projects/registry.ts` 中维护所有项目的配置数组，每个项目通过 import 其 `config.ts` 注册。

#### Scenario: Registry exports project list
- **WHEN** 应用启动时读取 registry
- **THEN** 获取到所有已注册项目的配置数组

#### Scenario: Adding a new project
- **WHEN** 开发者新建项目目录并创建 `config.ts`
- **THEN** 只需在 `registry.ts` 中添加一行 import 即可注册新项目

### Requirement: Dynamic route generation
系统 SHALL 根据注册表中的项目列表自动生成 Vue Router 路由，路由路径为 `/project/:slug`。

#### Scenario: Routes generated from registry
- **WHEN** 应用启动
- **THEN** 每个注册项目自动获得 `/project/<slug>` 路由

#### Scenario: Unknown project slug
- **WHEN** 用户访问未注册的 `/project/unknown-slug`
- **THEN** 显示 404 或重定向到首页
