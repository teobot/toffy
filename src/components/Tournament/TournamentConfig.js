// Tournament enums

export const tournament_types = {
  LEADERBOARD: "Leaderboard",
  SINGLE_ELIMINATION: "Single Elimination",
  SWISS: "Swiss",
  FREEFORALL: "Free For All",
};

export const tournament_decisions = {
  Leaderboard: {
    title: "Leaderboard",
    type: tournament_types.LEADERBOARD,
    desc: "Players are ranked against each other based on a common variable.",
    advantages: [
      "All players can participate",
      "Can go on for an infinite length of time",
    ],
    disadvantages: [
      "Players might not play the same number of games",
      "Hard to keep fair with a large variance of player ability",
    ],
    additionalInfo: [
      {
        inputPlaceholder: "Score Title",
        subTitle: "What each player will be scored upon.",
        value: "scoreTitle",
        type: "text",
      },
    ],
  },
  "Free For All": {
    title: "Free For ALl",
    type: tournament_types.FREEFORALL,
    desc: "Players all compete at the same time against each other.",
    advantages: [
      "High player participation",
      "Great for casual large player size",
    ],
    disadvantages: [
      "Low player retention if a single player has a high skill level",
    ],
    additionalInfo: [
      {
        inputPlaceholder: "Number Of Rounds",
        subTitle: "How many rounds do you want to play?",
        value: "rounds",
        type: "number",
      },
    ],
  },
  "Single Elimination": {
    title: "Single Elimination",
    type: tournament_types.SINGLE_ELIMINATION,
    desc: "Player VS Player, Winner plays winner, losers are eliminated.",
    advantages: [
      "Good for large player bases",
      "Quick when large amount of players",
    ],
    disadvantages: [
      "Bad for player participation",
      "Requires at minimum 4 players",
    ],
    additionalInfo: [],
  },
  Swiss: {
    title: "Swiss",
    type: tournament_types.SWISS,
    desc:
      "Winner plays winner but if they lose, they play a loser instead of being eliminated.",
    advantages: [
      "High player participation",
      "Takes same amount of time as a single elimination",
      "Great for physical education classes or recreational settings",
    ],
    disadvantages: ["Best if players have similar player skill"],
    additionalInfo: [
      {
        inputPlaceholder: "Number Of Rounds",
        value: "rounds",
        type: "number",
        subTitle: "How many rounds do you want to play?",
      },
      {
        inputPlaceholder: "Points For Loss",
        value: "pointsLoss",
        type: "number",
        subTitle: "Points for a loss",
      },
      {
        inputPlaceholder: "Points For Win",
        value: "pointsWin",
        type: "number",
        subTitle: "Points for each win",
      },
    ],
  },
};

export const tournament_dropdown = [
  {
    key: tournament_types.LEADERBOARD,
    value: tournament_types.LEADERBOARD,
    text: tournament_types.LEADERBOARD,
  },
  {
    key: tournament_types.SINGLE_ELIMINATION,
    value: tournament_types.SINGLE_ELIMINATION,
    text: tournament_types.SINGLE_ELIMINATION,
  },
  {
    key: tournament_types.SWISS,
    value: tournament_types.SWISS,
    text: tournament_types.SWISS,
  },
  {
    key: tournament_types.FREEFORALL,
    value: tournament_types.FREEFORALL,
    text: tournament_types.FREEFORALL,
  },
];

export const states = {
  JOIN: "Joining",
  PLAY: "Playing",
  END: "Ended",
};

// Allowed User Profile images
export const ALLOWED_PROFILE_IMAGES = [
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-001.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-003.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-002.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-004.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-005.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-006.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-007.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-008.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-009.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-010.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-011.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-012.jpg",
  "https://raw.githubusercontent.com/teobot/toffy-bucket/main/profle-image-013.jpg",
];
