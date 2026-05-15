## ADDED Requirements

### Requirement: Brand name in NavBar
NavBar title SHALL change from "我的项目展示" to "阿椰菜" with gradient text styling matching the Hero logo gradient.

#### Scenario: Brand name displayed on homepage
- **WHEN** user is on the homepage
- **THEN** NavBar left side SHALL show "✦ 阿椰菜" with gradient text and bold weight

### Requirement: Star icon hover animation
The `✦` star icon in NavBar SHALL rotate 360 degrees on hover with a smooth transition.

#### Scenario: Hover triggers rotation
- **WHEN** user hovers over the NavBar brand area
- **THEN** the `✦` icon SHALL rotate 360 degrees with `transition: transform 0.6s ease`

#### Scenario: Hover ends
- **WHEN** user moves cursor away from NavBar brand area
- **THEN** the `✦` icon SHALL rotate back to 0 degrees smoothly

### Requirement: Gradient consistency
NavBar brand gradient SHALL use the same color stops as the Hero "阿椰菜" gradient for visual consistency.

#### Scenario: Gradient matches Hero
- **WHEN** NavBar renders
- **THEN** the brand text gradient SHALL use identical CSS gradient values as the Hero h1 gradient
