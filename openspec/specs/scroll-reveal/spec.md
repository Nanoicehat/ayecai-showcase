## ADDED Requirements

### Requirement: Elements reveal on scroll via Intersection Observer
Sections marked with `data-reveal` attribute SHALL fade and slide into view when they enter the viewport, driven by a single shared IntersectionObserver instance.

#### Scenario: Hidden element reveals on scroll
- **WHEN** a `[data-reveal]` element enters the viewport
- **THEN** the `.revealed` class is added, triggering CSS transition

#### Scenario: Observer disconnects on unmount
- **WHEN** the component unmounts
- **THEN** the IntersectionObserver is disconnected

### Requirement: Reveal supports animation variants
The `data-reveal` attribute SHALL accept animation variant values: `fade-up`, `fade-left`, `fade-right`, `scale-in`, `fade-only`.

#### Scenario: Element uses fade-left variant
- **WHEN** element has `data-reveal="fade-left"` and enters viewport
- **THEN** it slides in from the left while fading in
