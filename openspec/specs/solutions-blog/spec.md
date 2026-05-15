# solutions-blog Specification

## Purpose
TBD - created by archiving change add-solutions-blog. Update Purpose after archive.
## Requirements
### Requirement: Solutions list page displays articles
The system SHALL display article cards in a two-part structure: upper visual area (cover image or gradient) and lower info area (title, category, summary, date).

#### Scenario: User visits solutions page
- **WHEN** user navigates to `/#/solutions`
- **THEN** each card shows upper visual section and lower info section
- **THEN** cards with covers show the image; cards without show gradient decoration
- **THEN** articles are sorted by date descending

### Requirement: Article cards are clickable
Each article card SHALL link to the full article detail page.

#### Scenario: Click article card
- **WHEN** user clicks an article card
- **THEN** router navigates to `/#/solutions/:category/:slug`
- **THEN** article detail page is displayed

### Requirement: Article detail page renders markdown
The system SHALL fetch the markdown file, render it as formatted HTML, and optionally display a blurred cover background.

#### Scenario: View article with cover
- **WHEN** user navigates to article with cover image
- **THEN** blurred cover image appears as page background decoration
- **THEN** markdown content renders normally and is fully readable

#### Scenario: View article without cover
- **WHEN** user navigates to article without cover image
- **THEN** page renders without background decoration

### Requirement: Article detail page has back navigation
The detail page SHALL provide navigation back to the solutions list.

#### Scenario: Return to list
- **WHEN** user is reading an article
- **THEN** a "返回列表" link is visible
- **WHEN** user clicks "返回列表"
- **THEN** router navigates to `/#/solutions`

### Requirement: Solutions index is generated at build time
A build script SHALL scan `public/solutions/` directory (recursively) and generate `public/solutions/index.json` containing metadata for all articles.

#### Scenario: Build generates index
- **WHEN** build process runs
- **THEN** script reads all `.md` files under `public/solutions/`
- **THEN** parses YAML frontmatter (title, date, category, summary) from each file
- **THEN** outputs `public/solutions/index.json` with array of article metadata objects

#### Scenario: Multi-level directory support
- **WHEN** md files exist in subdirectories (e.g., `public/solutions/ai/agent-info.md`)
- **THEN** index includes category derived from subdirectory name
- **THEN** slug is derived from filename without extension

### Requirement: Blog-style visual design
Solutions pages SHALL have professional blog-style typography and layout.

#### Scenario: List page aesthetics
- **WHEN** user views solutions list
- **THEN** cards have consistent spacing, shadows, hover effects
- **THEN** layout is responsive (single column on mobile, grid on desktop)

#### Scenario: Detail page typography
- **WHEN** user reads an article
- **THEN** content area has max-width for readability (~720px)
- **THEN** headings, paragraphs, code blocks, tables are styled with proper spacing
- **THEN** code blocks have syntax-appropriate monospace font and background

