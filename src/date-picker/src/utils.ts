import type { Ref } from 'vue'
import type { NDateLocale } from '../../locales'
import type { FirstDayOfWeek, Value } from './interface'
import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  format,
  getDate,
  getDay,
  getMonth,
  getQuarter,
  getTime,
  getYear,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameWeek,
  isSameYear,
  isValid,
  parse,
  setYear,
  startOfMonth,
  startOfYear
} from 'date-fns'

function getDerivedTimeFromKeyboardEvent(
  prevValue: number | null,
  event: KeyboardEvent
): number {
  const now = getTime(Date.now())
  if (typeof prevValue !== 'number')
    return now
  switch (event.key) {
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

const matcherMap = {
  date: isSameDay,
  month: isSameMonth,
  year: isSameYear,
  quarter: isSameQuarter
} as const

function makeWeekMatcher(firstDayOfWeek: FirstDayOfWeek) {
  return (sourceTime: number, patternTime: number | Date) => {
    // date-fns: 0 - Sunday
    // naive-ui: 0 - Monday
    const weekStartsOn = ((firstDayOfWeek + 1) % 7) as FirstDayOfWeek
    return isSameWeek(sourceTime, patternTime, { weekStartsOn })
  }
}

function matchDate(
  sourceTime: number,
  patternTime: number | Date,
  type: 'date' | 'month' | 'year' | 'quarter'
): boolean
function matchDate(
  sourceTime: number,
  patternTime: number | Date,
  type: 'week',
  firstDayOfWeek: FirstDayOfWeek
): boolean
function matchDate(
  sourceTime: number,
  patternTime: number | Date,
  type: 'date' | 'month' | 'year' | 'quarter' | 'week',
  firstDayOfWeek: FirstDayOfWeek = 0
): boolean {
  const matcher
    = type === 'week' ? makeWeekMatcher(firstDayOfWeek) : matcherMap[type]
  return matcher(sourceTime, patternTime)
}

export interface DateItem {
  type: 'date'
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
  inSelectedWeek: boolean
  ts: number
}

export interface MonthItem {
  type: 'month'
  monthFormat: string
  dateObject: {
    month: number
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}

export interface YearItem {
  type: 'year'
  yearFormat: string
  dateObject: {
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}

export interface QuarterItem {
  type: 'quarter'
  quarterFormat: string
  dateObject: {
    quarter: number
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}

function dateOrWeekItem(
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  mode: 'date' | 'week',
  firstDayOfWeek: FirstDayOfWeek
): DateItem {
  if (mode === 'date') {
    return dateItem(time, monthTs, valueTs, currentTs)
  }
  else {
    return weekItem(time, monthTs, valueTs, currentTs, firstDayOfWeek)
  }
}

// date item's valueTs can be a tuple since two date may show in one panel, so
// any matched value would make it shown as selected
function dateItem(
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
    if (matchDate(valueTs[0], time, 'date'))
      startOfSpan = true
    if (matchDate(valueTs[1], time, 'date'))
      endOfSpan = true
  }
  const selected
    = valueTs !== null
    && (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time, 'date')
      || matchDate(valueTs[1], time, 'date')
      : matchDate(valueTs, time, 'date'))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    inSelectedWeek: false,
    startOfSpan,
    endOfSpan,
    selected,
    ts: getTime(time)
  }
}

function getMonthString(
  month: number,
  monthFormat: string,
  locale: NDateLocale['locale']
): string {
  const date = new Date(2000, month, 1).getTime()
  return format(date, monthFormat, { locale })
}

function getYearString(
  year: number,
  yearFormat: string,
  locale: NDateLocale['locale']
): string {
  const date = new Date(year, 1, 1).getTime()
  return format(date, yearFormat, { locale })
}

function getQuarterString(
  quarter: number,
  quarterFormat: string,
  locale: NDateLocale['locale']
): string {
  const date = new Date(2000, quarter * 3 - 2, 1).getTime()
  return format(date, quarterFormat, { locale })
}

function weekItem(
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  firstDayOfWeek: FirstDayOfWeek
): DateItem {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time && time < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time, 'week', firstDayOfWeek))
      startOfSpan = true
    if (matchDate(valueTs[1], time, 'week', firstDayOfWeek))
      endOfSpan = true
  }
  const inSelectedWeek
    = valueTs !== null
    && (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time, 'week', firstDayOfWeek)
      || matchDate(valueTs[1], time, 'week', firstDayOfWeek)
      : matchDate(valueTs, time, 'week', firstDayOfWeek))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    startOfSpan,
    endOfSpan,
    selected: false,
    inSelectedWeek,
    ts: getTime(time)
  }
}

function monthItem(
  monthTs: number,
  valueTs: number | null,
  currentTs: number,
  {
    monthFormat
  }: {
    monthFormat: string
  }
): MonthItem {
  return {
    type: 'month',
    monthFormat,
    dateObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    isCurrent: isSameMonth(currentTs, monthTs),
    selected: valueTs !== null && matchDate(valueTs, monthTs, 'month'),
    ts: getTime(monthTs)
  }
}

