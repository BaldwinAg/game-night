# 🎲 Game Night Scorekeeper

**Version 5.3.0** | UX Improvements & Pitch Enhancements

A mobile-friendly Progressive Web App (PWA) for tracking scores across multiple card and dice games. Perfect for family game nights!

**Presented by Baldwin Ag**

## 🆕 What's New in v5.3.0

- **🔀 Drag-and-Drop Players**: Reorder players by dragging (like they sit around the table)
- **📏 Bigger Touch Targets**: 44px buttons for easy mobile tapping
- **🏠 House Rules Save**: Pitch game rules remember your preferences
- **👥 Team Selection**: Choose teams when adding players (before game setup)
- **🃏 Dealer Indicator**: Shows who's dealing with a card icon
- **🎴 Two-Phase Cribbage**: Separate pegging and showing with obvious confirm buttons
- **✨ Fixed All Emojis**: No more corrupted characters - clean UI everywhere

### Coming Soon
- **v5.4.0**: Cloud match recording with points system
- **v5.5.0**: Synced leaderboards (wins + points)
- **v5.6.0**: Match history view
- **v5.7.0**: Offline support with sync

See [ROADMAP.md](ROADMAP.md) for the full development plan.

---

## 🎮 Supported Games

| Game | Players | Description |
|------|---------|-------------|
| 🃏 **Flip 7** | 2-8 | Push-your-luck card game, first to 200 wins |
| 🎲 **Yahtzee** | 1-6 | Classic dice game with 13 scoring categories |
| 🔟 **Phase 10** | 2-6 | Complete 10 phases in order, lowest penalty wins |
| 🎯 **Farkle** | 2-8 | Dice game, first to 10,000 wins |
| ♠️ **Gin Rummy** | 2-4 | Classic card game, first to 100 wins |
| 🛤️ **Cribbage** | 2 | Traditional card game with pegging board, first to 121 |
| 🃏 **Pitch** | 4-6 | Trick-taking trump game with multiple variants |

---

## ✨ Features

### Core Features
- 📱 **Mobile-optimized** - Works great on phones, tablets, and Chromebooks
- 📴 **Offline capable** - PWA with service worker caching
- 🏠 **Add to home screen** - Install as an app on any device
- 💾 **Auto-save** - Wins and saved players persist in localStorage
- ☁️ **Cloud-ready** - Firebase integration for future sync features

### Scoring Features
- ✏️ **Editable scores** - Tap any score to edit mistakes
- 📊 **Score history** - View all rounds played
- 🏆 **Standings** - Real-time rankings with progress bars
- 🎯 **Target scores** - Visual progress toward winning

### Player Management
- 👥 **Saved players** - Remember frequent players
- ➕ **Quick add** - Tap saved names to add to game
- 🔄 **Reusable** - Same players across different games

### Player Groups (Sign-In Required)
- 👨‍👩‍👧‍👦 **Create groups** - Organize different friend circles
- 🎟️ **Invite codes** - Share 6-character codes to invite members
- 🔄 **Group switching** - Select active group from dropdown
- 👑 **Owner controls** - Remove members, manage group
- 🚪 **Leave groups** - Exit groups anytime with automatic ownership transfer
- ⚡ **Real-time sync** - Changes appear instantly on all devices
- 📊 **Up to 20 members** per group

### Wins Tracking
- 🏆 **Leaderboard** - Track total wins per player
- 📈 **Per-game stats** - See wins breakdown by game
- 📤 **Export/Import** - Backup data as CSV or JSON

---

## 🚀 Quick Start

### Option A: Local Only (No Setup Required)
1. Download all files to a folder
2. Open `index.html` in a browser
3. Start playing!

### Option B: With Firebase Cloud Sync
1. Download all files to a folder
2. Follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md) to configure Firebase
3. Edit `firebase-config.js` with your Firebase project details
4. Open `index.html` in a browser
5. Sign in with Google to enable cloud features

---

## 📁 Files

```
/games/
├── index.html           # Main app (v5.0.0)
├── firebase-config.js   # Firebase configuration (edit this!)
├── sw.js                # Service worker for offline
├── manifest.json        # PWA manifest
├── icon-192.png         # App icon
├── icon-512.png         # Large app icon
├── FIREBASE_SETUP.md    # Firebase setup guide
├── ROADMAP.md           # Development roadmap
├── CHANGELOG.md         # Version history
└── README.md            # This file
```

---

## 📲 Installation

### As a Web App
1. Visit the hosted URL in your browser
2. Tap "Add to Home Screen" (or install prompt)
3. Launch from your home screen like any app

### Self-Hosting
1. Upload all files to your web server
2. Ensure files are in the same directory
3. Access via HTTPS for full PWA features

---

## 🔧 Technical Details

### Built With
- **React 18** - UI framework (loaded via CDN)
- **Babel** - JSX transformation in browser
- **Firebase** - Authentication & Firestore (optional)
- **Plain CSS** - No build step required
- **localStorage** - Local data persistence

### Browser Support
- Chrome / Chromium (recommended)
- Safari / iOS Safari
- Firefox
- Edge
- Samsung Internet

---

## 📝 Usage Tips

### Starting a Game
1. Tap a game card on the home screen
2. Add players (tap saved names or type new)
3. Tap "Start Game"

### Entering Scores
1. Tap the score box next to player name
2. Enter score in the modal popup
3. Tap OK or press Enter
4. Repeat for all players
5. Tap "Submit Round"

### Editing Mistakes
- **During game**: Tap any score in history table
- **Cribbage**: Tap the big score number
- **Pitch**: Tap team/player score in standings

---

## 🐛 Troubleshooting

### App Shows Old Version
- Clear browser cache
- Unregister service worker in DevTools
- Reinstall PWA

### Firebase Not Working
- Check `firebase-config.js` has your real config values
- Verify authorized domains in Firebase Console
- Check browser console for errors

### Scores Not Saving
- Check localStorage is enabled
- Check available storage space
- Export data regularly as backup

---

## 📄 License

This project is provided as-is for personal and family use.

Yahtzee® is a trademark of Hasbro.  
Phase 10® is a trademark of Mattel.  
This app is not affiliated with or endorsed by any game manufacturers.

---

## 🔄 Version History

| Version | Date | Description |
|---------|------|-------------|
| 5.3.0 | Feb 2026 | Drag-and-drop reordering, House Rules, Pitch enhancements |
| 5.2.0 | Jan 2025 | Player groups with invite codes |
| 5.1.0 | Jan 2025 | Google Sign-In authentication |
| 5.0.0 | Jan 2025 | Firebase foundation, version display |
| 4.11 | Jan 2025 | Modal-based score entry fix |
| 4.8 | Jan 2025 | Pitch game added |
| 4.3 | Jan 2025 | Saved players feature |
| 4.1 | Jan 2025 | Cribbage added |
| 4.0 | Jan 2025 | Wins leaderboard |

See [CHANGELOG.md](CHANGELOG.md) for complete version history.
