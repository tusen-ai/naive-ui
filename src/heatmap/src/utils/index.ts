import type { DayRect } from '../interface'
import type {
  HeatmapData,
  HeatmapDataItem,
  HeatmapFirstDayOfWeek
} from '../public-types'
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfWeek,
  endOfYear,
  getDay,
  isWithinInterval,
  startOfDay,
  startOfWeek,
  startOfYear,
  subYears
} from 'date-fns'
import { groupBy } from 'lodash-es'

/** get color by value/maxValue */
export function calcColorByValue(
  colors: string[],
  value: number | null | undefined,
  maxValue: number
): string {
  if (maxValue === 0 || value === null || value === undefined || value <= 0) {
    return colors[0]
  }

  const ratio = Math.min(value / maxValue, 1)
  const maxLevel = colors.length - 1
  const level = Math.min(Math.ceil(ratio * maxLevel), maxLevel)

  return colors[level]
}

/**
 * fill gaps for the given data
 *
 * fill gaps [firstDate,lastDate] with value 0
 *
 * [firstCalendarDate,firstDate] and [lastDate,lastCalendarDate] with value null
 */
export function completeDataGaps(
  data: HeatmapData,
  firstDayOfWeek: HeatmapFirstDayOfWeek
): HeatmapData {
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp)
  const firstDate = sortedData[0].timestamp
  const lastDate = sortedData[sortedData.length - 1].timestamp

  const firstCalendarDate = startOfWeek(firstDate, {
    weekStartsOn: firstDayOfWeek
  })
  const lastCalendarEndDate = endOfWeek(lastDate, {
    weekStartsOn: firstDayOfWeek
  })

  const dataMap = new Map(
    sortedData.map(d => [startOfDay(d.timestamp).getTime(), d])
  )

  const allCalendarDates = eachDayOfInterval({
    start: firstCalendarDate,
    end: lastCalendarEndDate
  })
  return allCalendarDates.map((date) => {
    const key = startOfDay(date).getTime()
    const dateValue = dataMap.get(key)

    if (dateValue) {
      return dateValue
    }

    const value = isWithinInterval(date, { start: firstDate, end: lastDate })
      ? 0
      : null
    return { timestamp: date.getTime(), value }
  })
}

/**
 * Create a DayRect object with position information
 */
export function createDayRect(
  item: HeatmapDataItem,
  calendarStartDate: number,
  weekStartOn: number,
  colors: string[],
  maxValue: number
): DayRect {
  const daysFromGridStart = differenceInCalendarDays(
    item.timestamp,
    calendarStartDate
  )

  const colIndex = Math.floor(daysFromGridStart / 7)
  const dayOfWeek = getDay(item.timestamp)
  const rowIndex = (dayOfWeek - weekStartOn + 7) % 7

  return {
    timestamp: item.timestamp,
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
  const groupedByRow = groupBy(items, getRowIndex)

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
 * This creates a 7x53 matrix (typical year layout) filled with loading cells
 */
export function createLoadingMatrix(
  firstDayOfWeek: HeatmapFirstDayOfWeek
): DayRect[][] {
  const rows = 7
  const cols = 53
  const currentTimestamp = Date.now()

  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      timestamp: currentTimestamp,
      value: 0,
      color: '#000000',
      dayOfWeek: (firstDayOfWeek + row) % 7,
      rowIndex: row,
      colIndex: col
    })))
}

/**
 * Generate heatmap data for mock purposes.
 * This function generates random data and the result is not stable.
 * @param range - 'recent' for last year, or a specific year number
 */
export function heatmapMockData(year?: 'recent' | number): HeatmapData {
  let start: Date
  let end: Date

  if (year === undefined || year === 'recent') {
    end = new Date()
    start = subYears(end, 1)
  }
  else {
    const _year = Number(year)
    start = startOfYear(new Date(_year, 0, 1))
    end = endOfYear(new Date(_year, 11, 31))
  }

  const allDays = eachDayOfInterval({ start, end })

  return allDays.map((day) => {
    const dayOfWeek = day.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    if (isWeekend && Math.random() < 0.7) {
      return { timestamp: day.getTime(), value: 0 }
    }

    if (!isWeekend && Math.random() < 0.15) {
      return { timestamp: day.getTime(), value: 0 }
    }

    const value = Math.floor(Math.random() ** 2 * 40) + 1

    return { timestamp: day.getTime(), value }
  })
}
