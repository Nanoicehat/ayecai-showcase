## ADDED Requirements

### Requirement: Gallery collage layout
Preview SHALL display 3-4 image cards in a Masonry-style staggered layout with different rotation angles.

#### Scenario: Cards render with staggered positioning
- **WHEN** the preview component mounts
- **THEN** 3-4 cards SHALL be positioned in an overlapping collage arrangement with slight rotations (-3° to 5°)

### Requirement: Staggered entrance animation
Each card SHALL fade in with a scale-up and rotation animation, with increasing delay per card.

#### Scenario: Sequential card entrance
- **WHEN** the preview becomes visible
- **THEN** cards SHALL animate in sequence with 0.2s delay between each, using opacity 0→1 + scale 0.85→1 + rotation correction

### Requirement: Warm decorative background
Preview background SHALL use a warm gradient with scattered dot decorations.

#### Scenario: Background renders
- **WHEN** the preview component renders
- **THEN** background SHALL show a warm-tone gradient and decorative dot elements with low opacity
