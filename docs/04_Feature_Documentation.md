# 4. Feature Documentation

## 4.1 Reporting an item

In the report form, choose **I lost something** or **I found something**. Enter an item name, category, location, date, poster name, and contact method. Additional identifying information is optional. Required fields and length limits are enforced through native HTML form validation.

## 4.2 Browsing and finding listings

The community board displays listing cards with item type, status, category, title, location, date, and poster information. Use the search field for text matching. Type, category, and location filters may be combined, and the sort control changes the chronological order. **Clear filters** returns the board to the default view.

## 4.3 Item details and claims

Choose **View details** on a card to open its dialog. The dialog displays the listing information and any previously stored claims. A claim can be submitted with a claimant name, contact method, and identifying details. When an Open item receives a claim, its status changes to Claimed.

Claims are stored only in the current browser. They are not delivered to the listing poster on another device.

## 4.4 Status management

Use the status selector on a card to choose Open, Claimed, or Resolved. A resolved listing does not accept additional claims through the interface. Changing a listing's status is persisted locally.

## 4.5 Removing a listing

Use **Remove** on a listing card to remove it from the current browser's stored board. Removal is immediate and there is no undo or trash feature.

## 4.6 Persistence

The application stores a JSON array under `campus-finds-listings-v1`. Data is local to the active browser and origin. Clearing browser site data removes it.
