# Deployment Guide for Game Night Scorekeeper

## Version 5.1.0

This guide covers deploying your Game Night app to web hosting services like Hostinger, Firebase Hosting, GitHub Pages, or any static hosting provider.

---

## ⚠️ Before Deployment

### 1. Firebase Console Setup (Required for Authentication)

If you want Google Sign-In to work, you MUST configure Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`game-night-9580e`)
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Click **"Add domain"**
5. Add your deployment domain:
   - For Hostinger: `baldwinag.com`
   - For subdirectories: Add the root domain only (not `baldwinag.com/test`)
   - For custom domains: Add your full domain
6. Click **Save**

**Note:** `localhost` and `127.0.0.1` are already authorized for local testing.

### 2. Files Checklist

Ensure all these files are in your deployment folder:

```
✅ index.html
✅ firebase-config.js
✅ sw.js
✅ manifest.json
✅ icon-192.png
✅ icon-512.png
📄 CHANGELOG.md (optional)
📄 README.md (optional)
📄 ROADMAP.md (optional)
📄 FIREBASE_SETUP.md (optional)
```

---

## Deployment Methods

### Option A: Hostinger / cPanel Hosting

#### Steps:

1. **Access File Manager**
   - Log into your Hostinger/cPanel account
   - Navigate to File Manager
   - Go to `public_html` directory

2. **Create Directory (Optional)**
   - If deploying to a subdirectory (e.g., `/test`):
     - Click "New Folder"
     - Name it `test` (or your preferred name)
     - Open that folder

3. **Upload Files**
   - Click "Upload" button
   - Select ALL files from your local directory:
     - index.html
     - firebase-config.js
     - sw.js
     - manifest.json
     - icon-192.png
     - icon-512.png
   - Wait for upload to complete

4. **Verify Upload**
   - Check that all files are present in the directory
   - Visit your URL: `https://baldwinag.com/test/`
   - You should see the Game Night app

5. **Test Authentication**
   - Click "Sign In with Google"
   - If you get an error about unauthorized domain:
     - Go back to Firebase Console
     - Add `baldwinag.com` to authorized domains
     - Wait 1-2 minutes for changes to propagate
     - Try signing in again

#### Common Hostinger Issues:

**Problem:** "firebase-config.js not found" error
**Solution:** Make sure you uploaded firebase-config.js to the SAME directory as index.html

**Problem:** Icons not showing
**Solution:** Verify icon-192.png and icon-512.png are uploaded and have correct names (no spaces!)

**Problem:** Authentication fails
**Solution:** Add your domain to Firebase Console authorized domains

---

### Option B: Firebase Hosting (Recommended for Firebase Integration)

#### Prerequisites:
- Node.js installed
- Firebase CLI: `npm install -g firebase-tools`

#### Steps:

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your existing project (`game-night-9580e`)
   - Public directory: `.` (current directory)
   - Single-page app: **Yes**
   - Overwrite index.html: **No**

3. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

4. **Your URL**
   - App will be live at: `https://game-night-9580e.web.app`
   - Custom domain can be configured in Firebase Console

**Advantages:**
- Free SSL certificate
- Automatic domain authorization
- Fast global CDN
- Easy updates with `firebase deploy`

---

### Option C: GitHub Pages

#### Steps:

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click Save

3. **Wait for Deployment**
   - GitHub will build and deploy (takes 1-2 minutes)
   - Your URL: `https://baldwinag.github.io/game-night/`

4. **Add Domain to Firebase**
   - Go to Firebase Console → Authentication → Authorized domains
   - Add: `baldwinag.github.io`

**Note:** GitHub Pages URLs are public. Don't commit sensitive Firebase config to public repos.

---

### Option D: Netlify / Vercel

#### Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your project folder
4. Site will be live at a random URL (e.g., `random-name-123.netlify.app`)
5. Add this domain to Firebase authorized domains

#### Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository OR drag & drop files
4. Deploy
5. Add domain to Firebase authorized domains

---

## 🔒 Security Considerations

### Firebase API Key

The Firebase API key in `firebase-config.js` is **designed to be public** for web apps. Firebase security comes from:
1. **Firestore Security Rules** (controls data access)
2. **Authorized domains** (controls where sign-in can occur)
3. **Firebase App Check** (optional, prevents abuse)

However, for extra security:
- Use environment variables in CI/CD pipelines
- Don't commit `firebase-config.js` to public repositories (add to `.gitignore`)
- Keep Firestore security rules strict

### For Public Repositories:

Add to `.gitignore`:
```
firebase-config.js
.env
.env.local
```

Then provide a template file `firebase-config.example.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
window.FIREBASE_CONFIG = firebaseConfig;
window.FIREBASE_CONFIGURED = true;
```

---

## 📱 Testing Deployment

After deploying, test these features:

### Basic Functionality:
- [ ] App loads without errors
- [ ] All game icons display correctly (🃏🎲🔟🎯♠️🛤️)
- [ ] Can select a game
- [ ] Can add players
- [ ] Can enter scores
- [ ] Can complete a game

### Firebase Features:
- [ ] "Sign In with Google" button appears
- [ ] Can sign in successfully
- [ ] User avatar/name displays after sign-in
- [ ] Can sign out
- [ ] No console errors related to Firebase

### PWA Features:
- [ ] "Add to Home Screen" prompt appears (on mobile)
- [ ] App works offline (after first load)
- [ ] Service worker installs successfully (check DevTools → Application → Service Workers)

---

## 🐛 Troubleshooting

### Sign-In Fails

**Error:** "auth/unauthorized-domain"
**Solution:** Add your domain to Firebase Console → Authentication → Authorized domains

**Error:** "firebase is not defined"
**Solution:** Check that Firebase SDK scripts are loading (check Network tab in DevTools)

### Service Worker Errors

**Error:** "Failed to execute 'addAll' on 'Cache'"
**Solution:** This was fixed in v5.1.1 - service worker now handles missing firebase-config.js gracefully

**Error:** Old version showing
**Solution:**
- Clear browser cache
- Unregister service worker (DevTools → Application → Service Workers → Unregister)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Emojis Not Showing

**Error:** Boxes or question marks instead of emojis
**Solution:**
- Ensure files are uploaded as UTF-8
- Re-upload index.html
- Check that your hosting supports UTF-8 encoding

### Files Not Found (404)

**Error:** "manifest.json 404" or "firebase-config.js 404"
**Solution:**
- Verify all files are in the same directory
- Check file names match exactly (case-sensitive!)
- Ensure no spaces in filenames

---

## 🔄 Updating Your Deployment

### For Hostinger:
1. Edit files locally
2. Upload modified files via File Manager (replaces old versions)
3. Clear browser cache and refresh

### For Firebase Hosting:
```bash
firebase deploy
```

### For GitHub Pages:
```bash
git add .
git commit -m "Update"
git push origin main
```
(Autodeploys in 1-2 minutes)

---

## 📞 Support

- **Firebase Issues:** [Firebase Documentation](https://firebase.google.com/docs)
- **Hosting Issues:** Contact your hosting provider (Hostinger, Netlify, etc.)
- **App Issues:** Check [CHANGELOG.md](CHANGELOG.md) for known issues

---

## ✅ Post-Deployment Checklist

After deploying for the first time:

1. [ ] Visited live URL - app loads
2. [ ] Added domain to Firebase authorized domains
3. [ ] Tested Google Sign-In - works
4. [ ] Played a test game - scoring works
5. [ ] Tested on mobile device - responsive
6. [ ] Tested "Add to Home Screen" - PWA works
7. [ ] Shared URL with friends/family for testing

---

**Version:** 5.1.0
**Last Updated:** January 2026
**Deployment URL:** https://baldwinag.com/test/
