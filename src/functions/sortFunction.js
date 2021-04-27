export function sortComparison(a, b) {
  if (!isNaN(a.score) && !isNaN(b.score)) {
    // both are a number so lets score by numbers
    let aScore = parseInt(a.score);
    let bScore = parseInt(b.score);
    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  } else {
    // The score is not a number so try something else
    // Check if a valid time
  }
  if (a.score < b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}
