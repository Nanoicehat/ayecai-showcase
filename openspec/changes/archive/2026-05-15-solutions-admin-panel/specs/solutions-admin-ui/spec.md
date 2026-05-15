## ADDED Requirements

### Requirement: Article list view
The system SHALL display a paginated list of all articles with search and category filter.

#### Scenario: View article list
- **WHEN** user navigates to the admin panel root
- **THEN** system displays article cards showing title, date, category, summary, and cover thumbnail, sorted by date descending

#### Scenario: Search articles
- **WHEN** user types in search box
- **THEN** list filters to articles whose title or summary contains the search text (client-side filter)

#### Scenario: Filter by category
- **WHEN** user selects a category from the sidebar tree
- **THEN** list shows only articles in that category (including subcategories)

#### Scenario: Delete article from list
- **WHEN** user clicks delete button on an article card and confirms in dialog
- **THEN** system calls DELETE API, removes article from list, shows success toast

### Requirement: Article editor
The system SHALL provide a form-based editor for creating and editing articles.

#### Scenario: Create new article
- **WHEN** user clicks "New Article" button
- **THEN** system shows editor with empty frontmatter form (title, date defaulting to today, category dropdown, summary) and empty Markdown textarea

#### Scenario: Edit existing article
- **WHEN** user clicks edit on an article
- **THEN** system loads article content, populates frontmatter form and Markdown textarea

#### Scenario: Save article
- **WHEN** user fills required fields (title, date, category, slug) and clicks save
- **THEN** system calls create/update API, shows success toast, navigates back to list

#### Scenario: Markdown preview
- **WHEN** user clicks preview toggle in editor
- **THEN** system renders Markdown content as HTML in a preview panel alongside the editor

### Requirement: Cover image management
The system SHALL allow uploading and removing cover images within the editor.

#### Scenario: Upload cover
- **WHEN** user drags or selects an image file in the cover upload area
- **THEN** system uploads via API, displays the new cover thumbnail in the editor

#### Scenario: Remove cover
- **WHEN** user clicks remove on an existing cover image
- **THEN** system calls delete cover API, shows default placeholder

### Requirement: Category management view
The system SHALL provide a dedicated view for managing category directories.

#### Scenario: View category tree
- **WHEN** user navigates to category management
- **THEN** system displays full category tree with article counts per node

#### Scenario: Create category
- **WHEN** user clicks "New Category", enters name and optional parent
- **THEN** system calls create API, adds new node to tree

#### Scenario: Rename category
- **WHEN** user clicks rename on a category, enters new name
- **THEN** system calls rename API, updates tree node

#### Scenario: Delete empty category
- **WHEN** user clicks delete on an empty category and confirms
- **THEN** system calls delete API, removes node from tree

#### Scenario: Prevent deleting non-empty category
- **WHEN** user tries to delete a category that contains articles
- **THEN** system shows warning that articles must be moved or deleted first

### Requirement: Navigation layout
The system SHALL provide a sidebar navigation with main sections.

#### Scenario: Navigate between views
- **WHEN** user clicks sidebar items
- **THEN** system navigates between Articles list, Category management views

### Requirement: Status feedback
The system SHALL provide visual feedback for all operations.

#### Scenario: Loading state
- **WHEN** any API call is in progress
- **THEN** system shows loading indicator

#### Scenario: Error handling
- **WHEN** API call fails
- **THEN** system shows error toast with message from API response

#### Scenario: Success feedback
- **WHEN** operation completes successfully
- **THEN** system shows brief success toast
