import colors from './colors'

const brightnessRE = /^(.*)(-(\d+))$/

export function resolveColor (exp: string): string {
  const brightnessMatch = exp.match(brightnessRE)
  if (brightnessMatch) {
    const [, raw, , brightness] = brightnessMatch
    if (raw in colors) {
      const color = colors[raw]
      if (typeof color === 'string') {
        return color
      }
      if (brightness in color) {
        return color[brightness]
      }
    }
  }
  return exp
}
