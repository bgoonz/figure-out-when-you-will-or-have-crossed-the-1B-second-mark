import { DateTime } from 'luxon';

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * 60;
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;

function PrettyDateDiff({ date, anchorDate = null }) {
  anchorDate = anchorDate || DateTime.now();
  const [a, b] = date > anchorDate ? [anchorDate, date] : [date, anchorDate];
  const diffInSeconds = Math.floor((b.toMillis() - a.toMillis()) / 1000);

  let remainder = diffInSeconds;
  const numDays = Math.floor(remainder / SECONDS_PER_DAY);
  remainder = remainder % SECONDS_PER_DAY;
  const numHours = Math.floor(remainder / SECONDS_PER_HOUR);
  remainder = remainder % SECONDS_PER_HOUR;
  const numMinutes = Math.floor(remainder / SECONDS_PER_MINUTE);
  const numSeconds = remainder % SECONDS_PER_MINUTE;

  return (
    <>
      {numDays} {pluralize('day', numDays)}
      , {numHours} {pluralize('hour', numHours)}
      , {numMinutes} {pluralize('minute', numMinutes)}
      , and {numSeconds} {pluralize('second', numSeconds)}
    </>
  );
}

function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

export { PrettyDateDiff };
