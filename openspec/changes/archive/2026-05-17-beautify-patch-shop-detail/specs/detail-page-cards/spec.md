## ADDED Requirements

### Requirement: Feature cards use glassmorphism style
Each feature card SHALL render with backdrop-blur glass effect (semi-transparent background + blur + light border).

#### Scenario: Cards render with glass effect
- **WHEN** user views the feature cards section
- **THEN** each card has `backdrop-filter: blur()` and semi-transparent background

### Requirement: Feature cards animate on scroll reveal
Each feature card SHALL fade in and slide up when scrolled into the viewport, with staggered delays.

#### Scenario: Cards reveal on scroll
- **WHEN** user scrolls to the features section
- **THEN** cards appear one by one with fade-up animation and 0.12s stagger

### Requirement: Feature cards have 3D hover effect
Each feature card SHALL tilt slightly on mouse hover using CSS 3D transform.

#### Scenario: Card tilts on hover
- **WHEN** user hovers over a feature card
- **THEN** the card elevates with `translateY(-4px)` and slight `rotateX` effect
