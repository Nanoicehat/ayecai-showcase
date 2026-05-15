## ADDED Requirements

### Requirement: Isolated project directory structure
每个项目 SHALL 拥有独立的目录结构 `src/projects/<slug>/`，包含入口组件、配置文件、私有组件和资源。

#### Scenario: Project directory layout
- **WHEN** 创建名为 `my-app` 的新项目
- **THEN** 目录结构为：
  ```
  src/projects/my-app/
    ├── index.vue
    ├── config.ts
    ├── components/
    └── assets/
  ```

### Requirement: Style isolation
每个项目 SHALL 使用 Vue Scoped CSS 确保样式不泄漏到其他项目。项目可通过 `config.ts` 中的 `theme` 字段覆盖全局 CSS 变量。

#### Scenario: Scoped styles don't leak
- **WHEN** 项目 A 定义了 `.title { color: red }` 样式
- **THEN** 该样式仅影响项目 A 的组件，项目 B 的 `.title` 不受影响

#### Scenario: Project theme override
- **WHEN** 项目 config 中定义 `theme: { '--color-primary': '#ff6b6b' }`
- **THEN** 该项目页面中 `var(--color-primary)` 值为 `#ff6b6b`，离开项目页后恢复全局值

### Requirement: Lazy loading
项目入口组件 SHALL 使用动态 import 实现懒加载，确保首屏不加载未访问项目的代码。

#### Scenario: Project code splitting
- **WHEN** 用户只访问首页
- **THEN** 网络请求中不包含任何项目模块的 JS 文件

#### Scenario: Project loads on navigation
- **WHEN** 用户从首页导航到项目 A
- **THEN** 项目 A 的 JS chunk 被异步加载并渲染
