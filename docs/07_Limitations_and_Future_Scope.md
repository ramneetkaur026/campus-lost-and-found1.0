# 7. Limitations and Future Scope

## 7.1 Current limitations

- **Local-only data:** LocalStorage is scoped to a browser profile and origin. Listings do not synchronize across people, devices, or browsers.
- **Claims are not delivered:** A claim is visible in the browser where it was submitted. The listing poster receives no notification or remote message.
- **No identity or ownership controls:** The application has no sign-in, role management, verification, or moderation. Anyone using the same local board can change statuses or remove listings.
- **No recovery or backup:** Removing an item or clearing browser site data can permanently remove the local copy.
- **No media or notifications:** Image attachments, email/SMS notifications, and push updates are not implemented.
- **Browser dependency:** Storage behavior and capacity are subject to browser settings and support.
- **Limited test evidence:** The project owner confirmed manual testing, but detailed case results were not supplied. This finalization pass did not complete browser interaction or deployment checks.

## 7.2 Future scope

If the project later expands beyond the approved basic edition, possible additions include:

- A shared service and database for multi-user synchronization
- Authentication, ownership, and moderation controls
- Notifications to listing owners about claims
- Optional item photos with appropriate storage and validation
- Export, backup, and recovery tools
- A documented automated test suite and deployment smoke test

These are proposals only and are not present in the current application. Any server-side expansion would require a separate scope decision and review of privacy and security requirements.
