import moment from 'moment'

function setDate (time, dateItem) {
  console.log(time, dateItem)
  time.year(dateItem.year)
  time.month(dateItem.month)
  time.date(dateItem.date)
}

function isSameDate (time, patternTime) {
  return time.year() === patternTime.year() && time.month() === patternTime.month() && time.date() === patternTime.date()
}

function dateItem (time, displayTime, selectedTime, currentTime) {
  return {
    date: time.date(),
    month: time.month(),
    year: time.year(),
    isDateOfDisplayMonth: time.month() === displayTime.month(),
    isSelectedDate: selectedTime !== null && isSameDate(selectedTime, time),
    isCurrentDate: isSameDate(currentTime, time),
    timestamp: time.unix()
  }
}

function dateArray (displayTime, selectedTime, currentTime) {
  const displayMonth = displayTime.month()
  /**
   * First day of current month
   */
  const displayMonthIterator = moment(displayTime).startOf('month')
  /**
   * Last day of last month
   */
  const lastMonthIterator = moment(displayMonthIterator).subtract(1, 'day')
  const calendarDays = []
  let protectLastMonthDateIsShownFlag = true
  let protectNextMonthDateIsShownFlag = true
  while (lastMonthIterator.day() !== 6 || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(dateItem(lastMonthIterator, displayTime, selectedTime, currentTime))
    lastMonthIterator.subtract(1, 'day')
    protectLastMonthDateIsShownFlag = false
  }
  while (displayMonthIterator.month() === displayMonth) {
    calendarDays.push(dateItem(displayMonthIterator, displayTime, selectedTime, currentTime))
    displayMonthIterator.add(1, 'day')
  }
  while (displayMonthIterator.day() !== 0 || protectNextMonthDateIsShownFlag) {
    calendarDays.push(dateItem(displayMonthIterator, displayTime, selectedTime, currentTime))
    displayMonthIterator.add(1, 'day')
    protectNextMonthDateIsShownFlag = false
  }
  // console.log(calendarDays)
  return calendarDays
}

export { dateArray, setDate }
