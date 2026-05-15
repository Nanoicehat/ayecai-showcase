## ADDED Requirements

### Requirement: SVG line chart with draw animation
Preview SHALL include an SVG polyline chart that animates drawing via stroke-dashoffset transition.

#### Scenario: Line chart draws on mount
- **WHEN** the preview component mounts
- **THEN** an SVG polyline SHALL animate from fully hidden (dashoffset = length) to fully drawn (dashoffset = 0) over ~1.5s

### Requirement: Stat card flip entrance
Stat cards SHALL enter with a 3D flip animation (rotateX) instead of simple slide-up.

#### Scenario: Cards flip in
- **WHEN** the preview becomes visible
- **THEN** each stat card SHALL animate from rotateX(90deg) opacity:0 to rotateX(0) opacity:1 with staggered delay

### Requirement: Data point pulse effect
Data points on the line chart SHALL have a pulsing glow animation.

#### Scenario: Pulse visible after chart draws
- **WHEN** the line chart animation completes
- **THEN** data point circles SHALL show a repeating box-shadow pulse animation
