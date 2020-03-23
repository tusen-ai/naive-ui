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
import { KEY_CODE } from '../event/keyCode'

function getDerivedTimeFromKeyboardEvent (prevValue, event) {
  const now = getTime(Date.now())
  const valueIsNumber = typeof prevValue === 'number'
  switch (event.keyCode) {
    case KEY_CODE.UP:
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, -7))
    case KEY_CODE.DOWN:
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, 7))
    case KEY_CODE.RIGHT:
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, 1))
    case KEY_CODE.LEFT:
      if (!valueIsNumber) return now
      return getTime(addDays(prevValue, -1))
  }
  return prevValue
}

function matchDate (sourceTime, patternTime) {
  if (Array.isArray(sourceTime)) {
    return sourceTime.some(time => isSameDay(time, patternTime))
  } else {
    return isSameDay(sourceTime, patternTime)
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
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    isDateOfDisplayMonth: isSameMonth(time, displayTime),
    isInSpan,
    isSelectedDate: selectedTime !== null && matchDate(selectedTime, time),
    isCurrentDate: matchDate(currentTime, time),
    timestamp: getTime(time)
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
  const displayMonth = getMonth(displayTime)
  /**
   * First day of current month
   */
  let displayMonthIterator = startOfMonth(displayTime)
  /**
   * Last day of last month
   */
  let lastMonthIterator = addDays(displayMonthIterator, -1)
  const calendarDays = []
  let protectLastMonthDateIsShownFlag = true
  while (getDay(lastMonthIterator) !== 6 || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(dateItem(lastMonthIterator, displayTime, selectedTime, currentTime))
    lastMonthIterator = addDays(lastMonthIterator, -1)
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(dateItem(displayMonthIterator, displayTime, selectedTime, currentTime))
    displayMonthIterator = addDays(displayMonthIterator, 1)
  }
  while (calendarDays.length < 42) {
    calendarDays.push(dateItem(displayMonthIterator, displayTime, selectedTime, currentTime))
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
