## ADDED Requirements

### Requirement: Solutions list page displays articles
The system SHALL display a list of solution articles loaded from a static index file, styled as blog post cards.

#### Scenario: User visits solutions page
- **WHEN** user navigates to `/#/solutions`
- **THEN** page displays article cards with title, date, category, and summary
- **THEN** articles are sorted by date descending (newest first)

#### Scenario: Articles grouped by category
- **WHEN** solutions index contains articles from multiple categories
- **THEN** articles MAY be visually grouped or tagged by category

### Requirement: Article cards are clickable
Each article card SHALL link to the full article detail page.

#### Scenario: Click article card
- **WHEN** user clicks an article card
- **THEN** router navigates to `/#/solutions/:category/:slug`
- **THEN** article detail page is displayed

### Requirement: Article detail page renders markdown
The system SHALL fetch the markdown file and render it as formatted HTML with proper typography.

#### Scenario: View article content
- **WHEN** user navigates to `/#/solutions/:category/:slug`
- **THEN** system fetches `solutions/:category/:slug.md` from public directory
- **THEN** markdown content is rendered as HTML with GFM table support
- **THEN** page displays article title, date, and category as header metadata

#### Scenario: Article not found
- **WHEN** user navigates to a non-existent article path
- **THEN** system displays a friendly error message with link back to solutions list

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
