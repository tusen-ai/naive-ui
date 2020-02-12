// import moment from 'moment'
import isValid from 'date-fns/isValid'
import isSameDay from 'date-fns/isSameDay'
import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import isSameMonth from 'date-fns/isSameMonth'
import getTime from 'date-fns/getTime'
import startOfMonth from 'date-fns/startOfMonth'
import addDays from 'date-fns/addDays'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import format from 'date-fns/format'

function matchDate (sourceTime, patternTime) {
  if (Array.isArray(sourceTime)) {
    // console.log(sourceTime, patternTime, sourceTime.some(time => isSameDay(time, patternTime)))
    return sourceTime.some(time => isSameDay(time, patternTime))
    // return time.some(t => t.year() === patternTime.year() && t.month() === patternTime.month() && t.date() === patternTime.date())
  } else {
    return isSameDay(sourceTime, patternTime)
    // return time.year() === patternTime.year() && time.month() === patternTime.month() && time.date() === patternTime.date()
  }
}

function dateItem (time, displayTime, selectedTime, currentTime) {
  let isInSpan = false
  if (Array.isArray(selectedTime)) {
    if (selectedTime[0] < time && time < selectedTime[1]) {
      isInSpan = true
    }
  }
  return {
    dateObject: {
      date: getDate(time), // time.date(),
      month: getMonth(time), // time.month(),
      year: getYear(time) // time.year(),
    },
    isDateOfDisplayMonth: isSameMonth(time, displayTime), // time.month() === displayTime.month(),
    isInSpan,
    isSelectedDate: selectedTime !== null && matchDate(selectedTime, time),
    isCurrentDate: matchDate(currentTime, time),
    timestamp: getTime(time) // time.valueOf()
  }
}

/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 * @param {number} displayTime
 * @param {number} selectedTime
 * @param {number} currentTime
 */
function dateArray (displayTime, selectedTime, currentTime) {
  const displayMonth = getMonth(displayTime) // displayTime.month()
  /**
   * First day of current month
   */
  let displayMonthIterator = startOfMonth(displayTime) // moment(displayTime).startOf('month')
  /**
   * Last day of last month
   */
  let lastMonthIterator = addDays(displayMonthIterator, -1) // moment(displayMonthIterator).subtract(1, 'day')
  const calendarDays = []
  let protectLastMonthDateIsShownFlag = true
  while (getDay(lastMonthIterator) !== 6 || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(dateItem(lastMonthIterator, displayTime, selectedTime, currentTime))
    lastMonthIterator = addDays(lastMonthIterator, -1) // .subtract(1, 'day')
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(dateItem(displayMonthIterator, displayTime, selectedTime, currentTime))
    displayMonthIterator = addDays(displayMonthIterator, 1) // .add(1, 'day')
  }
  while (calendarDays.length < 42) {
    calendarDays.push(dateItem(displayMonthIterator, displayTime, selectedTime, currentTime))
    displayMonthIterator = addDays(displayMonthIterator, 1)
    // displayMonthIterator.add(1, 'day')
  }
  // console.log(calendarDays, selectedTime)
  return calendarDays
}

function strictParse (string, pattern, backup) {
  const result = parse(string, pattern, backup)
  if (!isValid(result)) return result
  else if (format(result, pattern) === string) return result
  else return new Date(NaN)
}

export { dateArray, strictParse }
