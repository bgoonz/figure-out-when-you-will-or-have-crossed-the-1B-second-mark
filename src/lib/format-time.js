
function formatTime(date) {
  let hour = date.hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  const mins = date.minute;
  const zeroPaddedMins = mins < 10 ? `0${mins}` :  mins;
  return `${hour}:${zeroPaddedMins} ${date.hour < 12 ? 'am' : 'pm'}`;
}

export { formatTime };
