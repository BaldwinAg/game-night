# Firebase Setup Guide for Game Night Scorekeeper

## Version 5.0.0
## Last Updated: January 2025

---

## Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com)

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** (or "Create a project")
3. Enter project name: `game-night-scorekeeper` (or your preferred name)
4. **Google Analytics**: You can disable this (not needed for this app)
5. Click **"Create project"**
6. Wait for project creation, then click **"Continue"**

---

## Step 2: Enable Google Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Google"**
5. Toggle **"Enable"** to ON
6. Select your email as the **Project support email**
7. Click **"Save"**

✅ Google Sign-In is now enabled!

---

## Step 3: Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules later)
4. Select a **Cloud Firestore location** closest to you:
   - `us-central` for central US
   - `us-east1` for eastern US
   - `europe-west` for Europe
5. Click **"Enable"**

✅ Firestore Database is ready!

---

## Step 4: Register Your Web App

1. Go to **Project Settings** (click the gear icon ⚙️ next to "Project Overview")
2. Scroll down to **"Your apps"** section
3. Click the web icon **`</>`**
4. Enter app nickname: `Game Night Web`
5. ❌ Do NOT check "Firebase Hosting" (optional for later)
6. Click **"Register app"**
7. You'll see a code block with `firebaseConfig` - **COPY THIS!**

The config looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB.....................",
  authDomain: "game-night-scorekeeper.firebaseapp.com",
  projectId: "game-night-scorekeeper",
  storageBucket: "game-night-scorekeeper.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

---

## Step 5: Add Config to Your App

1. Open `firebase-config.js` in your game files folder
2. Replace the placeholder config with YOUR config from Step 4
3. Save the file

Example `firebase-config.js`:
```javascript
// Firebase Configuration for Game Night Scorekeeper
// Generated from: https://console.firebase.google.com
// Project: game-night-scorekeeper

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Export for use in app
window.FIREBASE_CONFIG = firebaseConfig;
```

---

## Step 6: Configure Authorized Domains

If hosting somewhere other than localhost:

1. Go to **Authentication** → **Settings**
2. Click **"Authorized domains"** tab
3. Click **"Add domain"**
4. Add your hosting domain (e.g., `yourdomain.com` or `username.github.io`)

**Note:** `localhost` is already authorized for local testing.

---

## Step 7: Set Up Security Rules (Important!)

Once your app is working, update Firestore security rules:

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == oderId;
    }
    
    // Groups: members can read, only owner can write settings
    match /groups/{groupId} {
      allow read: if request.auth != null && 
        request.auth.uid in resource.data.memberIds;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.ownerId;
    }
    
    // Matches: group members can read and create
    match /matches/{matchId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.recordedBy;
    }
    
    // Leaderboards: anyone authenticated can read, system writes
    match /leaderboards/{groupId}/games/{gameType} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 8: Test Your Setup

1. Open your app in a browser
2. Click **"Sign In with Google"**
3. Select your Google account
4. You should see your name/avatar appear
5. Create a test group
6. Play a game and record the result

---

## Troubleshooting

### "Firebase is not defined"
- Make sure `firebase-config.js` is included before the main app script
- Check that the Firebase SDK scripts are loading (check browser console)

### "Auth domain not authorized"
- Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### "Permission denied" errors
- Check that you're signed in
- Review Firestore security rules
- Make sure the user is a member of the group they're trying to access

### Google Sign-In popup blocked
- Allow popups for your site
- Or use redirect method instead of popup

---

## Optional: Firebase Hosting

To host your app on Firebase (free!):

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Select your project
5. Set public directory to your app folder
6. Configure as single-page app: **Yes**
7. Deploy: `firebase deploy`

Your app will be live at: `https://your-project.web.app`

---

## File Checklist

After setup, your folder should contain:

```
/games/
├── index.html           ✅ Main app (v5.x.x)
├── firebase-config.js   ✅ YOUR Firebase config
├── sw.js                ✅ Service worker
├── manifest.json        ✅ PWA manifest
├── icon-192.png         ✅ App icon
├── icon-512.png         ✅ Large app icon
├── FIREBASE_SETUP.md    📖 This guide
├── ROADMAP.md           📖 Development roadmap
└── CHANGELOG.md         📖 Version history
```

---

## Security Notes

⚠️ **Never commit `firebase-config.js` with real keys to public repos!**

The API key in Firebase web config is designed to be public (it's restricted by domain), but it's still good practice to:

1. Add `firebase-config.js` to `.gitignore`
2. Use environment variables in production
3. Keep security rules strict

---

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guides](https://firebase.google.com/docs/firestore)
- [Authentication Guides](https://firebase.google.com/docs/auth)

---

*Guide Version: 1.0 | App Version: 5.0.0*
