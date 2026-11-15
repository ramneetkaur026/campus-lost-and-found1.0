# Campus Finds — Lost and Found Portal

Campus Finds is a static, browser-based campus lost and found board. Students can publish lost or found item listings, browse and filter the board, submit a claim, and update listing status. The application is designed as a basic syllabus edition and uses the browser's LocalStorage rather than a server.

## Objectives

- Provide a simple way to record lost and found items for a campus community.
- Make listings discoverable through search and combined filters.
- Capture item details and claimant information in a browser-only demonstration.
- Demonstrate semantic HTML, responsive CSS, vanilla JavaScript, and browser storage without a backend.

## Technology stack

- **HTML5** — document structure, navigation, listing form, and item details dialog
- **CSS3** — layout, visual presentation, keyboard focus indicators, and responsive breakpoints
- **Vanilla JavaScript** — listing creation, rendering, filtering, claims, status changes, and removal
- **Browser LocalStorage** — persistence for the current browser origin and device

No framework, package manager, external library, backend, Firebase service, database, or external dataset is required. The visual style uses system font fallbacks and does not load remote font files.

## Features

- Create Lost and Found listings with item name, category, location, date, details, and contact information
- View individual listing details
- Submit claims with a name, contact method, and identifying details
- Set a listing's status to Open, Claimed, or Resolved; a new claim changes an Open listing to Claimed
- Search by title, category, location, description, or poster name
- Combine search with Lost/Found, category, and location filters
- Sort listings by newest or oldest
- Remove listings
- Persist listings, claims, and status updates in LocalStorage
- Responsive layouts for desktop and narrow screens

The board displays sample listings when no saved data exists. See [Limitations and Future Scope](docs/07_Limitations_and_Future_Scope.md) for the limits of browser-only storage.

## Project structure

```text
Campus Finds/
├── index.html
├── styles.css
├── app.js
├── README.md
├── PROJECT_REPORT.md
└── docs/
    ├── 01_Project_Overview.md
    ├── 02_Requirements_Specification.md
    ├── 03_System_Architecture.md
    ├── 04_Feature_Documentation.md
    ├── 05_Testing_Report.md
    ├── 06_User_Manual.md
    ├── 07_Limitations_and_Future_Scope.md
    └── 08_Project_Conclusion.md
```

## Installation and local use

1. Clone or download the repository.
2. Open `index.html` in a modern browser. No build or dependency installation is needed.
3. Create a listing from **Report an item**. Use the board to search, filter, view details, manage status, submit a claim, or remove a listing.

If your browser restricts LocalStorage for `file://` pages, serve this folder with a static HTTP server and open its local address. No application-specific server is required.

## How LocalStorage works

The application saves its listing array under the key `campus-finds-listings-v1`. Listings, claims, and status updates are written in the browser where the page is open. Removing a listing removes it from that local array. The sample entries are used when no saved value is present. Clearing the browser's site data removes saved listings. LocalStorage does not synchronize data with another browser, device, or user.

Claims are therefore local records. The app does not deliver a claim to another person's device or provide account ownership or access control.

## GitHub Pages deployment

The project is a static site and its CSS and JavaScript references are relative (`styles.css` and `app.js`), so it can be served from a project repository subdirectory.

1. Commit `index.html`, `styles.css`, `app.js`, and the documentation to the repository's deployment branch.
2. In the repository on GitHub, open **Settings → Pages**.
3. Choose deployment from a branch, select the intended branch (for example, `main`) and the repository root (`/`), then save.
4. After GitHub Pages publishes the site, open the URL displayed in the Pages settings and verify the board and assets load.

These are preparation instructions only. This project has not been published or pushed as part of this work. LocalStorage remains per browser origin and does not become shared storage after deployment.

## Limitations

- No shared data service, account system, identity verification, or synchronization
- Claims and contact details remain on the browser that submitted or stored them
- No image uploads, moderation tools, notifications, or administrator role
- LocalStorage may be cleared by the user or browser and is not a backup

## Future enhancements

Potential future work includes a shared API with an appropriately scoped database, authentication and ownership controls, moderation, image attachments, notifications, and export or backup tools. These are outside the implemented basic edition.

## Team

- Ramneet Kaur
- Arman Mandair
- Komalpreet Kaur

No individual roles or biographies are assigned in this README.

## Project documentation

The detailed specification, architecture, feature guide, testing record, user manual, scope discussion, and conclusion are available in the [`docs/`](docs/) directory. The formal academic report is [PROJECT_REPORT.md](PROJECT_REPORT.md).
