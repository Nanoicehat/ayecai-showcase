## ADDED Requirements

### Requirement: Timeline shows project workflow steps
A vertical timeline SHALL display the project workflow: create project → register → deploy.

#### Scenario: Timeline renders with connecting line
- **WHEN** user views the timeline section
- **THEN** a vertical line connects step indicators from top to bottom

### Requirement: Timeline steps highlight on scroll
Each timeline step SHALL highlight (icon scale + line fill) when scrolled into view via Intersection Observer.

#### Scenario: Steps activate sequentially
- **WHEN** user scrolls through the timeline
- **THEN** each step's indicator scales up and the connecting line fills when that step enters the viewport
