# 3. System Architecture

## 3.1 Architecture summary

Campus Finds uses a static, client-side architecture. The browser loads `index.html`, applies `styles.css`, and runs `app.js`. The JavaScript manages the in-memory listing array and writes persistent changes to the browser's LocalStorage. There is no network API or server-side data layer.

```text
Browser
├── index.html — semantic page, forms, filters, and details dialog
├── styles.css — visual rules and responsive breakpoints
└── app.js — event handling and application logic
    ├── In-memory listings array
    └── LocalStorage key: campus-finds-listings-v1
```

## 3.2 Data model

A listing contains an identifier, a type (`lost` or `found`), title, category, location, date, optional description, poster name, contact text, status, claims array, and creation timestamp. Status values are `open`, `claimed`, and `resolved`. A claim contains an identifier, claimant name, contact text, message, and creation timestamp. Listings and their claims are serialized together as JSON.

## 3.3 Application flow

1. The browser parses the page and defers execution of `app.js` until the document is available.
2. The application reads and normalizes the LocalStorage record. If no value exists, it initializes the interface with in-memory sample listings.
3. `render()` rebuilds visible listing cards and updates category and location choices based on current data.
4. Form submissions and controls update the in-memory array, write it to LocalStorage, and refresh the board.
5. Item details are rendered into the native dialog; claims are stored on their corresponding listing.

## 3.4 Storage and error behavior

Reading and writing LocalStorage are wrapped in exception handling. If storage is unavailable, the app can still operate for the current page session and displays feedback when listing, claim, status, or removal changes cannot be persisted. Malformed or unusable saved data falls back to the sample listings. The application does not send listing data to a remote service.

## 3.5 Static deployment

The page references `styles.css` and `app.js` relative to `index.html`. Internal navigation uses same-page fragment identifiers. This permits hosting at a GitHub Pages repository subpath without hard-coded root URLs. A deployment still needs to be verified at its published address by the project owner.
