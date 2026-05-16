## ADDED Requirements

### Requirement: Tech stack shows animated progress bars
Each tech stack item SHALL display a horizontal progress bar that fills from 0% to its target percentage when scrolled into view.

#### Scenario: Progress bars animate on scroll
- **WHEN** user scrolls to the tech stack section
- **THEN** each bar animates from 0% width to target value over ~1s

### Requirement: Progress bars use Intersection Observer
The animation SHALL be triggered by Intersection Observer, not on page load.

#### Scenario: Animation waits for visibility
- **WHEN** the tech stack section is not in viewport
- **THEN** progress bars remain at 0%
