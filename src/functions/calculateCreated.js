import { states } from "../components/Tournament/TournamentConfig";

const dayjs = require("dayjs");

const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const calculateCreated = (date) => {
  return dayjs(date).fromNow();
};

export const displayDate = (date) => {
  return dayjs(date).format(`MMMM DD, YYYY [at] hh:mm A`);
};

export const shortDisplayDate = (date) => {
  return dayjs(date).format(`MMM DD [,] H:mm`);
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
