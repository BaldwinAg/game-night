# Game Night Scorekeeper - Firebase Integration Roadmap

## Project Version: 5.0.0
## Document Version: 1.0
## Created: January 2025

---

## 🎯 Project Goals

1. **Multi-device synchronization** - Access scores from any device
2. **Google Authentication** - Easy sign-in, secure data
3. **Player Groups** - Organize different friend circles
4. **Enhanced Leaderboards** - Wins + Points system
5. **Offline-first** - Works without internet, syncs when available

---

## 📊 Points System Specification

### Core Rules
- **Everyone gets points for playing** (participation incentive)
- **Winner gets points equal to player count**
- **Points decrease by 1 for each lower placement**

### Examples

| Scenario | 1st | 2nd | 3rd | 4th | 5th | 6th |
|----------|-----|-----|-----|-----|-----|-----|
| 2 players (Cribbage) | 2 | 1 | - | - | - | - |
| 4 players individual | 4 | 3 | 2 | 1 | - | - |
| 4 players (2 teams) | 2 each | 1 each | - | - | - | - |
| 6 players individual | 6 | 5 | 4 | 3 | 2 | 1 |

### Team Games
- Team members share the same placement
- Each team member gets placement points individually
- Example: Pitch with 2 teams of 2
  - Winning team: Player A = 2 pts, Player B = 2 pts
  - Losing team: Player C = 1 pt, Player D = 1 pt

---

## 🏗️ Architecture

### Firebase Services Used
1. **Firebase Authentication** - Google sign-in
2. **Cloud Firestore** - Real-time database
3. **Firebase Hosting** (optional) - Host the app

### Data Structure

```
firestore/
├── users/{oderId}
│   ├── displayName: string
│   ├── email: string
│   ├── photoURL: string
│   ├── createdAt: timestamp
│   └── lastLogin: timestamp
│
├── groups/{groupId}
│   ├── name: string
│   ├── ownerId: string
│   ├── inviteCode: string (6 chars, unique)
│   ├── createdAt: timestamp
│   ├── members: [
│   │   { oderId, displayName, joinedAt }
│   │   ]
│   └── settings: {
│       defaultGames: []
│   }
│
├── matches/{matchId}
│   ├── groupId: string
│   ├── gameType: string (flip7, yahtzee, etc.)
│   ├── playedAt: timestamp
│   ├── recordedBy: string (userId)
│   ├── results: [
│   │   {
│   │     oderId: string,
│   │     odername: string,
│   │     placement: number (1, 2, 3...),
│   │     points: number,
│   │     gameScore: number,
│   │     teamId: number (optional, for team games)
│   │   }
│   │   ]
│   └── metadata: {
│       rounds: number,
│       duration: number (optional)
│   }
│
└── leaderboards/{groupId}/games/{gameType}
    └── {oderId}: {
        odername: string,
        wins: number,
        gamesPlayed: number,
        totalPoints: number,
        lastPlayed: timestamp
    }
```

### Security Rules
- Users can only read/write their own user document
- Users can only access groups they're members of
- Matches can only be created by group members
- Leaderboards auto-update via Cloud Functions (or client-side)

---

## 📅 Development Phases

### Phase 1: Foundation (v5.0.0) ✅ Complete
- [x] Create roadmap document
- [x] Add version display to app
- [x] Set up Firebase configuration structure
- [x] Create Firebase setup guide

### Phase 2: Authentication (v5.1.0) ✅ Current
- [x] Add Firebase SDK to app
- [x] Implement Google Sign-In
- [x] Create user profile in Firestore on first login
- [x] Add sign-in/sign-out UI
- [x] Show user avatar when signed in
- [x] Maintain local-only mode for non-signed-in users

### Phase 3: Groups (v5.2.0)
- [ ] Create group management UI
- [ ] Implement "Create Group" flow
- [ ] Generate unique invite codes
- [ ] Implement "Join Group" with invite code
- [ ] Group switching in header
- [ ] List group members
- [ ] Leave group functionality
- [ ] Group owner can remove members

### Phase 4: Match Recording (v5.3.0)
- [ ] Modify game completion flow
- [ ] Add "Record to [Group Name]" option on winner screen
- [ ] Calculate points based on placements
- [ ] Save match to Firestore
- [ ] Handle team games correctly
- [ ] Show confirmation after recording

