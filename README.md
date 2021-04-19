<h1 align="center">Welcome to tournament-frontend 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> The front-end of my mmu project

### 🏠 [Homepage](placeholder)

## Install
```javascript
  npm install
```

## Starting Development
```javascript
  yarn start
```

## Resources
- https://www.npmjs.com/package/react-d3-tree
  - For creating the node tree

## Author

👤 **Theo Clapperton**

* Website: https://teobot.github.io/
* Github: [@teobot](https://github.com/teobot)
* LinkedIn: [@theoClapperton](https://linkedin.com/in/theoClapperton)

## Todo
[x] Tournament Create Screen
[x] Add new Leaderboard Tournament Type
[ ] Add ability to message users
[x] Add Tournament Edit tools
[ ] Add user Edit tools
[ ] Update the look of the matches on the UserScreen
[ ] Add new list of user owned tournaments

## Development Update Documentation
### 19/04/2021  - 0.6.2
- Updated dependencies
- Index.html: Added backgroundColor on html body
- index.js: Changed css import order, Added create/view tournament screen and view user screen
- NavBar: Update logic and UI
- TournamentMenu: Added new tournament section menu
- AdminTools: Overhaul on admins tools on tournaments
- TournamentStateDisplayGroup: Changed step.group size to fluid
- UserPlayingButtonGroup: Remove unused variable deceleration, Remove comments
- Added new tournament player display
- Added new leaderboard segment display
- TournamentBracketSegment: Redesigned entire UI
- Match.js: Added match_id text, Used context for user_id
- Player.js: Added dynamic score text
- ChartSegment: Added new chartSegment component
- LoggedInContext: Updated logicFunction, Added new username and user_id variables into context
- index.css: Updated CSS
- calculateCreated: Added new displayDate and displayState functions
- redirectLogin: Updated auto login logic
- Added new logo images
- AccountCreateScreen: Updated login logic, Updated return JSX
- Added new tournament create screen
- HomeScreen: Updated logic, changed various styling
- LandingScreen: Updated UI
- LoginScreen: Changed login logic, Small UI change
- TournamentScreen: Added imports, Added new components, Large UI/UX changes
- Added new user screen
- Updated version
- Updated README

### 13/04/2021 - 0.5.2
- Added landingScreen button on the login screen
- Added new edit svg icon
- Moved AdminTools component location
- Moved Tournament state display group
- Moved UserPlayingButton group component
- Added new tournamentConfiguration file
- Created new Tournament SingleElimination display
- Added new svg Match object for the singleElimination Display
- Added new svg Round object for the singleElimination Display
- Added new svg Player object for the singleElimination Display
- Added new RoundRobin.css file
- Added new window size method
- Added editable Username state
- HomeScreen: Removed console.log
- TournamentScreen: Added new Model for match confirmation
- Updated README
- Updated Version number
- Updated deps

## Show your support

Give a ⭐️ if this project helped you!