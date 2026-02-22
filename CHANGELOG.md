# Changelog

All notable changes to Game Night Scorekeeper will be documented in this file.

## [6.0.2] - 2026-02-21

### Fixed — Multi-Digit Score Input
- **Score modals now accept multi-digit numbers**: Typing "25" correctly enters 25 instead of replacing "2" with "5"
- Root cause: Score modals (Round Score, Edit Score, Edit Yahtzee) were defined as React components inside the render function, causing React to unmount/remount the input on every keystroke
- Fix: All three modals moved to inline JSX so the input element persists between re-renders
- Bumped service worker cache to v34 for immediate update

---

## [6.0.0] - 2026-02-05

### Removed - Firebase Completely Stripped Out
- **All Firebase Code Removed**: App is now 100% local-only with no cloud dependencies
- **Authentication Removed**: No more Google Sign-In, phone auth, email link, or anonymous auth
- **Player Groups Removed**: Removed group creation, joining, management, and invite codes
- **Cloud Sync Removed**: All cloud sync features and Firestore integration removed
- **Debug UI Removed**: Removed storage check button and debug panel

### Reason for Change
After extensive testing with multiple authentication methods (Google Sign-In redirect, phone authentication, email link passwordless, and anonymous authentication), all failed on mobile Safari due to Intelligent Tracking Prevention blocking Firebase-specific storage. Despite regular localStorage working perfectly (16 keys), Firebase keys remained at 0, making cloud features unusable on mobile devices.

**User decision**: "i don't think firebase is a functional system"

### What Still Works
- ✅ All 7 games (Flip 7, Yahtzee, Phase 10, Farkle, Gin Rummy, Cribbage, Pitch)
- ✅ Pitch house rules save/load (localStorage)
- ✅ Two-phase Cribbage scoring with corrections
- ✅ All scoring corrections and improvements from v5.3.0
- ✅ Drag-and-drop player reordering
- ✅ Score editing for all games
- ✅ Wins leaderboard (localStorage)
- ✅ Export/import wins data (CSV/JSON)
- ✅ Saved players list
- ✅ All emoji fixes (142 UTF-8 corrections from v5.3.0)
- ✅ Offline PWA functionality
- ✅ Works perfectly on all devices (mobile, tablet, desktop)

### Technical Changes
- Removed Firebase SDK script tags
- Removed Firebase initialization and configuration
- Simplified `savePitchHouseRules()` and `loadPitchHouseRules()` to localStorage-only
- Removed all group management functions and UI components
- Removed authentication state management and UI
- Simplified win recording to localStorage only
- Updated service worker to v32
- Updated app version to 6.0.0
- Code reduction: -844 lines, +31 lines (813 lines net reduction)

### Migration Notes
- All local data (wins, saved players, house rules) preserved
- No action needed from users
- PWA will auto-update on next launch
- Firebase project can be deleted (no longer needed)

---

## [5.5.0] - 2026-02-03

### Added - Cloud Sync for Groups
- **Real Shared Leaderboards**: Groups now have true shared leaderboards synced across all devices
- **Auto-Match Recording**: Wins automatically save to Firestore when a group is selected
- **Cloud Sync Status**: Visual indicators show when cloud sync is active
  - "☁️ Cloud Sync Active" on home screen when group selected
  - "Match saved to cloud for [Group Name]" on winner screen
  - "Select a group to sync" reminder when signed in but no group active
- **Real-Time Sync**: All group members see the same wins data instantly
- **Match History Storage**: Complete game results stored in Firestore
  - Game type, winner, all player scores, timestamp
  - Structured for future match history view

### Technical
- Firestore collection structure: `/groups/{groupId}/matches/{matchId}`
- Match data includes: game, gameName, winner, players array, scores, date, userId, userName
- `loadGroupWins()` function aggregates wins from Firestore matches
- Auto-load group wins when selected group changes (useEffect hook)
- Merge cloud wins with localStorage for offline support
- `recordWin()` now saves to both localStorage and Firestore

### Changed
- Updated app version to 5.5.0
- Service worker cache updated to v21
- Winner screen shows cloud sync confirmation
- Leaderboard now uses cloud-synced data when group selected

### How It Works
1. Sign in with Google ✅
2. Create or join a group ✅
3. Select group from dropdown ✅
4. Play games - wins auto-save to cloud ☁️
5. All group members see the same shared leaderboard 🏆

---

## [5.4.0] - 2026-02-03

### Added - Player Groups Infrastructure
- **Create Groups**: Create game night groups with auto-generated 6-character invite codes
- **Join Groups**: Join groups using invite codes shared by group owners
- **Group Management UI**: Full management interface with create/join/manage flows
  - View all group members with avatars and display names
  - Owner controls: remove members (owner badge 👑)
  - Leave groups anytime with automatic ownership transfer
  - Copy invite codes to clipboard with one tap
- **Group Selector**: Dropdown on home screen to switch between groups
  - "All Players" option shows everyone (localStorage mode)
  - Select specific group to filter leaderboard
  - Settings ⚙️ icon for quick access to management
- **Multi-Group Support**: Users can be members of multiple groups simultaneously
- **Auto-Cleanup**: Empty groups automatically deleted when last member leaves

### Technical
- Firestore `groups` collection with member arrays
- Client-side filtering for group membership queries
- localStorage persistence for selected group across sessions
- Group creation with `generateInviteCode()` (6-char alphanumeric, no ambiguous chars)
- Member management functions: createGroup, joinGroup, leaveGroup, removeMemberFromGroup
- Ownership transfer when owner leaves group
- Real-time group loading on sign-in

### UI Components
- Group selector dropdown with settings icon
- Group management modal (3 modes: menu, create, join)
- Member list with avatars and remove buttons
- Invite code display with copy functionality
- Visual group indicators throughout app

---

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