### Phase 5: Synced Leaderboards (v5.4.0)
- [ ] Create new leaderboard UI with tabs
- [ ] "Overall" leaderboard (all games combined)
- [ ] Per-game leaderboards
- [ ] Show both Wins and Points columns
- [ ] Add time filters (All-time, This month, This week)
- [ ] Real-time updates when others record games

### Phase 6: Match History (v5.5.0)
- [ ] View recent matches for group
- [ ] Filter by game type
- [ ] Match detail view
- [ ] Delete match (owner/recorder only)
- [ ] Edit match (within 24 hours)

### Phase 7: Offline Support (v5.6.0)
- [ ] Enable Firestore offline persistence
- [ ] Queue matches when offline
- [ ] Sync indicator in UI
- [ ] Handle conflicts gracefully

### Phase 8: Polish & Extras (v6.0.0)
- [ ] Player statistics page
- [ ] Achievements/badges
- [ ] "Rivalry" stats between players
- [ ] Push notifications for group activity
- [ ] Dark/light theme toggle
- [ ] Export group data

---

## 🔧 Firebase Setup Checklist

### In Firebase Console (console.firebase.google.com)

1. **Create Project**
   - [ ] Go to Firebase Console
   - [ ] Click "Add Project"
   - [ ] Name it (e.g., "game-night-scorekeeper")
   - [ ] Disable Google Analytics (optional, not needed)
   - [ ] Click "Create Project"

2. **Enable Authentication**
   - [ ] Go to Authentication → Sign-in method
   - [ ] Enable "Google" provider
   - [ ] Add your email as support email
   - [ ] Save

3. **Create Firestore Database**
   - [ ] Go to Firestore Database
   - [ ] Click "Create database"
   - [ ] Start in "test mode" (we'll add rules later)
   - [ ] Choose region closest to you

4. **Register Web App**
   - [ ] Go to Project Settings (gear icon)
   - [ ] Scroll to "Your apps"
   - [ ] Click web icon (</>)
   - [ ] Register app name
   - [ ] Copy the firebaseConfig object

5. **Configure Authorized Domains**
   - [ ] Go to Authentication → Settings
   - [ ] Add your hosting domain to authorized domains
   - [ ] For local testing, localhost is already included

---

## 📁 File Structure (Updated)

```
/games/
├── index.html          # Main app (v5.x.x)
├── sw.js               # Service worker
├── firebase-config.js  # Firebase configuration (user creates)
├── manifest.json       # PWA manifest
├── icon-192.png
├── icon-512.png
├── ROADMAP.md          # This document
├── CHANGELOG.md        # Version history
└── README.md           # Setup instructions
```

---

## 🚀 Deployment Options

### Option A: Firebase Hosting (Recommended)
- Free SSL certificate
- Fast CDN
- Easy deployment with `firebase deploy`
- Custom domain support

### Option B: GitHub Pages
- Free hosting
- Requires manual Firebase config

### Option C: Any Static Host
- Netlify, Vercel, etc.
- Just upload the files

---

## ❓ Open Questions

1. **Guest players**: How to handle non-signed-in players in a group game?
   - Option A: Require all players to have accounts
   - Option B: Allow "guest" names (recorded as text, not linked)
   - **Recommendation**: Option B for flexibility

2. **Historical data migration**: Import existing localStorage wins?
   - Could offer one-time import on first sign-in

3. **Group limits**: Maximum members per group?
   - **Recommendation**: 20 members (plenty for game nights)

4. **Match editing**: Who can edit/delete matches?
   - **Recommendation**: Recorder within 24 hours, or group owner anytime

---

## 📝 Notes

- Keep local-only mode fully functional for users who don't want accounts
- Firebase free tier is generous (50K reads/day, 20K writes/day)
- Real-time sync means everyone sees updates immediately
- Offline support means the app works even without internet

---

## Version History

| Version | Description | Status |
|---------|-------------|--------|
| 4.11 | Pre-Firebase production (local only) | ✅ Released |
| 5.0.0 | Foundation + roadmap | ✅ Released |
| 5.1.0 | Authentication | ✅ Released |
| 5.2.0 | Groups | 📋 Planned |
| 5.3.0 | Match Recording | 📋 Planned |
| 5.4.0 | Synced Leaderboards | 📋 Planned |
| 5.5.0 | Match History | 📋 Planned |
| 5.6.0 | Offline Support | 📋 Planned |
| 6.0.0 | Polish & Extras | 📋 Planned |
