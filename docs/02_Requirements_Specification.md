# 2. Requirements Specification

## 2.1 Scope

This specification describes the implemented Basic Syllabus Edition. It is a single-page static application with client-side state and LocalStorage persistence. It does not describe a multi-user service.

## 2.2 Functional requirements

| ID | Requirement | Implementation |
|---|---|---|
| FR-01 | Create a Lost or Found listing | Type radio controls and a validated listing form |
| FR-02 | Record listing name, category, location, date, optional description, poster name, and contact | Listing form fields and item record |
| FR-03 | Browse available listings | Listing board with sample entries for an empty browser store |
| FR-04 | Search listings | Keyword match across title, category, location, description, and poster name |
| FR-05 | Filter by type, category, and location | Type buttons and category/location select controls; filters combine with search |
| FR-06 | Sort listings | Newest-first and oldest-first options |
| FR-07 | Inspect an individual listing | Native HTML dialog containing item information and claims |
| FR-08 | Submit a claim | Claim form with name, contact, and identifying details; claim becomes visible in item details |
| FR-09 | Manage status | Per-listing Open, Claimed, and Resolved selection; a new claim changes Open to Claimed |
| FR-10 | Remove a listing | Remove control on each listing card |
| FR-11 | Persist application data | Listing records, embedded claims, and statuses saved as JSON in LocalStorage |

## 2.3 Non-functional requirements

- Use only HTML5, CSS3, vanilla JavaScript, and browser LocalStorage.
- Require no build step, package manager, backend, database, or external library.
- Provide responsive layout rules for desktop and narrow screens.
- Use semantic regions, associated labels, native form validation, and visible keyboard focus indicators.
- Escape user-entered text before inserting it into generated HTML.
- Work as a static site with relative references to the stylesheet and script.

## 2.4 Constraints and assumptions

- LocalStorage availability and capacity depend on the browser and origin.
- A single browser store represents one local copy of the board.
- No authentication, authorization, moderation, or cross-device synchronization is provided.
- The project owner stated that the application was manually tested and is working correctly. Individual test case records were not supplied.
