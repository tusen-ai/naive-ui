export type ColorPickerMode = 'rgba' | 'hsla' | 'hsva'

export const modes: ColorPickerMode[] = ['rgba', 'hsla', 'hsva']

export function getModeFromValue (color: string | null): ColorPickerMode | null {
  if (color === null) return null
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
