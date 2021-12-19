import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { formatTime } from './lib/format-time';

import { PrettyDateDiff } from './ui/pretty-date-diff';

function dobToSecondsAlive(timeOfBirth) {
  return (
    Math.floor(Date.now() / 1000) -
    Math.floor(timeOfBirth.toMillis() / 1000)
  ); 
}

function PrettifyTzName({ name }) {
  const parts = name.split('/');
  return parts[parts.length - 1].replaceAll('_', ' ');
}

const ONE_BILLION_SECONDS = Math.pow(10, 9);

const localTz = DateTime.now().zoneName;

function CalculatedInfo({ timeOfBirth }) {
  const [secondsAlive, setSecondsAlive] = useState(dobToSecondsAlive(timeOfBirth));

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsAlive(dobToSecondsAlive(timeOfBirth));
    }, 1000);
    return () => clearInterval(id);
  }, [timeOfBirth]);

  const oneBillionSecondsDate = timeOfBirth
    .setZone(localTz)
    .plus({ seconds: ONE_BILLION_SECONDS });

  const isLocal = timeOfBirth.zoneName === localTz;

  if (secondsAlive > Math.pow(10, 9)) {
    return (
      <>
        <div className="calculated-info-row">
          Birthday:
          {' '}{timeOfBirth.toJSDate().toDateString()} at
          {' '}{formatTime(timeOfBirth)}.
        </div>

        <div className="calculated-info-row">
          Seconds alive: <b>{secondsAlive.toLocaleString()}</b>
        </div>

        <div className="calculated-info-row">
          It looks like you already had your 1 billionth second! :)
        </div>
      </>
    );
  }

  return (
    <>
      {/* <div className="calculated-info-row">
        <button id="edit-dob-btn">
          Edit date of birth
        </button>
      </div> */}

      <div className="calculated-info-row">
        Date and time of birth: 
        {' '}{timeOfBirth.toJSDate().toDateString()} at
        {' '}{formatTime(timeOfBirth)}
        {!isLocal && 
          <>
            {' '}in <PrettifyTzName name={timeOfBirth.zoneName} />
          </>
        }
        .
      </div>            

      <div className="calculated-info-row">
        Seconds alive: <b>{secondsAlive.toLocaleString()}</b>
      </div>

      <div className="calculated-info-row">
        You will be one billion seconds old on
        {' '}{oneBillionSecondsDate.toJSDate().toDateString()} at
        {' '}{formatTime(oneBillionSecondsDate)}
        {!isLocal ? <> in local time.</> : <>.</>}
      </div>

      <div className="calculated-info-row">
        This is in <PrettyDateDiff date={oneBillionSecondsDate} />.
      </div>
    </>
  );
}

export { CalculatedInfo };
