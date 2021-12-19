import React, { useState } from 'react';
import { DateTime } from 'luxon';

import { range } from './lib/range';
import { RadInput, RadSelect } from './ui/rad-form';

import { IANATimeZones } from './lib/timezones';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildDayValues(numDays) {
  return range(1, numDays).map(num => "" + num);
}

const dayValuesDefault = buildDayValues(31);

// `month` is 0-indexed.
function daysInMonth(year, month) {
  // Passing `0` for 3rd arg of `new Date()` gives the last day of prev month.
  return new Date(year, month + 1, 0).getDate();
}

const startYear = 1920;
const currYear = DateTime.now().year;
const yearValues = range(startYear, currYear).map(num => "" + num).reverse();

const localTz = DateTime.now().zoneName;

function convertToDate({ month, day, year, time, tz }) {
  if (!(typeof time === 'string' && time.includes(':'))) {
    // TODO: better error handling.
    console.error('time control did not do what I expect');
    return;
  }
  const [hour, minute] = time.split(":").map(x => parseInt(x));

  let dateObj = {
    year: parseInt(year),
    month: parseInt(month) + 1,
    day: parseInt(day),
    hour,
    minute,
  };
  return DateTime.fromObject(dateObj, { zone: tz });
}

function DobForm({ onSubmit }) {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [time, setTime] = useState('');
  const [dayValues, setDayValues] = useState(dayValuesDefault);
  const [tz, setTz] = useState(localTz);
  const [isEditingTz, setIsEditingTz] = useState(false);

  const setTzAndClose = val => {
    setTz(val);
    setIsEditingTz(false);
  };
  const toggleTimezoneEditor = () => setIsEditingTz(!isEditingTz);

  const updateDayValuesAndDay = (year, month) => {
    // Must use the passed in values here, not the ones from `useState` above,
    // as one of the values will be stale.
    if (year.length > 0 && month.length > 0) {
      const numDays = daysInMonth(parseInt(year), parseInt(month));
      setDayValues(buildDayValues(numDays));

      // Reset `day` if the value is now invalid
      if (numDays < day) {
        setDay('');
      }
    }
  };

  const setMonthAndThenDayValues = (val) => {
    setMonth(val);
    updateDayValuesAndDay(year, val);
  };

  const setYearAndThenDayValues = (val) => {
    setYear(val);
    updateDayValuesAndDay(val, month);
  };

  const isFormComplete = month && day && year && time;

  return (
    <form id="dob-form" className="dob-form">
      <div className="form-row">
        Enter your date and time of birth:
      </div>

      <div className="form-row">
        <RadSelect value={year} onChange={setYearAndThenDayValues} required>
          <option disabled selected={!!year} value="">Year</option>
          {yearValues.map(value =>
            <option value={value} key={value}>{value}</option>
          )}
        </RadSelect>

        <RadSelect value={month} onChange={setMonthAndThenDayValues} required>
          {/* Source: https://stackoverflow.com/a/29806043 */}
          {/* TODO: Fix display bug in Chrome */}
          <option disabled selected={!!month} value=""> Month</option>
          {monthNames.map((name, i) =>
            <option value={i} key={name}>{name}</option>
          )}
        </RadSelect>

        <RadSelect value={day} onChange={setDay} required>
          <option disabled selected={!!day} value="">Day</option>
          {dayValues.map(value =>
            <option value={value} key={value}>{value}</option>
          )}
        </RadSelect>

        <RadInput type="time" value={time} onChange={setTime} required />
      </div>

      <div className="form-row save-button">
        <button
          onClick={event => {
            event.preventDefault();
            onSubmit(convertToDate({ month, day, year, time, tz }));
          }}
          disabled={!isFormComplete}
        >
          Save
        </button>
      </div>

      <div className="tz-editor-row">
        <span className="tz-label">Timezone:</span>
        {isEditingTz ? (
          <RadSelect value={tz} onChange={setTzAndClose} required>
            {IANATimeZones.map(name =>
              <option value={name} key={name}>{name}</option>
            )}
          </RadSelect>
        ) : (
          <span className="current-tz">{tz}</span>
        )}

        <span className="tz-select-opener" onClick={toggleTimezoneEditor}>
          {isEditingTz ? 'done' : 'edit'}
        </span>
      </div>
    </form>
  );
}

export { DobForm };
