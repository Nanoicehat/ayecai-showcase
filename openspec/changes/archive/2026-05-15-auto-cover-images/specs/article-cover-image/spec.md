## MODIFIED Requirements

### Requirement: Articles support cover image via frontmatter
Articles SHALL automatically use a same-name image file in the same directory as the cover image. The system SHALL check for files with extensions `.jpg`, `.jpeg`, `.png`, `.svg`, `.webp` matching the article slug. Manual `cover` frontmatter field is no longer required.

#### Scenario: Article with same-name image
- **WHEN** article `Agent信息收集.md` exists alongside `Agent信息收集.jpg`
- **THEN** build script detects the image and sets cover to its public path

#### Scenario: Article without same-name image
- **WHEN** no same-name image file exists in the article's directory
- **THEN** index.json cover field is empty string

### Requirement: Cards without cover show default landscape images
When an article has no cover image, the card SHALL display a default landscape photo selected deterministically from a set of pre-downloaded images.

#### Scenario: Default image selection is stable
- **WHEN** article has no cover image
- **THEN** frontend selects a default image based on slug hash
- **THEN** same article always shows the same default image across page loads

#### Scenario: Default images provide variety
- **WHEN** multiple articles lack cover images
- **THEN** different articles MAY show different default landscape images from the preset collection
