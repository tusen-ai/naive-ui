import type { DayRect, RectData, WeekStartDay } from '../interface'
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfWeek,
  endOfYear,
  format,
  getDay,
  isWithinInterval,
  startOfWeek,
  startOfYear,
  subYears
} from 'date-fns'
import { groupBy } from 'lodash-es'

/** get color by value/maxValue */
export function calcColorByValue(
  colors: string[],
  value: number | null,
  maxValue: number
): string {
  if (maxValue === 0 || value === null || value <= 0) {
    return colors[0]
  }

  const ratio = Math.min(value / maxValue, 1)
  const maxLevel = colors.length - 1
  const index = Math.min(Math.ceil(ratio * maxLevel), maxLevel)

  return colors[index]
}

/**
 * fill gaps for the given data
 *
 * fill gaps [firstDate,lastDate] with value 0
 *
 * [firstCalendarDate,firstDate] and [lastDate,lastCalendarDate] with value null
 */
export function completeDataGaps(
  data: RectData[],
  weekStartOn: WeekStartDay = 0
): RectData[] {
  const sortedData = [...data].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  )
  const firstDate = sortedData[0].date
  const lastDate = sortedData[sortedData.length - 1].date

  const firstCalendarDate = startOfWeek(firstDate, {
    weekStartsOn: weekStartOn
  })
  const lastCalendarEndDate = endOfWeek(lastDate, { weekStartsOn: weekStartOn })

  const dataMap = new Map(
    sortedData.map(d => [format(d.date, 'yyyy-MM-dd'), d])
  )

  const allCalendarDates = eachDayOfInterval({
    start: firstCalendarDate,
    end: lastCalendarEndDate
  })

  return allCalendarDates.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const existingData = dataMap.get(dateStr)

    if (existingData) {
      return existingData
    }

    const value = isWithinInterval(date, { start: firstDate, end: lastDate })
      ? 0
      : null
    return { date: new Date(date), value }
  })
}

/**
 * Create a DayRect object with position information
 */
export function createDayRect(
  item: RectData,
  calendarStartDate: Date,
  weekStartOn: number,
  colors: string[],
  maxValue: number
): DayRect {
  const daysFromGridStart = differenceInCalendarDays(
    item.date,
    calendarStartDate
  )
  const colIndex = Math.floor(daysFromGridStart / 7)
  const dayOfWeek = getDay(item.date)
  const rowIndex = (dayOfWeek - weekStartOn + 7) % 7

  return {
    date: item.date,
    value: item.value,
    color: calcColorByValue(colors, item.value, maxValue),
    dayOfWeek,
    rowIndex,
    colIndex
  }
}

/**
 * Create a sparse matrix from items with position information
 */
export function createSparseMatrix<T>(
  rows: number,
  items: T[],
  getRowIndex: (item: T) => number,
  getColIndex: (item: T) => number
): T[][] {
  // Group items by row index using lodash for clarity
  const groupedByRow = groupBy(items, getRowIndex)
  // Create matrix with the specified number of rows
  return Array.from({ length: rows }, (_, rowIndex) => {
    const rowData = groupedByRow[rowIndex] || []
    const row: T[] = []
    rowData.forEach((item) => {
      row[getColIndex(item)] = item
    })
    return row
  })
}

/**
 * Generate heatmap data for mock purposes.
 * This function generates random data and the result is not stable.
 * @param range - 'recent' for last year, or a specific year number
 */
export function generateHeatmapData(range?: 'recent' | number): RectData[] {
  let start: Date
  let end: Date

  if (range === undefined || range === 'recent') {
    end = new Date()
    start = subYears(end, 1)
  }
  else {
    const year = Number(range)
    start = startOfYear(new Date(year, 0, 1))
    end = endOfYear(new Date(year, 11, 31))
  }

  const allDays = eachDayOfInterval({ start, end })

  return allDays.map((day) => {
    const dayOfWeek = day.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    if (isWeekend && Math.random() < 0.7) {
      return { date: day, value: 0 }
    }

    if (!isWeekend && Math.random() < 0.15) {
      return { date: day, value: 0 }
    }

    const value = Math.floor(Math.random() ** 2 * 40) + 1

    return { date: day, value }
  })
}

/**
 * This creates a 7x53 matrix (typical year layout) filled with loading cells
 */
export function createLoadingMatrix(
  weekStartOn: WeekStartDay = 0
): DayRect[][] {
  const rows = 7
  const cols = 53 // Approximate number of weeks in a year
  const currentDate = new Date()

  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      date: currentDate,
      value: 0,
      color: '#000000', // Will be overridden by loading styles
      dayOfWeek: (weekStartOn + row) % 7,
      rowIndex: row,
      colIndex: col
    })))
}
