## MODIFIED Requirements

### Requirement: Solutions list page displays articles
The system SHALL display article cards in a two-part structure: upper visual area (cover image or gradient) and lower info area (title, category, summary, date).

#### Scenario: User visits solutions page
- **WHEN** user navigates to `/#/solutions`
- **THEN** each card shows upper visual section and lower info section
- **THEN** cards with covers show the image; cards without show gradient decoration
- **THEN** articles are sorted by date descending

### Requirement: Article detail page renders markdown
The system SHALL fetch the markdown file, render it as formatted HTML, and optionally display a blurred cover background.

#### Scenario: View article with cover
- **WHEN** user navigates to article with cover image
- **THEN** blurred cover image appears as page background decoration
- **THEN** markdown content renders normally and is fully readable

#### Scenario: View article without cover
- **WHEN** user navigates to article without cover image
- **THEN** page renders without background decoration
