# Changelog

All notable changes to Game Night Scorekeeper will be documented in this file.

## [5.3.0] - 2026-02-03

### Added - UX Improvements & Pitch Enhancements
- **Drag-and-Drop Player Reordering**: Players can now be reordered by dragging (⋮⋮ handle)
- **Bigger Arrow Buttons**: Up/down arrows increased to 44x44px for mobile touch targets
- **House Rules Save/Load**: Pitch game rules now save to localStorage/Firestore
  - Save custom point systems, target scores, shoot the moon rules
  - On next Pitch game start, popup asks to use saved rules or set new
- **Pitch Team Selection Workflow**: Select teams when adding players (before game setup)
  - Team 1/Team 2 buttons visible when Pitch is selected
  - Team badges show on player list
- **Dealer Indicator**: Shows 🃏 playing card icon next to current dealer
  - Dealer auto-advances after each hand
  - Visible in both teams mode and individual mode
- **Two-Phase Cribbage Scoring**: Restored separate pegging and showing phases
  - Large, obvious "✅ Confirm Pegging" and "✅ Confirm Hand" buttons
  - Round history shows peg/show breakdown
  - Edit past rounds with recalculation

### Fixed
- **All Corrupted Emojis**: Fixed 142 corrupted UTF-8 byte sequences throughout app
  - Bullets, dashes, quotes, arrows now display correctly
  - Remove buttons show "X" instead of garbled text
  - Navigation fully readable on all devices
- **Score Input Focus**: Input now properly focuses and selects all text on open
  - Can type multi-digit numbers without clicking multiple times
  - Fixed using useRef and useEffect
- **JSX Syntax Error**: Fixed missing closing div tag in player list
- **House Rules Button**: Now always visible (not just when signed in)
  - Saves to Firestore if signed in, localStorage otherwise

### Changed
- Updated app version to 5.3.0
- Service worker cache updated to v19
- Mobile touch targets follow Apple's 44px guideline
- Player list UI shows drag handles for visual clarity

### Technical
- Added drag-and-drop state management (draggedPlayerIndex)
- Implemented handleDragStart, handleDragOver, handleDragEnd handlers
- House rules functions: savePitchHouseRules(), loadPitchHouseRules()
- Dual-storage strategy for house rules (Firestore + localStorage fallback)
- Python byte-level string replacement for emoji corruption fixes

---

## [5.2.0] - 2025-01-26

### Added - Player Groups (Phase 3 Complete)
- **Create Groups**: Create game night groups with unique 6-character invite codes
- **Join Groups**: Join groups using invite codes
- **Group Management**: Full group management interface accessible from home screen
- **Member Management**: View all group members with avatars and display names
- **Group Switching**: Select active group from dropdown on home screen
- **Owner Controls**: Group owners can remove members
- **Leave Group**: Members can leave groups at any time
- **Ownership Transfer**: Automatic ownership transfer when owner leaves
- **Group Deletion**: Automatic deletion when last member leaves
- **Real-Time Sync**: Group membership changes sync instantly across all devices
- **Invite Code Sharing**: Copy invite codes to clipboard with one tap
- **Member Limit**: Support up to 20 members per group
- **Multi-Group Support**: Users can be members of multiple groups simultaneously

### Technical
- Firestore `groups` collection with denormalized member data
- Client-side filtering for group membership queries
- localStorage persistence for selected group across sessions
- Responsive group management UI following existing design patterns
- Conditional rendering: groups only visible when signed in
- Full backward compatibility: app works identically for non-signed-in users

### Changed
- Updated app version to 5.2.0
- Sign-in prompt now mentions "player groups" feature
- Service worker cache should be updated to v18

### Foundation for Phase 4
- Group context ready for match recording (v5.3.0)
- Member structure supports points-based leaderboards

---

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
