export type ColorPickerMode = 'rgb' | 'hsl' | 'hsv' | 'hex'

export function getModeFromValue (color: string | null): ColorPickerMode | null {
  if (color === null) return null
  if (/^ *#/.test(color)) return 'hex'
  if (color.includes('rgb')) return 'rgb'
  if (color.includes('hsl')) return 'hsl'
  if (color.includes('hsv')) return 'hsv'
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
