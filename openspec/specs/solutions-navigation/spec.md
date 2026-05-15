# solutions-navigation Specification

## Purpose
TBD - created by archiving change add-solutions-blog. Update Purpose after archive.
## Requirements
### Requirement: Navigation bar displays multiple tabs
NavBar SHALL display tab links for "开源项目" and "椰菜优解", allowing users to switch between top-level sections.

#### Scenario: User sees both tabs on homepage
- **WHEN** user loads any page
- **THEN** NavBar displays "开源项目" and "椰菜优解" as clickable tab links

#### Scenario: Active tab is highlighted
- **WHEN** user is on the solutions page (`/solutions` or `/solutions/*`)
- **THEN** "椰菜优解" tab SHALL have active styling
- **WHEN** user is on the home page or project page (`/` or `/project/*`)
- **THEN** "开源项目" tab SHALL have active styling

### Requirement: Tab navigation routes correctly
Clicking a tab SHALL navigate to the corresponding section without full page reload.

#### Scenario: Navigate to solutions
- **WHEN** user clicks "椰菜优解" tab
- **THEN** router navigates to `/#/solutions`
- **THEN** solutions list page is displayed

#### Scenario: Navigate to projects
- **WHEN** user clicks "开源项目" tab
- **THEN** router navigates to `/#/`
- **THEN** project showcase homepage is displayed

### Requirement: Brand logo always links home
Brand logo (🥬 阿椰菜) SHALL always link to the root path `/`, regardless of current tab.

#### Scenario: Click brand from solutions page
- **WHEN** user is on `/solutions` and clicks brand logo
- **THEN** router navigates to `/`

