## ADDED Requirements

### Requirement: Hero displays particle background with parallax
The Hero section SHALL render animated floating particles (pure CSS div elements) with randomized sizes, positions, and animation durations, creating a parallax depth effect.

#### Scenario: Particles float on page load
- **WHEN** user navigates to the detail page
- **THEN** 12-18 particles of varying size and opacity animate in floating patterns

### Requirement: Hero title enters character by character
The hero title text SHALL animate in one character at a time with a staggered delay.

#### Scenario: Title animates on page load
- **WHEN** the component mounts
- **THEN** each character slides up and fades in with 0.06s stagger

### Requirement: Hero shows animated stat counters
The Hero section SHALL display 3-4 numeric statistics that count up from 0 when scrolled into view.

#### Scenario: Stats count up on scroll
- **WHEN** the hero section enters the viewport
- **THEN** each stat number animates upward from 0 to its target value over ~1.5s
