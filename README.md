# 🎲 Game Night Scorekeeper

**Version 6.0.0** | Local-Only (No Firebase)

A mobile-friendly Progressive Web App (PWA) for tracking scores across multiple card and dice games. Perfect for family game nights!

**Presented by Baldwin Ag**

## 🆕 What's New in v6.0.0

- **🔒 100% Local**: All Firebase code removed - app works entirely offline
- **📱 Mobile Reliable**: No more authentication issues on mobile Safari
- **💾 localStorage Only**: All data saved locally on your device
- **⚡ Fast & Simple**: Cleaner codebase with 813 fewer lines of code
- **🎮 All Features Preserved**: Games, house rules, scoring corrections all intact

### What Was Removed
- Firebase Authentication (Google Sign-In, phone, email link, anonymous)
- Player Groups and cloud sync features
- Firestore database integration

### Why the Change?
After extensive testing, Firebase Web SDK proved incompatible with mobile Safari due to Intelligent Tracking Prevention. The app now uses localStorage exclusively and works reliably on all devices.

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
- 🔒 **100% Local** - No cloud dependencies, works entirely offline

### Scoring Features
- ✏️ **Editable scores** - Tap any score to edit mistakes
- 📊 **Score history** - View all rounds played
- 🏆 **Standings** - Real-time rankings with progress bars
- 🎯 **Target scores** - Visual progress toward winning

### Player Management
- 👥 **Saved players** - Remember frequent players
- ➕ **Quick add** - Tap saved names to add to game
- 🔄 **Reusable** - Same players across different games

### Wins Tracking
- 🏆 **Leaderboard** - Track total wins per player
- 📈 **Per-game stats** - See wins breakdown by game
- 📤 **Export/Import** - Backup data as CSV or JSON

---

## 🚀 Quick Start

1. Download all files to a folder
2. Open `index.html` in a browser
3. Start playing!

That's it! The app works entirely offline with no setup required.

---

## 📁 Files

```
/games/
├── index.html           # Main app (v6.0.0)
├── sw.js                # Service worker for offline
├── manifest.json        # PWA manifest
├── icon-192.png         # App icon
├── icon-512.png         # Large app icon
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
- **Plain CSS** - No build step required
- **localStorage** - All data persistence
- **Service Worker** - PWA offline caching

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

### Scores Not Saving
- Check localStorage is enabled
- Check available storage space
- Export data regularly as backup

### Upgrading from v5.x to v6.0
- All local data (wins, saved players, house rules) is preserved
- Firebase data will no longer be accessible
- Export your data before updating if you need a backup

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
| 6.0.0 | Feb 2026 | Remove all Firebase code - 100% local-only app |
| 5.8.0 | Feb 2026 | Anonymous authentication attempt (failed) |
| 5.7.0 | Feb 2026 | Email link authentication attempt (failed) |
| 5.6.0 | Feb 2026 | Phone authentication attempt (failed) |
| 5.5.1 | Feb 2026 | Google Sign-In redirect (failed on mobile) |
| 5.5.0 | Feb 2026 | Cloud sync for groups (incompatible with Safari) |
| 5.4.0 | Feb 2026 | Player groups infrastructure (removed in v6.0) |
| 5.3.0 | Feb 2026 | Drag-and-drop reordering, House Rules, Pitch enhancements |
| 5.1.0 | Jan 2025 | Google Sign-In popup (removed in v6.0) |
| 5.0.0 | Jan 2025 | Firebase foundation (removed in v6.0) |
| 4.11 | Jan 2025 | Modal-based score entry fix |
| 4.8 | Jan 2025 | Pitch game added |
| 4.3 | Jan 2025 | Saved players feature |
| 4.1 | Jan 2025 | Cribbage added |
| 4.0 | Jan 2025 | Wins leaderboard |

See [CHANGELOG.md](CHANGELOG.md) for complete version history.
