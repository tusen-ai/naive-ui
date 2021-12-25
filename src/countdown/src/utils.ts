// Countdown
const units: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1] // million seconds
]

export function getTimeString (millisecond: number, format: string): string {
  let leftMillisecond: number = millisecond
  return units.reduce((current, [name, unit]) => {
    if (current.includes(name)) {
      const value = Math.floor(leftMillisecond / unit)
      leftMillisecond -= value * unit
      return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
        const len = match.length
        return String(value).padStart(len, '0')
      })
    }
    return current
  }, format)
}
