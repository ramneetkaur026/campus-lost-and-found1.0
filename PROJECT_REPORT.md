# Campus Finds — Lost and Found Portal
## Academic Project Report

- **Edition:** Basic Syllabus Edition
- **Team:** Ramneet Kaur, Arman Mandair, Komalpreet Kaur

## 1. Introduction

Campus Finds is a static web application for campus lost and found listings. Users can report lost or found belongings, search and filter listings, view item details, submit a claim, and manage status. The implementation uses HTML5, CSS3, vanilla JavaScript, and browser LocalStorage.

## 2. Problem Statement

When information about misplaced belongings is scattered or informal, people may not know where to report an item or how to discover whether it has been found. The project provides a focused board where listing information can be recorded and browsed. In this basic edition, the board is local to one browser and therefore does not solve cross-user synchronization.

## 3. Objectives

- Provide separate Lost and Found reporting choices.
- Capture concise item, location, date, and contact details.
- Support browsing, keyword search, type/category/location filtering, and sorting.
- Provide an individual item view and a basic claim form.
- Allow status management and listing removal.
- Demonstrate browser persistence without external libraries or a backend.

## 4. Scope

The system is a single-page static site. Its scope includes browser-side listing creation, rendering, search and filtering, item details, claim capture, status changes, removal, and LocalStorage persistence. It excludes accounts, a shared data service, notifications, moderation, image uploads, and multi-device synchronization.

## 5. Technology Stack

| Technology | Use |
|---|---|
| HTML5 | Semantic page regions, forms, native controls, and the item details dialog |
| CSS3 | Layout, visual styling, focus indicators, and responsive breakpoints |
| Vanilla JavaScript | User interactions, application state, rendering, validation integration, and storage |
| Browser LocalStorage | Local JSON persistence under `campus-finds-listings-v1` |

No framework, external library, Firebase, backend, database, or external dataset is used.

## 6. Requirement Analysis

The implemented functional requirements are Lost/Found listing submission; recording a listing's title, category, location, date, optional description, poster name, and contact; board display; keyword search; combined type/category/location filters; sorting; item details; claims; Open/Claimed/Resolved statuses; and listing removal. Core non-functional requirements include a no-build static site, responsive layout rules, native form validation, keyboard focus indication, and escaped rendering of user-entered text.

## 7. System Architecture

The browser loads `index.html`, which references `styles.css` and deferred `app.js` using relative paths. The script reads listing data from LocalStorage, normalizes recognized listing records, and maintains an in-memory array during the session. Rendering derives visible cards and filter options from that array. Mutations update the array and attempt to serialize it back to LocalStorage. No remote request or server-side component is part of the application architecture.

## 8. Module Description

### 8.1 Presentation module

`index.html` contains navigation, the community board, filters, the report form, and the item details/claim dialog.

### 8.2 Styling module

`styles.css` defines the visual system and layouts, including responsive rules at narrower widths and visible focus treatment for interactive elements.

### 8.3 Listing and storage module

`app.js` reads, normalizes, renders, filters, sorts, adds, updates, and removes listing records. Listings and their claims are saved together in a LocalStorage JSON array.

### 8.4 Claim and status module

The details dialog displays listing data and stored claims. A submitted claim is added to its listing; an Open listing becomes Claimed. The listing card's status selector can set Open, Claimed, or Resolved.

## 9. Implementation

The app attaches event listeners to the listing form, claim form, filters, sort selector, and listing grid. Native browser validation is invoked before forms are processed. Dynamic user content is escaped before it is inserted as HTML. Category choices are based on the supported categories plus values present in stored listings; location options are derived from current listings. LocalStorage read/write operations are guarded with exception handling. If storage cannot be written, current-page interaction can continue but changes are not durable.

## 10. Testing

The project owner states that the application was manually tested and works correctly. Specific cases, browsers, viewport sizes, and evidence were not supplied. During finalization, `node --check app.js` passed, and `git diff --check` passed. These are source checks, not functional tests.

Browser-driven form, filter, claim, status, removal, persistence, responsive, console, and published Pages checks were not performed during this finalization pass. Browser navigation for local testing was blocked by the tool's URL policy. The detailed evidence and distinctions appear in [the Testing Report](docs/05_Testing_Report.md).

## 11. Results

The resulting codebase provides a dependency-free local lost and found board with the features listed in the requirements analysis. The owner reports successful manual use. The agent independently confirmed only syntax validity and clean Git diff whitespace; no runtime result is claimed from those checks.

## 12. Limitations

Data remains within the browser's LocalStorage and is not shared. Claims are not delivered to other users. The app has no sign-in, ownership checks, moderation, notifications, attachments, or recovery after removal/storage clearing. A local user can manage all records in that browser's board.

## 13. Future Scope

Possible future work includes a shared API and data store, user authentication and ownership controls, moderation, owner notifications, optional image support, data export/recovery, and automated browser tests. These changes would require a new scope and privacy/security design; they are not part of this implementation.

## 14. Conclusion

Campus Finds demonstrates how a small interactive web application can be built using foundational browser technologies and local persistence. It fulfills the documented basic client-side workflow while maintaining a clear boundary between a local demonstration and a shared production service. The project is prepared for static hosting, including GitHub Pages, but publication and live-path verification remain deployment-owner steps.
