# solutions-sidebar Specification

## Purpose
TBD - created by archiving change add-solutions-sidebar. Update Purpose after archive.
## Requirements
### Requirement: Directory tree displays folder structure
The sidebar SHALL display a tree of all category folders derived from the articles index, reflecting the multi-level directory structure.

#### Scenario: Tree shows all categories
- **WHEN** solutions page loads with articles from categories "ai", "ai/frameworks", "devops", "frontend", "backend/database"
- **THEN** tree displays root folders: ai, devops, frontend, backend
- **THEN** ai node has child: frameworks
- **THEN** backend node has child: database

### Requirement: Tree nodes are expanded by default
All tree nodes SHALL be expanded when the page first loads.

#### Scenario: Initial state
- **WHEN** user navigates to solutions page
- **THEN** all folder nodes are expanded showing their children

### Requirement: Tree nodes can be collapsed and expanded
Each folder node with children SHALL have a toggle control to collapse/expand its children.

#### Scenario: Collapse a folder
- **WHEN** user clicks the toggle arrow on "ai" folder
- **THEN** "ai" children (frameworks) are hidden
- **THEN** toggle arrow rotates to indicate collapsed state

#### Scenario: Expand a collapsed folder
- **WHEN** user clicks the toggle arrow on a collapsed folder
- **THEN** children become visible again

### Requirement: Clicking folder filters article list
Clicking a folder name SHALL filter the article list to show only articles in that category and its subcategories.

#### Scenario: Filter by top-level category
- **WHEN** user clicks "ai" folder name
- **THEN** right side shows articles with category "ai" and "ai/frameworks"
- **THEN** "ai" folder appears visually selected/highlighted

#### Scenario: Filter by nested category
- **WHEN** user clicks "frameworks" (under ai)
- **THEN** right side shows only articles with category "ai/frameworks"

#### Scenario: Show all articles
- **WHEN** user clicks "全部" root item (or deselects current folder)
- **THEN** right side shows all articles unfiltered

### Requirement: Mobile responsive behavior
On mobile viewport, the sidebar SHALL be hidden by default with a toggle button to show/hide it.

#### Scenario: Mobile initial state
- **WHEN** viewport width is below 768px
- **THEN** sidebar is hidden
- **THEN** a folder icon button is visible to toggle sidebar

