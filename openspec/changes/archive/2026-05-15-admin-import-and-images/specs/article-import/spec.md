## ADDED Requirements

### Requirement: Import article API endpoint
The system SHALL provide POST /api/articles/import endpoint that accepts a multipart form with md file, image files, and category field.

#### Scenario: Import md with images
- **WHEN** client sends POST /api/articles/import with a .md file, 2 image files, and category "ai"
- **THEN** system creates md file at public/solutions/ai/<slug>.md, creates assets directory at public/solutions/ai/assets/<slug>/, copies images there, rewrites image paths in md, adds frontmatter if missing, triggers index regeneration, returns 201 with article path

#### Scenario: Import md without images
- **WHEN** client sends POST /api/articles/import with only a .md file and category
- **THEN** system creates md file at target location, adds frontmatter if missing, triggers index regeneration, returns 201

#### Scenario: Import md that already has frontmatter
- **WHEN** client sends POST /api/articles/import with a .md file that already contains YAML frontmatter
- **THEN** system preserves existing frontmatter, only adds missing required fields (date if absent, category from form)

#### Scenario: Import md without frontmatter
- **WHEN** client sends POST /api/articles/import with a .md file that has no frontmatter
- **THEN** system generates frontmatter with title from filename (without .md), date as today, category from form field, and empty summary

#### Scenario: Import duplicate slug
- **WHEN** client sends POST /api/articles/import with a file whose slug already exists in the target category
- **THEN** system returns 409 conflict error

#### Scenario: Image path rewriting
- **WHEN** md file contains `![](assets/foo-1.png)` and image file `foo-1.png` is uploaded
- **THEN** system rewrites path to `assets/<slug>/foo-1.png` in the stored md and places image at public/solutions/<category>/assets/<slug>/foo-1.png

#### Scenario: Unmatched image references
- **WHEN** md references `![](assets/missing.png)` but no matching file is uploaded
- **THEN** system keeps the original path unchanged and includes a warning in the response

### Requirement: Import dialog in admin UI
The system SHALL provide an import dialog accessible from the article list page.

#### Scenario: Open import dialog
- **WHEN** user clicks "导入文章" button on the article list page
- **THEN** system shows a dialog with file inputs for md file and images, a category selector, and import button

#### Scenario: Select md file
- **WHEN** user selects a .md file in the dialog
- **THEN** system shows the filename and auto-fills slug from filename

#### Scenario: Select image files
- **WHEN** user selects multiple image files
- **THEN** system shows list of selected images with filenames

#### Scenario: Execute import
- **WHEN** user selects md file, optionally images, selects category, and clicks import
- **THEN** system sends multipart request to import API, shows success toast on completion, refreshes article list

#### Scenario: Import with warnings
- **WHEN** import succeeds but response contains warnings about unmatched images
- **THEN** system shows success toast with warning details

### Requirement: Remove create article functionality
The system SHALL NOT provide a "new article" button or creation form. Only import and edit are available.

#### Scenario: Article list shows import button only
- **WHEN** user views the article list page
- **THEN** page shows "导入文章" button instead of "新建文章" button

### Requirement: Navigation icon update
The admin navigation SHALL display 🚗 icon for the articles section.

#### Scenario: Navigation displays car icon
- **WHEN** user views the admin sidebar
- **THEN** articles nav item shows 🚗 icon instead of 📝
