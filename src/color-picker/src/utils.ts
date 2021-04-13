export type ColorPickerMode = 'rgba' | 'hsla' | 'hsva' | 'hexa'

export const modes: ColorPickerMode[] = ['rgba', 'hsla', 'hsva']

export function getModeFromValue (color: string | null): ColorPickerMode | null {
  if (color === null) return null
  if (/^ *#/.test(color)) return 'hexa'
  for (const mode of modes) {
    if (color.includes(mode)) {
      return mode
    }
  }
  return null
}

export function floor (color: number[]): number[] {
  return color.map((channel) => Math.floor(channel))
}

export function normalizeHue (hue: number): number {
  hue = Math.round(hue)
  return hue >= 360 ? 359 : hue < 0 ? 0 : hue
}

export function normalizeAlpha (alpha: number): number {
  alpha = Math.round(alpha * 100) / 100
  return alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
}
