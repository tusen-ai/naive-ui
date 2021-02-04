import { composite } from 'seemly'

export function createHoverColor (rgb: string): string {
  return composite(rgb, [255, 255, 255, 0.16])
}

export function createPressedColor (rgb: string): string {
  return composite(rgb, [0, 0, 0, 0.12])
}
