import { MaybeArray, throwError } from '../../_utils'

export const time = {
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

export function getTimeUnits (
  defaultValue: string[],
  stepOrList: MaybeArray<number> | undefined
): string[] {
  if (Array.isArray(stepOrList)) {
    return stepOrList.map((v) => Math.floor(v)).map((v) => getFixValue(v))
  } else if (typeof stepOrList === 'number') {
    return defaultValue.filter((hour) => Number(hour) % stepOrList === 0)
  } else {
    return defaultValue
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
