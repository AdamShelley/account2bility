export const deadline = (day, month, year) => {
  // Sanatize the data

  let endDate = new Date(year, month, day).getTime();
  // Calculate the time from now untl the deadline
  const timeNow = new Date().getTime();
  const daysLeft = endDate - timeNow;
  // return the amount of days left
  if (daysLeft >= 0) {
    let days = Math.floor(daysLeft / (1000 * 60 * 60 * 24));
    return days;
  } else {
    return 0;
  }
};
