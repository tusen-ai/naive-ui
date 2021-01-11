import {
  isValid,
  isSameDay,
  getDate,
  getMonth,
  getYear,
  isSameMonth,
  getTime,
  startOfMonth,
  addDays,
  getDay,
  parse,
  format
} from 'date-fns'

function getDerivedTimeFromKeyboardEvent (prevValue, event) {
  const now = getTime(Date.now())
  const valueIsNumber = typeof prevValue === 'number'
  switch (event.key) {
    case 'ArrowUp':
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, -7))
    case 'ArrowDown':
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, 7))
    case 'ArrowRight':
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, 1))
    case 'ArrowLeft':
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, -1))
  }
  return prevValue
}

function matchDate (sourceTime, patternTime) {
  if (Array.isArray(sourceTime)) {
    return sourceTime.some((time) => isSameDay(time, patternTime))
  } else {
    return isSameDay(sourceTime, patternTime)
  }
}

function dateItem (time, monthTs, valueTs, currentTs) {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time && time < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time)) startOfSpan = true
    if (matchDate(valueTs[1], time)) endOfSpan = true
  }
  return {
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time),
    inSpan,
    startOfSpan,
    endOfSpan,
    selected: valueTs !== null && matchDate(valueTs, time),
    ts: getTime(time)
  }
}

/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 * @param {number} monthTs
 * @param {number} valueTs
 * @param {number} currentTs
 */
function dateArray (monthTs, valueTs, currentTs) {
  const displayMonth = getMonth(monthTs)
  // First day of current month
  let displayMonthIterator = startOfMonth(monthTs)
  // Last day of last month
  let lastMonthIterator = addDays(displayMonthIterator, -1)
  const calendarDays = []
  let protectLastMonthDateIsShownFlag = true
  while (getDay(lastMonthIterator) !== 6 || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(
      dateItem(lastMonthIterator, monthTs, valueTs, currentTs)
    )
    lastMonthIterator = addDays(lastMonthIterator, -1)
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(
      dateItem(displayMonthIterator, monthTs, valueTs, currentTs)
    )
    displayMonthIterator = addDays(displayMonthIterator, 1)
  }
  while (calendarDays.length < 42) {
    calendarDays.push(
      dateItem(displayMonthIterator, monthTs, valueTs, currentTs)
    )
    displayMonthIterator = addDays(displayMonthIterator, 1)
  }
  return calendarDays
}

function strictParse (string, pattern, backup, option) {
  const result = parse(string, pattern, backup, option)
  if (!isValid(result)) return result
  else if (format(result, pattern, option) === string) return result
  else return new Date(NaN)
}

export { dateArray, strictParse, getDerivedTimeFromKeyboardEvent }
