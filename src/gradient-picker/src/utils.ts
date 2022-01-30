import type { CSSProperties } from 'vue'
import { warn } from '../../_utils'
import * as webskitGradient from 'webskit-gradient-parser'

import type { ColorPickerMode, ActionType } from '../../color-picker/src/utils'
import type { GradientColor, GradientStop, GradientType } from './interface'

export type { ColorPickerMode, ActionType }
export {
  getModeFromValue,
  floor,
  normalizeHue,
  normalizeAlpha,
  convertColor
} from '../../color-picker/src/utils'

export function normalizeUnit (
  value: string,
  min: number,
  max: number
): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(min, Math.min(parseInt(value), max))
  }
  return false
}

export function normalizeOffset (offset: number): number {
  offset = Math.round(offset * 100) / 100
  return offset > 1 ? 1 : offset < 0 ? 0 : offset
}

const blackTypes = {
  hex: ['#000000FF', '#000000'],
  rgb: ['rgba(0, 0, 0, 1)', 'rgb(0, 0, 0)'],
  hsl: ['hsla(0, 0%, 0%, 1)', 'hsl(0, 0%, 0%)'],
  hsv: ['hsva(0, 0%, 0%, 1)', 'hsv(0, 0%, 0%)']
}
const whiteTypes = {
  hex: ['#FFFFFFFF', '#FFFFFF'],
  rgb: ['rgba(255, 255, 255, 1)', 'rgb(255, 255, 255)'],
  hsl: ['hsla(0, 0%, 100%, 1)', 'hsl(0, 0%, 100%)'],
  hsv: ['hsva(0, 0%, 100%, 1)', 'hsv(0, 0%, 100%)']
}

export function deriveDefaultValue (
  modes: ColorPickerMode[],
  showAlpha: boolean
): string {
  const mode = modes[0]
  switch (mode) {
    case 'hex':
      return showAlpha ? '#000000FF' : '#000000'
    case 'rgb':
      return showAlpha ? 'rgba(0, 0, 0, 1)' : 'rgb(0, 0, 0)'
    case 'hsl':
      return showAlpha ? 'hsla(0, 0%, 0%, 1)' : 'hsl(0, 0%, 0%)'
    case 'hsv':
      return showAlpha ? 'hsva(0, 0%, 0%, 1)' : 'hsv(0, 0%, 0%)'
  }
  if (__DEV__) warn('color-picker', 'props.modes is invalid.')
  // in case of invalid modes
  return '#000000'
}

export function generateGradientCss (
  points: GradientStop[],
  type: GradientType,
  degree: number
): string {
  const sortedPoints = points.slice().sort((a, b) => a.offset - b.offset)
  const pts = sortedPoints
    .map((point) => `${point.color} ${point.offset * 100}%`)
    .join(',')

  if (type === 'linear-gradient') {
    return `linear-gradient(${degree}deg,${pts})`
  } else {
    return `radial-gradient(${pts})`
  }
}

export function getGradientColorText (value: GradientColor): string {
  const { type, color, gradient } = value
  return type === 'flat'
    ? (color as string)
    : generateGradientCss(gradient.stops, type, gradient.degree)
}

export function getGradientColorStyle (value: GradientColor): CSSProperties {
  const { type, color, gradient } = value
  return type === 'flat'
    ? {
        'background-color': color as string
      }
    : {
        'background-image': generateGradientCss(
          gradient.stops,
          type,
          gradient.degree
        )
      }
}

export function parseGradientColor (gradient: string): GradientColor {
  try {
    const wg = webskitGradient.parse(gradient, true)
    return {
      type: wg.type,
      color: blackTypes.rgb[1],
      gradient: {
        degree: wg.linearAngle,
        stops: wg.stops.map((m) => ({
          offset: m[1].replace('%', '') / 100,
          color: m[0]
        }))
      }
    }
  } catch (error) {
    return {
      type: 'flat',
      color: gradient,
      gradient: {
        degree: 0,
        stops: [
          {
            offset: 0,
            color: blackTypes.rgb[1]
          },
          {
            offset: 1,
            color: whiteTypes.rgb[1]
          }
        ]
      }
    }
  }
}
