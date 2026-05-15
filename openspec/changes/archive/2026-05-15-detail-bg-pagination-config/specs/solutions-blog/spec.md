## MODIFIED Requirements

### Requirement: Solutions list page displays articles
The system SHALL display article cards with pagination. Page size and columns per row SHALL be configurable via a config file. Columns MUST be between 2 (minimum) and 3 (maximum).

#### Scenario: Paginated article list
- **WHEN** articles exceed configured page size
- **THEN** only current page articles are displayed
- **THEN** pagination controls (prev/next, page indicator) are shown

#### Scenario: Configuration controls layout
- **WHEN** config specifies columns=3 and pageSize=6
- **THEN** grid displays up to 3 cards per row on desktop
- **THEN** each page shows at most 6 articles