function yearItem(
  yearTs: number,
  valueTs: number | null,
  currentTs: number,
  {
    yearFormat
  }: {
    yearFormat: string
  }
): YearItem {
  return {
    type: 'year',
    yearFormat,
    dateObject: {
      year: getYear(yearTs)
    },
    isCurrent: isSameYear(currentTs, yearTs),
    selected: valueTs !== null && matchDate(valueTs, yearTs, 'year'),
    ts: getTime(yearTs)
  }
}

function quarterItem(
  quarterTs: number,
  valueTs: number | null,
  currentTs: number,
  {
    quarterFormat
  }: {
    quarterFormat: string
  }
): QuarterItem {
  return {
    type: 'quarter',
    quarterFormat,
    dateObject: {
      quarter: getQuarter(quarterTs),
      year: getYear(quarterTs)
    },
    isCurrent: isSameQuarter(currentTs, quarterTs),
    selected: valueTs !== null && matchDate(valueTs, quarterTs, 'quarter'),
    ts: getTime(quarterTs)
  }
}

/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 */
function dateArray(
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  strip: boolean = false,
  weekMode: boolean = false
): DateItem[] {
  const granularity = weekMode ? 'week' : 'date'
  const displayMonth = getMonth(monthTs)
  // First day of current month
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  // Last day of last month
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays: DateItem[] = []
  let protectLastMonthDateIsShownFlag = !strip
  while (
    getDay(lastMonthIterator) !== startDay
    || protectLastMonthDateIsShownFlag
  ) {
    calendarDays.unshift(
      dateOrWeekItem(
        lastMonthIterator,
        monthTs,
        valueTs,
        currentTs,
        granularity,
        startDay
      )
    )
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(
      dateOrWeekItem(
        displayMonthIterator,
        monthTs,
        valueTs,
        currentTs,
        granularity,
        startDay
      )
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  const endIndex = strip
    ? calendarDays.length <= 28
      ? 28
      : calendarDays.length <= 35
        ? 35
        : 42
    : 42
  while (calendarDays.length < endIndex) {
    calendarDays.push(
      dateOrWeekItem(
        displayMonthIterator,
        monthTs,
        valueTs,
        currentTs,
        granularity,
        startDay
      )
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  return calendarDays
}

function monthArray(
  yearAnchorTs: number,
  valueTs: number | null,
  currentTs: number,
  format: {
    monthFormat: string
  }
): MonthItem[] {
  const calendarMonths: MonthItem[] = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 12; i++) {
    calendarMonths.push(
      monthItem(getTime(addMonths(yearStart, i)), valueTs, currentTs, format)
    )
  }
  return calendarMonths
}

function quarterArray(
  yearAnchorTs: number,
  valueTs: number | null,
  currentTs: number,
  format: {
    quarterFormat: string
  }
): QuarterItem[] {
  const calendarQuarters: QuarterItem[] = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 4; i++) {
    calendarQuarters.push(
      quarterItem(
        getTime(addQuarters(yearStart, i)),
        valueTs,
        currentTs,
        format
      )
    )
  }
  return calendarQuarters
}

function yearArray(
  valueTs: number | null,
  currentTs: number,
  format: {
    yearFormat: string
  },
  rangeRef: Ref<[number, number]>
): YearItem[] {
  const range = rangeRef.value
  const calendarYears: YearItem[] = []
  const startTime = startOfYear(setYear(new Date(), range[0]))
  for (let i = 0; i < range[1] - range[0]; i++) {
    calendarYears.push(
      yearItem(getTime(addYears(startTime, i)), valueTs, currentTs, format)
    )
  }
  return calendarYears
}

function strictParse(
  string: string,
  pattern: string,
  backup: Date,
  option: {
    locale: NDateLocale['locale']
  }
): Date {
  const result = parse(string, pattern, backup, option)
  if (!isValid(result))
    return result
  else if (format(result, pattern, option) === string)
    return result
  else return new Date(Number.NaN)
}

function getDefaultTime(timeValue: string | undefined):
  | {
    hours: number
    minutes: number
    seconds: number
  }
  | undefined {
  if (timeValue === undefined) {
    return undefined
  }
  if (typeof timeValue === 'number') {
    return timeValue
  }
  const [hour, minute, second] = timeValue.split(':')
  return {
    hours: Number(hour),
    minutes: Number(minute),
    seconds: Number(second)
  }
}

function pluckValueFromRange(
  value: Value | null,
  type: 'start' | 'end'
): number | null {
  return Array.isArray(value) ? value[type === 'start' ? 0 : 1] : null
}

export {
  dateArray,
  getDefaultTime,
  getDerivedTimeFromKeyboardEvent,
  getMonthString,
  getQuarterString,
  getYearString,
  monthArray,
  pluckValueFromRange,
  quarterArray,
  strictParse,
  yearArray
}
