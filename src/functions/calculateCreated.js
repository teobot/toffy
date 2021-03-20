const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

const calculateCreated = (date) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow();
};

export default calculateCreated;
