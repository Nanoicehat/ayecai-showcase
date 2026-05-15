## ADDED Requirements

### Requirement: Realistic typography simulation
Preview SHALL simulate a blog post with distinct title block, meta line, body paragraphs, and a blockquote with left border decoration.

#### Scenario: Typography elements render
- **WHEN** the preview component mounts
- **THEN** elements SHALL include a thick title bar, thin meta line, body lines of varying widths, and a blockquote section with a colored left border

### Requirement: Line-by-line typing entrance
Text lines SHALL fade in sequentially from left, simulating a typing/writing effect.

#### Scenario: Sequential line entrance
- **WHEN** the preview becomes visible
- **THEN** each line SHALL animate from translateX(-12px) opacity:0 to translateX(0) opacity:0.7 with 0.1s stagger

### Requirement: Blinking cursor at end
A text cursor SHALL blink at the end of the last line after all lines have appeared.

#### Scenario: Cursor appears after content
- **WHEN** all text lines have finished their entrance animation
- **THEN** a cursor element SHALL appear and blink with a 1s step-end animation
