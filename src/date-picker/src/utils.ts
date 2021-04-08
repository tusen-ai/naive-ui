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
  format,
  Locale
} from 'date-fns'

function getDerivedTimeFromKeyboardEvent (
  prevValue: number | null,
  event: KeyboardEvent
): number {
  const now = getTime(Date.now())
  if (typeof prevValue !== 'number') return now
  switch (event.code) {
    case 'ArrowUp':
      return getTime(addDays(prevValue, -7))
    case 'ArrowDown':
      return getTime(addDays(prevValue, 7))
    case 'ArrowRight':
      return getTime(addDays(prevValue, 1))
    case 'ArrowLeft':
      return getTime(addDays(prevValue, -1))
  }
  return now
}

function matchDate (
  sourceTime: number[] | number,
  patternTime: number | Date
): boolean {
  if (Array.isArray(sourceTime)) {
    return sourceTime.some((time) => isSameDay(time, patternTime))
  } else {
    return isSameDay(sourceTime, patternTime)
  }
}

export interface DateItem {
  dateObject: {
    date: number
    month: number
    year: number
  }
  inCurrentMonth: boolean
  isCurrentDate: boolean
  inSpan: boolean
  startOfSpan: boolean
  endOfSpan: boolean
  selected: boolean
  ts: number
}

function dateItem (
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number
): DateItem {
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
 */
function dateArray (
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6
): DateItem[] {
  const displayMonth = getMonth(monthTs)
  // First day of current month
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  // Last day of last month
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays = []
  let protectLastMonthDateIsShownFlag = true
  while (
    getDay(lastMonthIterator) !== startDay ||
    protectLastMonthDateIsShownFlag
  ) {
    calendarDays.unshift(
      dateItem(lastMonthIterator, monthTs, valueTs, currentTs)
    )
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(
      dateItem(displayMonthIterator, monthTs, valueTs, currentTs)
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  while (calendarDays.length < 42) {
    calendarDays.push(
      dateItem(displayMonthIterator, monthTs, valueTs, currentTs)
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  return calendarDays
}

function strictParse (
  string: string,
  pattern: string,
  backup: Date,
  option: {
    locale: Locale
  }
): Date {
  const result = parse(string, pattern, backup, option)
  if (!isValid(result)) return result
  else if (format(result, pattern, option) === string) return result
  else return new Date(NaN)
}

export { dateArray, strictParse, getDerivedTimeFromKeyboardEvent }
