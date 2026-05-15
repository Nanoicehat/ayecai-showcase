# article-cover-image Specification

## Purpose
TBD - created by archiving change add-article-card-styles. Update Purpose after archive.
## Requirements
### Requirement: Articles support cover image via frontmatter
Articles MAY specify a `cover` field in YAML frontmatter to define a cover/background image.

#### Scenario: Article with cover image
- **WHEN** article frontmatter contains `cover: ./cover.jpg`
- **THEN** build script resolves path relative to the article's directory
- **THEN** index.json includes the resolved cover URL (e.g., `solutions/ai/cover.jpg`)

#### Scenario: Article without cover image
- **WHEN** article frontmatter does not contain `cover` field
- **THEN** index.json entry has `cover` as empty string or null

### Requirement: List page card shows cover image in top section
When an article has a cover image, the card SHALL display the image in the upper portion with article info below.

#### Scenario: Card with cover
- **WHEN** article has cover image
- **THEN** card top section shows the cover image (aspect-ratio constrained)
- **THEN** card bottom section shows title, category, summary, date

#### Scenario: Card without cover
- **WHEN** article has no cover image
- **THEN** card top section shows a deterministic gradient decoration based on article slug
- **THEN** card bottom section shows title, category, summary, date

### Requirement: Detail page shows blurred cover background
When viewing an article with a cover image, the detail page SHALL display a blurred version as a decorative background that does not interfere with content readability.

#### Scenario: Detail page with cover
- **WHEN** user opens article that has cover image
- **THEN** page shows a blurred, low-opacity background image at the top
- **THEN** article content is fully readable over the background
- **THEN** background does not scroll with content (or fades out)

#### Scenario: Detail page without cover
- **WHEN** user opens article without cover image
- **THEN** page renders normally without background decoration

### Requirement: Cards have visual variety via deterministic gradients
Each article card SHALL have a unique gradient color based on its slug, providing visual distinction between cards.

#### Scenario: Gradient assignment is stable
- **WHEN** page loads multiple times
- **THEN** same article always gets the same gradient color
- **THEN** different articles get visually distinct gradients

