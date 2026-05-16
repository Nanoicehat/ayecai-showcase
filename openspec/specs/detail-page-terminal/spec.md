## ADDED Requirements

### Requirement: Terminal displays commands with typewriter cursor
The terminal section SHALL render command lines with a blinking cursor indicator and staggered fade-in animation.

#### Scenario: Commands appear with stagger
- **WHEN** the terminal section enters viewport
- **THEN** each command line fades in with 0.5s stagger delay

### Requirement: Terminal commands have copy button
Each command line SHALL have a copy button that copies the command text to the clipboard.

#### Scenario: User copies a command
- **WHEN** user clicks the copy icon next to a terminal line
- **THEN** the command text is copied to clipboard via `navigator.clipboard.writeText()`

#### Scenario: Copy shows success feedback
- **WHEN** a command is successfully copied
- **THEN** the copy icon temporarily changes to a checkmark for 1.5s
