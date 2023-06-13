import { getHours } from 'date-fns/esm'
import { type MaybeArray, throwError } from '../../_utils'

export const time = {
  amHours: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11'
  ],
  pmHours: [
    '12',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11'
  ],
  hours: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
  ],
  minutes: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ],
  seconds: [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59'
  ],
  period: ['AM', 'PM']
}

export function getFixValue (value: number): string {
  return `00${value}`.slice(-2)
}

// TODO: refactor the logic, it's somehow a patch logic
export function getTimeUnits (
  defaultValue: string[],
  stepOrList: MaybeArray<number> | undefined,
  isHourWithAmPm?: 'am' | 'pm'
): string[] {
  if (Array.isArray(stepOrList)) {
    return (
      isHourWithAmPm === 'am'
        ? stepOrList.filter((v) => v < 12)
        : isHourWithAmPm === 'pm'
          ? stepOrList.filter((v) => v >= 12).map((v) => (v === 12 ? 12 : v - 12))
          : stepOrList
    ).map((v) => getFixValue(v))
  } else if (typeof stepOrList === 'number') {
    if (isHourWithAmPm === 'am') {
      return defaultValue.filter((hour) => {
        const hourAsNumber = Number(hour)
        return hourAsNumber < 12 && hourAsNumber % stepOrList === 0
      })
    } else if (isHourWithAmPm === 'pm') {
      return defaultValue
        .filter((hour) => {
          const hourAsNumber = Number(hour)
          return hourAsNumber >= 12 && hourAsNumber % stepOrList === 0
        })
        .map((hour) => {
          const hourAsNumber = Number(hour)
          return getFixValue(hourAsNumber === 12 ? 12 : hourAsNumber - 12)
        })
    }
    return defaultValue.filter((hour) => {
      return Number(hour) % stepOrList === 0
    })
  } else {
    return isHourWithAmPm === 'am'
      ? defaultValue.filter((hour) => Number(hour) < 12)
      : isHourWithAmPm === 'pm'
        ? defaultValue
          .map((hour) => Number(hour))
          .filter((hour) => Number(hour) >= 12)
          .map((v) => getFixValue(v === 12 ? 12 : v - 12))
        : defaultValue
  }
}

export function isTimeInStep (
  value: number,
  type: 'hours' | 'minutes' | 'seconds',
  stepOrList: MaybeArray<number> | undefined
): boolean {
  if (!stepOrList) {
    return true
  } else if (typeof stepOrList === 'number') {
    return value % stepOrList === 0
  } else {
    return stepOrList.includes(value)
  }
}

export function findSimilarTime (
  value: number,
  type: 'hours' | 'minutes' | 'seconds',
  stepOrList: MaybeArray<number> | undefined
): number {
  const list = getTimeUnits(time[type], stepOrList).map(Number)
  let lowerBound, upperBound
  for (let i = 0; i < list.length; ++i) {
    const v = list[i]
    if (v === value) return v
    else if (v > value) {
      upperBound = v
      break
    }
    lowerBound = v
  }
  if (lowerBound === undefined) {
    if (!upperBound) {
      throwError(
        'time-picker',
        "Please set 'hours' or 'minutes' or 'seconds' props"
      )
    }
    return upperBound
  }
  if (upperBound === undefined) {
    return lowerBound
  }
  return upperBound - value > value - lowerBound ? lowerBound : upperBound
}

export function getAmPm (value: number): 'am' | 'pm' {
  return getHours(value) < 12 ? 'am' : 'pm'
}
