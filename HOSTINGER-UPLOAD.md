# 🚀 Hostinger Upload Guide - CRITICAL STEPS

## ❗ IMPORTANT: Your Sign-In Button Won't Show Without firebase-config.js

The console error you're seeing:
```
firebase-config.js:1  Failed to load resource: the server responded with a status of 404 ()
[Firebase] Config not found - running in local-only mode
```

**This means firebase-config.js is NOT on your server!**

---

## 📤 Step 1: Upload ALL Files to Hostinger

You need to upload **ALL 6 FILES** to the `/public_html/test/` directory:

### Files to Upload:

```
✅ index.html           (The main app - MUST UPLOAD)
✅ firebase-config.js   (Firebase credentials - CRITICAL FOR SIGN-IN!)
✅ sw.js                (Service worker - MUST UPLOAD)
✅ manifest.json        (PWA manifest)
✅ icon-192.png         (App icon)
✅ icon-512.png         (App icon)
```

### How to Upload via Hostinger File Manager:

1. **Log into Hostinger**
   - Go to your Hostinger control panel
   - Click "File Manager"

2. **Navigate to Your Directory**
   - Click on `public_html` folder
   - Click on `test` folder (or create it if it doesn't exist)

3. **Delete Old Files (if they exist)**
   - Select `index.html` → Delete
   - Select `sw.js` → Delete
   - This ensures fresh copies are uploaded

4. **Upload New Files**
   - Click "Upload" button (top right)
   - **Drag ALL 6 FILES from your local `/home/abaldwinfarms/game-night/` folder**
   - OR click "Select Files" and choose all 6 files
   - Wait for upload to complete (look for 100%)

5. **Verify Upload**
   - You should see all 6 files in the `/public_html/test/` directory
   - Check that `firebase-config.js` is there!

### Expected File List in `/public_html/test/`:
```
firebase-config.js     624 bytes
icon-192.png          1114 bytes
icon-512.png          3285 bytes
index.html              ~70 KB
manifest.json          575 bytes
sw.js                 ~3 KB
```

---

## 🔥 Step 2: Configure Firebase Console

**Even with firebase-config.js uploaded, sign-in will fail unless you authorize your domain!**

### Steps:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Sign in with your Google account

2. **Select Your Project**
   - Click: `game-night-9580e`

3. **Go to Authentication**
   - Left sidebar: Click **"Authentication"**
   - Top tabs: Click **"Settings"**

4. **Add Authorized Domain**
   - Scroll down to **"Authorized domains"** section
   - Click **"Add domain"**
   - Type: `baldwinag.com` (WITHOUT the /test part!)
   - Click **"Add"**

5. **Wait**
   - Changes take 1-2 minutes to propagate
   - Don't test immediately

### What You Should See:

```
Authorized domains:
✅ localhost              (already there)
✅ baldwinag.com          (you add this)
```

---

## 🧪 Step 3: Test Your Deployment

### Visit Your Site:
- URL: `https://baldwinag.com/test/`

### What You Should See:

**TOP RIGHT CORNER:**
- If Firebase configured correctly: **"🔐 Sign In with Google" button**
- If Firebase missing: Nothing (means local-only mode)

### Test Checklist:

1. **Page loads without errors**
   - Open browser DevTools (F12)
   - Check Console tab
   - Should NOT see: "firebase-config.js 404"

2. **Emojis display correctly**
   - Game icons: 🃏🎲🔟🎯♠️🛤️
   - Trophy emoji on "Wins Leaderboard" button: 🏆
   - No boxes or question marks

3. **Sign-In button appears**
   - Look top-right corner
   - Should see: "🔐 Sign In with Google"
   - If missing, check console for errors

4. **Click Sign-In**
   - Click the sign-in button
   - Google popup should appear
   - Choose your Google account
   - Should redirect back to app
   - Your name and avatar should appear top-right

5. **Sign-Out works**
   - Click "Sign Out" button
   - Should return to unsigned state
   - Sign-in button reappears

---

## 🐛 Troubleshooting

### Problem: "firebase-config.js 404" Error

**Cause:** File not uploaded or wrong location

**Solution:**
1. Check File Manager: Is `firebase-config.js` in `/public_html/test/`?
2. If missing, upload it again
3. Check filename: Should be exactly `firebase-config.js` (no spaces, no capital letters)
4. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### Problem: Sign-In Button Not Showing

**Cause 1:** firebase-config.js missing (see above)

**Cause 2:** firebase-config.js has wrong content

**Solution:**
1. Download `firebase-config.js` from server
2. Open it in text editor
3. Check it contains:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD8ZPchy5j0Qg2FTZVXq-yiHkHZuIqFMqo",
  authDomain: "game-night-9580e.firebaseapp.com",
  projectId: "game-night-9580e",
  storageBucket: "game-night-9580e.firebasestorage.app",
  messagingSenderId: "527974081115",
  appId: "1:527974081115:web:b766c983c40ad03f5b557e"
};
window.FIREBASE_CONFIG = firebaseConfig;
window.FIREBASE_CONFIGURED = true;
```
4. If different or empty, re-upload from your local copy

---

### Problem: Sign-In Fails with "unauthorized domain" Error

**Cause:** Domain not added to Firebase Console

**Solution:**
1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Click "Add domain"
3. Add: `baldwinag.com`
4. Wait 2 minutes
5. Try again

---

### Problem: Service Worker Errors (chrome-extension)

**Error in console:**
```
TypeError: Failed to execute 'put' on 'Cache': Request scheme 'chrome-extension' is unsupported
```

**Cause:** Browser extensions trying to cache themselves (NOT YOUR FAULT!)

**Solution:** Ignore these errors - they're harmless and don't affect your app

---

### Problem: Emojis Still Broken

**Cause:** Old cached version

**Solution:**
1. Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
2. Or: Open DevTools → Application → Service Workers → Unregister
3. Then refresh page

---

## ✅ Success Checklist

After following all steps, verify:

- [ ] All 6 files uploaded to `/public_html/test/`
- [ ] `firebase-config.js` shows 624 bytes in File Manager
- [ ] Domain `baldwinag.com` added to Firebase authorized domains
- [ ] Visited `https://baldwinag.com/test/` - page loads
- [ ] No "firebase-config.js 404" error in console
- [ ] Sign-In button appears in top-right corner
- [ ] Clicked sign-in - Google popup appears
- [ ] Successfully signed in - name/avatar appear
- [ ] All emojis display correctly (🏆🃏🎲🔟🎯♠️🛤️)

---

## 📞 Still Having Issues?

If you've completed all steps and sign-in still doesn't work:

1. **Check Console Errors**
   - Press F12 to open DevTools
   - Click "Console" tab
   - Copy ALL red errors
   - Send them for debugging

2. **Check Network Tab**
   - F12 → Network tab
   - Refresh page
   - Look for "firebase-config.js" in list
   - Click it → check "Response" tab
   - Should show your Firebase config, not 404 error

3. **Verify Firebase Project**
   - Go to Firebase Console
   - Make sure project is `game-night-9580e`
   - Check Authentication is enabled
   - Check Google sign-in provider is enabled

---

**Last Updated:** January 26, 2026
**Your URL:** https://baldwinag.com/test/
**Firebase Project:** game-night-9580e
