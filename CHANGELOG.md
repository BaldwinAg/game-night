# Changelog

All notable changes to Game Night Scorekeeper will be documented in this file.

## [5.1.1] - 2025-01-26

### Fixed
- **Emoji Encoding**: Fixed all corrupted emoji characters throughout the app
- **Game Icons**: All game icons now display correctly (🃏🎲🔟🎯♠️🛤️)
- **Service Worker**: Updated to handle optional firebase-config.js gracefully
- **Cache Install Error**: Fixed "Failed to execute 'addAll' on 'Cache'" error
- **File Names**: Removed spaces and numbers from icon and manifest filenames

### Added
- **DEPLOYMENT.md**: Comprehensive deployment guide for Hostinger, Firebase, GitHub Pages
- **Firebase Setup Instructions**: Step-by-step authorized domains configuration
- **Troubleshooting Guide**: Common deployment issues and solutions

### Changed
- Service worker now caches required files first, optional files second
- firebase-config.js is now optional (won't break app if missing)

---

## [5.1.0] - 2025-01-26

### Added
- **Google Sign-In Authentication**: Users can now sign in with their Google account
- **User Profile Management**: Automatic user profile creation in Firestore on first login
- **Auth State Observer**: Real-time authentication state tracking
- **User Avatar Display**: Profile picture and name shown in header when signed in
- **Sign In/Sign Out UI**: Clean authentication controls in the app header
- **Firestore User Collection**: User profiles stored with displayName, email, photoURL, and timestamps

### Changed
- Updated app version to 5.1.0
- Cloud sync message now only appears when Firebase is configured but user is not signed in
- Authentication state integrated throughout the app
- Service worker cache should be updated to v17

### Technical
- Added Firebase auth state observer with automatic profile creation
- User profiles include: displayName, email, photoURL, createdAt, lastLogin
- Local-only mode remains fully functional for users without Firebase or without signing in
- Graceful fallback if Firebase is not configured

---

## [5.0.0] - 2025-01-26

### Added
- **Firebase Integration Foundation**: Prepared app architecture for cloud sync
- **Version display**: Version number now shown on home screen
- **Firebase SDK**: Added Firebase libraries (authentication, Firestore)
- **Configuration system**: firebase-config.js for easy setup
- **Setup documentation**: FIREBASE_SETUP.md with step-by-step guide
- **Development roadmap**: ROADMAP.md with planned features

### Changed
- Version numbering updated to semantic versioning (major.minor.patch)
- Service worker cache version updated to v16

### Planned (Next Releases)
- v5.1.0: Google Sign-In authentication
- v5.2.0: Player groups with invite codes
- v5.3.0: Cloud match recording with points system
- v5.4.0: Synced leaderboards (wins + points)
- v5.5.0: Match history view
- v5.6.0: Offline support with sync

---

## [4.11] - 2025-01-26

### Fixed
- **Critical mobile input fix**: Replaced inline score inputs with modal-based entry system
- Score entry now works properly on Galaxy Tab, Chromebook, and other mobile devices
- Keyboard no longer closes after each digit entry

### Changed
- Flip 7, Gin Rummy, Phase 10, and Farkle now use tap-to-open score modals
- Score boxes show "—" when empty, tap to enter score
- Modal includes Enter key support for quick submission

## [4.10] - 2025-01-26

### Changed
- Changed all numeric inputs from `type="number"` to `type="text"` with `inputMode="numeric"`
- Attempted fix for mobile keyboard issues (superseded by 4.11)

## [4.9] - 2025-01-26

### Added
- Home button confirmation modal for all games
- "Leave Game?" prompt prevents accidental navigation away from active games

### Changed
- Players screen back button goes directly home (no game in progress)
- Winner screen home button goes directly home (game already over)

## [4.8] - 2025-01-26

### Added
- **Pitch game**: Full implementation with multiple variants
  - Point systems: 4, 5, 7, 10, and 13-point versions
  - Game modes: Teams, Call Your Partner, Cutthroat
  - Customizable Shoot the Moon rules (success and miss penalties)
  - Custom target score option
  - Editable team and player scores

### Fixed
- Pitch team scoring no longer doubles points
- Back button visibility improved with semi-transparent background

## [4.7] - 2025-01-26

### Added
- Initial Pitch game implementation

## [4.6] - 2025-01-26

### Added
- Tablet-responsive layouts for Cribbage
- Inline quick reference on tablets (side-by-side with board)

## [4.5] - 2025-01-26

### Added
- Tablet and large screen responsive layouts
- Two-column game cards on tablets (768px+)
- Three-column game cards on large tablets (1024px+)
- Wider containers and larger touch targets on tablets

## [4.4] - 2025-01-26

### Added
- Cribbage scores now editable (tap score to edit)
- Added +24 button for maximum hand scores

## [4.3] - 2025-01-26

### Added
- **Saved Players feature**: Players are remembered across sessions
  - Tap saved player names to quickly add to game
  - "Save to memory" checkbox when adding new players
  - Manage saved players section to remove names
- Players stored in localStorage separately from wins data

## [4.2] - 2025-01-26

### Changed
- Cribbage scoring redesigned with side-by-side buttons
- Each player has own column of +point buttons (red/blue)
- One-tap scoring instead of select-player-then-points

## [4.1] - 2025-01-25

### Added
- Cribbage game with visual board tracker
- Four-street progress visualization
- Skunk warning alerts

## [4.0] - 2025-01-25

### Added
- Wins Leaderboard tracking
- Export/Import wins data (CSV and JSON)
- Per-game win counts displayed on leaderboard

## [3.x] - 2025-01-24

### Added
- Farkle with scoring reference
- Phase 10 with phase tracking
- Yahtzee with full scorecard
- Score history editing for all games

## [2.x] - 2025-01-23

### Added
- Gin Rummy scoring
- Game rules reference screens
- PWA support (offline capable)

## [1.0] - 2025-01-22

### Added
- Initial release
- Flip 7 score tracking
- Basic player management
- Round-by-round scoring
