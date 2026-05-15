## ADDED Requirements

### Requirement: Optional preview component per project
每个项目 SHALL 可以在自己的文件夹中提供可选的 `preview.vue` 组件，作为首页展示动画。

#### Scenario: Project with custom preview
- **WHEN** 项目 config 中 `hasPreview: true` 且 `preview.vue` 存在
- **THEN** 首页该项目展示区域渲染自定义 preview 组件

#### Scenario: Project without preview
- **WHEN** 项目 config 中 `hasPreview` 为 false 或未定义
- **THEN** 首页该项目展示区域使用默认封面图 + hover 缩放效果

### Requirement: ProjectConfig extends hasPreview
`ProjectConfig` 类型 SHALL 新增可选字段 `hasPreview?: boolean`。

#### Scenario: Config type updated
- **WHEN** 项目 config 设置 `hasPreview: true`
- **THEN** TypeScript 类型检查通过

### Requirement: Preview component isolation
Preview 组件 SHALL 使用 scoped CSS，不影响首页其他元素。

#### Scenario: Preview styles scoped
- **WHEN** preview 组件定义了 `.container` 样式
- **THEN** 该样式仅作用于 preview 组件内部
