# Firebase Products 1

An early exercise that has now been upgraded into a more portfolio-ready Firebase example. The page signs users in anonymously, reads protected product data from Firebase Realtime Database, and presents the result in the browser.

## Focus

- request remote data with `fetch`
- interpret JSON from Firebase
- render simple product data in the DOM

## Portfolio upgrade

- Firebase Web SDK with the modular API
- anonymous authentication for browser visitors
- protected Realtime Database reads instead of a fully public endpoint
- clearer UI feedback for auth state, rules, and setup status

## Firebase setup needed for live data

1. Add the real Firebase web app config to `firebase-config.js`.
2. Enable Anonymous sign-in in Firebase Authentication.
3. Store the products under `/products` or update the configured path.
4. Use rules like:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "products": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```
