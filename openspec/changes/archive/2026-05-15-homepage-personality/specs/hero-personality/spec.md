## ADDED Requirements

### Requirement: Identity role labels
Hero section SHALL display identity role labels (e.g., "前端开发者 / 创意极客") above the "阿椰菜" gradient name, styled as small text with decorative side lines.

#### Scenario: Role labels render
- **WHEN** the Home page loads
- **THEN** a line of role text SHALL appear above the gradient name with horizontal decorative lines on both sides

### Requirement: Decorative floating shapes
Hero section SHALL contain CSS-only decorative geometric shapes (circles, triangles, squares) with slow floating animation, positioned absolutely within the hero container.

#### Scenario: Shapes visible and animated
- **WHEN** the Home page loads
- **THEN** at least 3 geometric shapes SHALL be visible with low opacity (0.1–0.2) and continuously floating (translateY oscillation over 6–8 seconds)

#### Scenario: Shapes respect reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is enabled
- **THEN** all floating shape animations SHALL be paused

### Requirement: Hero visual hierarchy
Hero SHALL maintain existing elements (gradient name, typewriter subtitle) and add new elements in this order top-to-bottom: role labels → gradient name → typewriter subtitle.

#### Scenario: Element order preserved
- **WHEN** the Home page renders
- **THEN** the DOM order SHALL be: role labels div, then h1 gradient name, then typewriter paragraph
