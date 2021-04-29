# Toffy React Project Frontend
![Image of homepage](https://raw.githubusercontent.com/teobot/toffy-bucket/main/SharedScreenshot.jpg)
*Student ID*: **18055445**  
*Created By*: **Theo Clapperton**  
*Description*: **The frontend for my final year project**  
*Written In*: **React**  
*Last Updated*: **28/04/2021**  
*Style Guide*: **Prettier**  
*Linter*: **ESlint**  
*Version*: **`1.0.0`**  
*Github Repo Link*: ***[Github Link](https://github.com/teobot/toffy)***  
*Live Open Version*: ***[Homepage Link](https://toffy.netlify.app/)***  


## Development

### Install Dependencies
```javascript
  npm install
```

### Start Local Development
```javascript
  yarn start
```

## Deployment
1. Change `./src/api/toffy.js` DEV to false
2. Push to `main` branch and netlify will deploy automatically


## Development Guides
### Adding New Routes
1. Create the new screen and place file inside `./src/screens/`
2. Inside `./src/index.js`, import and add a new object to the array, such as below
```javascript
{
  routeName: "RouteName",
  routerComponent: <ComponentName />,
},
```
### Adding new Tournament types
1. Add the new tournament type ENUM in the backend tournament.config
2. Add the new tournament type ENUM to the tournament.model
3. Create the tournament creation process in the tournament.creation.route
4. Add the new tournament ENUM in the frontend tournament.config
5. Add any new params to the frontend tournament creation
6. Add the new params to the reducer
7. Add the new params to the form input on the specific tournament type
8. Create the player allocation function in the `Backend`
9. Create the tournament display and place it inside `./src/components/Tournament/TournamentDisplays/`
10. Goto `./src/screens/TournamentScreen.js` and import the new display
11. Add the display to the `MatchDisplayComponent` function by adding a `if` statement based on the tournament type
    - Search for `TD5` for the correct placement function 


## Development Update Documentation
### 27/04/2021 - 1.0.0
- Added Message display
- Added Ability to mark messages as read
- UserScreen: Removed message button
- index: Remove unused import
- NavBar: Removed unused imports
- LeaderboardSegment: Added Toast, Change function imports, Added Logic
- TournamentBracketSegment: Updated match updating and model refreshing
- LoggedInContext: Removed unused imports
- redirectLogin: Removed unused imports
- HomeScreen: Removed unused imports
- TournamentScreen: Removed unused imports
- Navbar: Added home button
- index.css: Added onHover CSS
- CreateTournamentScreen: Fixed typo
- Added tournament sort by date created
- Fixed display date bug
- Add hoverable profile picture and clickable matches
- Remove firstnname and lastname inputs
- Added new tournament display components
- Changed account link button styling
- Import logo
- Added no results segment display
- Created new tournament creator
- Created new tournament creation selector
- Deleted old tournament creator
- Added advanced tournament creation
- Remove firstname and lastname inputs
- Added logo
- Added sorting function
- Added CSS
- Remove unused imports
- Added swiss round component
- Added swiss match component
- Added swiss tournament display
- Remove imports, and context imports
- Remove console log, Minor text changes
- Fixed imports, Minor table display changes, Added search bar
- Added free for all round component
- Added free for all player component
- Added free for all match component
- Added free for all tournament display
- Major UI/UX changes
- Fixed imports and toasts
- Fixed toast message
- Added tournament questions and dropdown menu
- Imported custom logo
- Imported new screens
- Updated Deps
- Removed deploy.bat

### 22/04/2021 - 0.7.4
- Index.js: Change context provider logic, Added toast context
- toffy.js: Added dev url
- navbar: Updated UI/UIX
- AdminTools: Remove unused imports, Added toast
- UserPlayingButtonGroup: Added Toasts
- LeaderboardSegment: Added Toasts
- TournamentBracketSegment: Added Toasts, Imports window dimension context
- Added new tournament card
- LoggedInContext: Formatted document
- Added Toast context
- Added window dimension context
- Updated CSS
- calculateCreated: Added displayShort date function
- redirectLogin: Change redirect pathname
- AccountCreateScreen: Removed preset state, Added Toasts, Major UI/UX changes, Added windowContext import
- CreateTournamentScreen: Added Toasts, Removed comments
- HomeScreen: Major UI/UX redesign
- LandingScreen: Major UI/UX redesign, Added windowContext import
- LoginScreen: Major UI/UX redesign, Added windowContext import
- TournamentScreen: Added Toasts
- UserEditScreen: Added Toasts, Added windowContext import
- UserScreen: Added Toasts, Removed comments, Added windowContext import
- Updated images
- Updated deps

### 20/04/2021 - DEPLOYED - 0.7.0
- Updated dev auto startup
- Added new user edit screen
- toffy: Added dev and deployment modes
- navbar: Capitalized menu items
- tournamentConfig: Added authorized profile images
- LoggedInContext: Added setUsername to context export
- Changed CSS files
- Added difference function
- CreateTournamentScreen: Major UI/UX changes to tournament creation
- TournamentScreen: Added comments
- UserScreen: Added profile edit button

### 19/04/2021 - 0.6.2
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

## Issues / Todo
- [x] Tournament Create Screen
- [x] Add new Leaderboard Tournament Type
- [x] Add Tournament Edit tools
- [x] Add user Edit tools
- [x] Update the look of the matches on the UserScreen
- [x] Add new list of user owned tournaments
- [x] Need to have some sort of search for non-owned tournaments
- [x] Need to have a message for when a user doesn't have any tournaments
- [x] When you visit a link like /home is shows Github 404 page not found 
- [x] Error on match saving
- [x] no toast on save tournament leaderboard
- [x] When you save a leaderboard score it doesn't show until reload page
- [x] show the tournament title on the profile screen where the player can go to the tournament
  - Feedback by tester
- [x] Be able to kick players from your games
  - [x] Fix bug so can only kick while joining
  - [x] Fixed bug where creator could kick themself 
- [x] Smart tournament type controller
  - I created a new screen to pick between simple and advanced
  - I created a the simple questions screen that lead to a display component
  - I created some data showing disadvantages of each type
  - [x] Create the function that decides which tournament type to use
  - [x] Create a view that shows the tournament type to the user
  - [x] Create another screens that gather any additional information the tournament needs
  - [x] When the player clicks submit take them to the newly created tournament
- [x] Create tournament screen says update profile
- [x] When saving player score on leaderboard need to update the score
- [x] Include tournament where everyone plays each other X amount of times then the winner is the team that won the most
- [x] Remove the firstname, lastname as its not needed
- [x] Have a toast on tournament join or leave
- [x] Cannot move player position in leaderboard
- [x] Leaderboard textAlign is having problems
- [x] Issue where if the user hasn't created any tournaments, player joined tournaments won't load
- [x] Need to adding loading screens
  - [x] TournamentScreen
  - [x] UserScreen
- [x] When you click the profile picture on the profile screen take you to the settings
  - Feedback by tester
- [x] Login screen `dont have account` text needs formatting
- [x] Tournament screen the wrong person is being highlighted to the user in the players section
  - Looks like its always the creator
- [x] Create the backend for the new tournament type freeforall
- [x] Create the playerAllocation
- [x] Create the updating function on the backend
- [x] Create the display on the frontend
- [x] Create the admin tools on the frontend to update it
- [x] There is a modal that needs styling on the single elimination page
- [x] Removed listed from tournament creation
- [x] Add some validation

## Author

👤 **Theo Clapperton**

* Website: https://teobot.github.io/
* Github: [@teobot](https://github.com/teobot)
* LinkedIn: [@theoClapperton](https://linkedin.com/in/theoClapperton)