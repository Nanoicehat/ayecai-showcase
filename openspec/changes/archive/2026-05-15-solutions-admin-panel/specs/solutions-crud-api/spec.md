## ADDED Requirements

### Requirement: List articles
The system SHALL provide GET /api/articles endpoint that returns all articles with metadata (title, date, category, summary, slug, path, cover).

#### Scenario: List all articles
- **WHEN** client sends GET /api/articles
- **THEN** system returns JSON array of all articles sorted by date descending, each containing title, date, category, summary, slug, path, cover fields

#### Scenario: Filter by category
- **WHEN** client sends GET /api/articles?category=ai
- **THEN** system returns only articles whose category matches or starts with "ai"

### Requirement: Get single article
The system SHALL provide GET /api/articles/:path endpoint that returns article content and metadata.

#### Scenario: Get existing article
- **WHEN** client sends GET /api/articles/ai/Agent信息收集
- **THEN** system returns JSON with frontmatter fields plus raw markdown content body

#### Scenario: Get non-existent article
- **WHEN** client sends GET /api/articles/nonexistent/path
- **THEN** system returns 404 status with error message

### Requirement: Create article
The system SHALL provide POST /api/articles endpoint to create new markdown articles.

#### Scenario: Create article with valid data
- **WHEN** client sends POST /api/articles with body { category: "ai", slug: "new-article", title: "标题", date: "2026-05-15", summary: "摘要", content: "正文内容" }
- **THEN** system creates file at public/solutions/ai/new-article.md with proper frontmatter and content, triggers index regeneration, returns 201

#### Scenario: Create article in new category
- **WHEN** client sends POST /api/articles with category "newcat/subcat" that does not exist
- **THEN** system creates the directory recursively, then creates the article file

#### Scenario: Create article with duplicate slug
- **WHEN** client sends POST /api/articles with slug that already exists in same category
- **THEN** system returns 409 conflict error

### Requirement: Update article
The system SHALL provide PUT /api/articles/:path endpoint to update existing articles.

#### Scenario: Update content and metadata
- **WHEN** client sends PUT /api/articles/ai/Agent信息收集 with updated title, summary, and content
- **THEN** system rewrites the markdown file with updated frontmatter and content, triggers index regeneration, returns 200

#### Scenario: Update non-existent article
- **WHEN** client sends PUT /api/articles/nonexistent/path
- **THEN** system returns 404 error

### Requirement: Delete article
The system SHALL provide DELETE /api/articles/:path endpoint to remove articles.

#### Scenario: Delete existing article
- **WHEN** client sends DELETE /api/articles/ai/Agent信息收集
- **THEN** system deletes the .md file and associated cover image (if exists), triggers index regeneration, returns 200

#### Scenario: Delete non-existent article
- **WHEN** client sends DELETE /api/articles/nonexistent/path
- **THEN** system returns 404 error

### Requirement: Upload cover image
The system SHALL provide POST /api/articles/:path/cover endpoint to upload cover images.

#### Scenario: Upload cover image
- **WHEN** client sends POST /api/articles/ai/Agent信息收集/cover with multipart file (jpg/png/svg/webp)
- **THEN** system saves file as public/solutions/ai/Agent信息收集.{ext}, removes any previous cover with different extension, triggers index regeneration, returns 200

#### Scenario: Upload invalid file type
- **WHEN** client sends POST /api/articles/:path/cover with unsupported file type (e.g., .gif, .bmp)
- **THEN** system returns 400 error with message about supported formats

### Requirement: Delete cover image
The system SHALL provide DELETE /api/articles/:path/cover endpoint to remove cover images.

#### Scenario: Delete cover image
- **WHEN** client sends DELETE /api/articles/ai/Agent信息收集/cover
- **THEN** system deletes the cover image file, triggers index regeneration, returns 200

### Requirement: List categories
The system SHALL provide GET /api/categories endpoint returning the directory tree structure.

#### Scenario: List all categories
- **WHEN** client sends GET /api/categories
- **THEN** system returns nested JSON tree of categories with article counts per category

### Requirement: Create category
The system SHALL provide POST /api/categories endpoint to create new category directories.

#### Scenario: Create category
- **WHEN** client sends POST /api/categories with { path: "backend/database" }
- **THEN** system creates directory at public/solutions/backend/database/, returns 201

#### Scenario: Create existing category
- **WHEN** client sends POST /api/categories with path that already exists
- **THEN** system returns 409 conflict

### Requirement: Delete category
The system SHALL provide DELETE /api/categories/:path endpoint to remove empty categories.

#### Scenario: Delete empty category
- **WHEN** client sends DELETE /api/categories/empty-dir
- **THEN** system removes the directory, returns 200

#### Scenario: Delete non-empty category
- **WHEN** client sends DELETE /api/categories/ai (which contains articles)
- **THEN** system returns 400 error with message that category must be empty before deletion

### Requirement: Rename category
The system SHALL provide PATCH /api/categories/:path endpoint to rename categories.

#### Scenario: Rename category
- **WHEN** client sends PATCH /api/categories/oldname with { newName: "newname" }
- **THEN** system renames directory, updates all contained articles' category frontmatter, triggers index regeneration, returns 200

### Requirement: Trigger index regeneration
The system SHALL provide POST /api/regenerate-index endpoint to manually trigger index.json regeneration.

#### Scenario: Regenerate index
- **WHEN** client sends POST /api/regenerate-index
- **THEN** system executes generate-solutions-index.ts script, returns 200 with article count

### Requirement: Server startup validation
The system SHALL validate that the showcase public/solutions directory exists at startup.

#### Scenario: Valid path
- **WHEN** admin server starts and ../public/solutions/ exists
- **THEN** server starts normally on port 4000

#### Scenario: Invalid path
- **WHEN** admin server starts and ../public/solutions/ does not exist
- **THEN** server exits with clear error message about incorrect directory structure
