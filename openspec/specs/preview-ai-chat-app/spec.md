## ADDED Requirements

### Requirement: Elastic bubble entrance
Chat bubbles SHALL enter with a spring/elastic animation using cubic-bezier bounce timing.

#### Scenario: Bubble pops in with bounce
- **WHEN** a chat bubble appears
- **THEN** it SHALL animate from scale(0.3) translateY(20px) to scale(1) translateY(0) using cubic-bezier(0.175, 0.885, 0.32, 1.275) timing

### Requirement: Avatar breathing glow
User and AI avatar icons SHALL have a pulsing box-shadow glow effect.

#### Scenario: Avatar glow pulses
- **WHEN** the preview is visible
- **THEN** each avatar SHALL have a repeating box-shadow animation cycling between subtle and prominent glow over 2s

### Requirement: Enhanced thinking indicator
The AI typing indicator SHALL use wave-style dot animation instead of simple pulse.

#### Scenario: Dots wave sequentially
- **WHEN** the AI thinking indicator is visible
- **THEN** 3 dots SHALL animate with translateY bounce in sequence (0s, 0.15s, 0.3s delay) creating a wave pattern

### Requirement: AI reply streaming effect
The final AI response bubble SHALL show a character-by-character reveal animation.

#### Scenario: Text streams in
- **WHEN** the AI reply bubble appears (after typing indicator)
- **THEN** the text content SHALL reveal character by character using a width-clip or mask animation over ~1.5s
