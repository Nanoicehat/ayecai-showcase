## ADDED Requirements

### Requirement: ShowcaseStyle configuration field
ProjectConfig SHALL support an optional `showcase` field of type `ShowcaseStyle` with properties: `bgGradient` (string, CSS gradient), `accentColor` (string, CSS color), `animation` (optional enum: `slide-up` | `slide-left` | `slide-right` | `fade-scale` | `rotate-in`).

#### Scenario: Project with full showcase config
- **WHEN** a project config includes `showcase: { bgGradient: 'linear-gradient(135deg, #667eea, #764ba2)', accentColor: '#667eea', animation: 'slide-left' }`
- **THEN** the ProjectCard SHALL apply the gradient as module background, use the accent color for tags and button, and use the slide-left entrance animation

#### Scenario: Project without showcase config
- **WHEN** a project config has no `showcase` field
- **THEN** the ProjectCard SHALL use default styling (no background gradient, default primary color, `slide-up` animation)

### Requirement: CSS variable injection per module
ProjectCard SHALL inject `--showcase-bg` and `--showcase-accent` CSS variables from the project's `showcase` config, scoped to the card element via inline style binding.

#### Scenario: Showcase variables applied
- **WHEN** ProjectCard renders with `showcase.bgGradient` and `showcase.accentColor`
- **THEN** the card element SHALL have `--showcase-bg` set to the gradient value and `--showcase-accent` set to the accent color

#### Scenario: Tag and button use accent color
- **WHEN** `--showcase-accent` is set on the card
- **THEN** `.tag` background and `.showcase-link` background SHALL use `var(--showcase-accent)` with appropriate opacity

### Requirement: Per-project entrance animation
ProjectCard SHALL support 5 entrance animation types selectable via `showcase.animation`. Each animation triggers on scroll reveal via Intersection Observer.

#### Scenario: slide-left animation
- **WHEN** project has `animation: 'slide-left'` and card enters viewport
- **THEN** card SHALL animate from `translateX(-60px), opacity: 0` to `translateX(0), opacity: 1`

#### Scenario: fade-scale animation
- **WHEN** project has `animation: 'fade-scale'` and card enters viewport
- **THEN** card SHALL animate from `scale(0.85), opacity: 0` to `scale(1), opacity: 1`

#### Scenario: rotate-in animation
- **WHEN** project has `animation: 'rotate-in'` and card enters viewport
- **THEN** card SHALL animate from `rotate(-5deg) scale(0.9), opacity: 0` to `rotate(0) scale(1), opacity: 1`

### Requirement: Reduced motion support
All showcase animations SHALL respect `prefers-reduced-motion: reduce` media query.

#### Scenario: User prefers reduced motion
- **WHEN** the OS/browser has `prefers-reduced-motion: reduce` enabled
- **THEN** all entrance animations SHALL be disabled (instant reveal, no transform transitions)
