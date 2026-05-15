## MODIFIED Requirements

### Requirement: Solutions list page displays articles
The system SHALL display a list of solution articles in a two-column layout: directory tree on the left, article cards on the right. The article list supports filtering by selected category.

#### Scenario: User visits solutions page
- **WHEN** user navigates to `/#/solutions`
- **THEN** page displays sidebar with directory tree on the left
- **THEN** page displays article cards on the right
- **THEN** articles are sorted by date descending (newest first)

#### Scenario: Filtered by category
- **WHEN** a category folder is selected in the sidebar
- **THEN** only articles matching that category (including subcategories) are displayed
- **THEN** article count or category name is shown as filter indicator
