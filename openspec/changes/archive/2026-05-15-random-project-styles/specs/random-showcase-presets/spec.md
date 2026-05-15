## ADDED Requirements

### Requirement: Showcase presets pool
The system SHALL provide a pool of at least 10 showcase style presets, each containing bgGradient, accentColor, and animation properties.

#### Scenario: Preset pool exists
- **WHEN** the application loads
- **THEN** the showcase presets pool SHALL contain at least 10 distinct style combinations

#### Scenario: Each preset has required properties
- **WHEN** a preset is selected from the pool
- **THEN** it SHALL include bgGradient (CSS gradient string), accentColor (hex color), and animation (one of the valid animation types)

### Requirement: Deterministic assignment from slug
The system SHALL assign a preset to a project deterministically based on the project slug using charCode sum modulo pool size.

#### Scenario: Same slug always gets same preset
- **WHEN** a project with slug "my-project" is rendered multiple times
- **THEN** it SHALL always receive the same preset style

#### Scenario: Different slugs get different presets
- **WHEN** two projects with different slugs are rendered
- **THEN** they SHALL likely receive different preset styles (not guaranteed due to hash collisions)

### Requirement: Explicit showcase takes priority
The system SHALL use the project's explicit showcase configuration when provided, ignoring the preset pool.

#### Scenario: Project with showcase config
- **WHEN** a project has `showcase` defined in its config
- **THEN** the explicit showcase values SHALL be used instead of a preset

#### Scenario: Project without showcase config
- **WHEN** a project does not have `showcase` in its config
- **THEN** a preset SHALL be assigned based on slug hash

### Requirement: Tags field optional
The `tags` field in ProjectConfig SHALL be optional, defaulting to an empty array.

#### Scenario: Project without tags
- **WHEN** a project config omits the `tags` field
- **THEN** it SHALL appear only under the "全部" filter and display no tag badges

#### Scenario: Project with tags
- **WHEN** a project config includes `tags`
- **THEN** behavior SHALL remain unchanged from current implementation
