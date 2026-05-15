## ADDED Requirements

### Requirement: CLAUDE.md project init guide section
The showcase CLAUDE.md SHALL contain a "项目初始化交互指南" section that instructs Claude how to assist with new project onboarding.

#### Scenario: Guide content
- **WHEN** Claude reads CLAUDE.md for project initialization context
- **THEN** the guide section defines the interactive flow: detect new project folder → ask for tags (from tags.ts) → generate showcase config → generate detail page style → register in registry.ts and tags.ts

### Requirement: Tag selection from existing tags
The guide SHALL instruct Claude to read src/config/tags.ts and present existing tags as options when asking the user which tags to apply.

#### Scenario: Present tag options
- **WHEN** Claude initiates project initialization
- **THEN** Claude reads tags.ts, extracts tag labels (excluding "全部"), and presents them as selectable options plus an "add new tag" option

### Requirement: Showcase style generation
The guide SHALL instruct Claude to generate the showcase config (bgGradient, accentColor, animation) based on the project's theme.

#### Scenario: Generate showcase config
- **WHEN** user confirms tags and provides theme color preference
- **THEN** Claude generates a ProjectConfig.showcase object with bgGradient derived from theme color, accentColor matching theme, and animation chosen from available options (slide-up, slide-left, slide-right, fade-scale, rotate-in)

### Requirement: Detail page style generation
The guide SHALL instruct Claude to generate appropriate theme CSS variables for the project detail page.

#### Scenario: Generate theme config
- **WHEN** user provides primary color or Claude derives it from project context
- **THEN** Claude generates a ProjectConfig.theme object with --color-primary, --color-primary-light, --color-primary-dark, --color-bg, --color-bg-card variables

### Requirement: Registry and tags registration
The guide SHALL instruct Claude to update registry.ts and tags.ts after generating config.

#### Scenario: Register new project
- **WHEN** all config fields are determined
- **THEN** Claude adds import statement to registry.ts, appends config to projects array, and adds slug to appropriate tag(s) in tags.ts

### Requirement: Validation checklist
The guide SHALL include a final validation checklist for Claude to verify.

#### Scenario: Verify completeness
- **WHEN** Claude completes project initialization
- **THEN** Claude verifies: config.ts exists with all required fields, index.vue exists, cover asset exists, registry.ts imports the config, tags.ts includes the slug, dev server compiles without error
