import { states } from "../components/Tournament/TournamentConfig";

const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const calendar = require("dayjs/plugin/calendar");

const calculateCreated = (date) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

export const displayDate = (date) => {
  dayjs.extend(relativeTime);
  return dayjs(date).format(`MMMM DD, YYYY [at] hh:mm A`);
};

export const shortDisplayDate = (date) => {
  dayjs.extend(calendar);

  return dayjs().calendar(dayjs(date), {
    sameDay: "[Today, ] H:mm",
    nextDay: "MMM DD [,] H:mm",
    nextWeek: "MMM DD [,] H:mm",
    lastDay: "MMM DD [,] H:mm",
    lastWeek: "MMM DD [,] H:mm",
    sameElse: "MMM DD H:mm",
  });
};

export const displayState = (state) => {
  if (state === states.JOIN) {
    return "Joinable";
  }
  if (state === states.PLAY) {
    return "In Progress";
  }
  if (state === states.END) {
    return "Ended";
  }
};

export default calculateCreated;
