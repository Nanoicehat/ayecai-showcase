## ADDED Requirements

### Requirement: Project card shows showcase site info
The creative-portfolio project card SHALL display the showcase site's own title "阿椰菜补丁铺" and a description introducing the site as a personal open-source project showcase and technical solutions hub.

#### Scenario: Home page card renders with new title
- **WHEN** user visits the home page
- **THEN** the creative-portfolio card title is "阿椰菜补丁铺"
- **THEN** the card description is the showcase site introduction

### Requirement: Project detail page shows site introduction
The project detail page (/project/creative-portfolio) SHALL display "阿椰菜补丁铺" as the page title and the showcase site introduction as the description.

#### Scenario: Detail page header renders correctly
- **WHEN** user navigates to /project/creative-portfolio
- **THEN** the page header title is "阿椰菜补丁铺"
- **THEN** the page header description introduces the showcase site

### Requirement: GitHub link points to showcase repository
The GitHub button on the project detail page SHALL link to `https://Nanoicehat.github.io/ayecai-showcase/`.

#### Scenario: GitHub button links to correct repo
- **WHEN** user views the creative-portfolio detail page
- **THEN** the GitHub button navigates to `https://Nanoicehat.github.io/ayecai-showcase/`
