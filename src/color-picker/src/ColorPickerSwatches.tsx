import { defineComponent, h, PropType, computed } from 'vue'
import {
  HSL,
  hsl2hsv,
  hsl2rgb,
  HSLA,
  hsla,
  HSV,
  hsv2hsl,
  hsv2rgb,
  hsva,
  HSVA,
  rgb2hsl,
  rgb2hsv,
  RGBA,
  rgba,
  toHexaString,
  toHslaString,
  toHsvaString,
  toRgbaString
} from 'seemly'
import { ColorPickerMode, getModeFromValue } from './utils'
import { makeMap } from '@vue/shared'

// http://www.w3big.com/cssref/css-colors-legal.html
const isCSSLegalColorMode: (mode: ColorPickerMode) => boolean =
  makeMap('rgb,hsl,hex')

/** Try to normalize the color values to ensure that they are legal to CSS */
function normalizeColor (
  color: string,
  rawMode?: ColorPickerMode | null
): string {
  if (rawMode === undefined) {
    rawMode = getModeFromValue(color)
  }
  if (!rawMode || isCSSLegalColorMode(rawMode)) return color
  switch (rawMode) {
    case 'hsv': {
      const [h, s, v, a] = hsva(color)
      return toRgbaString([...hsv2rgb(h, s, v), a])
    }
    default:
      // For the mode that is not preset, we keep the original value.
      // For Color names, they are legal to CSS, so we don’t deal with them,
      // and only standardize them when outputting.
      return color
  }
}

function standardizeColor (color: string): string | null {
  if (color.toLowerCase() === 'black') {
    return '#000'
  }
  const ctx = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D

  ctx.fillStyle = color
  return ctx.fillStyle === '#000' ? null : ctx.fillStyle
}

type Conversion = {
  parse: (str: string) => RGBA
} & Partial<Record<ColorPickerMode, (colors: RGBA) => string>>

const covert: Record<ColorPickerMode, Conversion> = {
  rgb: {
    parse (str: string) {
      return rgba(str)
    },
    hex (rgba: RGBA): string {
      return toHexaString(rgba)
    },
    hsl (rgba: RGBA): string {
      return toHslaString([...rgb2hsl(...(rgba.slice(0, 3) as HSL)), rgba[3]])
    },
    hsv (rgba: RGBA): string {
      return toHsvaString([...rgb2hsv(...(rgba.slice(0, 3) as HSL)), rgba[3]])
    }
  },
  hex: {
    parse (str: string) {
      return rgba(str)
    },
    rgb (rgba: RGBA): string {
      return toRgbaString(rgba)
    },
    hsl (rgba: RGBA): string {
      return toHslaString([...rgb2hsl(...(rgba.slice(0, 3) as HSL)), rgba[3]])
    },
    hsv (rgba: RGBA): string {
      return toHsvaString([...rgb2hsv(...(rgba.slice(0, 3) as HSL)), rgba[3]])
    }
  },
  hsl: {
    parse (str: string) {
      return hsla(str)
    },
    hex (hsla: HSLA): string {
      return toHexaString([...hsl2rgb(...(hsla.slice(0, 3) as HSL)), hsla[3]])
    },
    rgb (hsla: HSLA): string {
      return toRgbaString([...hsl2rgb(...(hsla.slice(0, 3) as HSL)), hsla[3]])
    },
    hsv (hsla: HSLA): string {
      return toHsvaString([...hsl2hsv(...(hsla.slice(0, 3) as HSL)), hsla[3]])
    }
  },
  hsv: {
    parse (str: string) {
      return hsva(str)
    },
    hex (hsva: HSVA): string {
      return toHexaString([...hsv2rgb(...(hsva.slice(0, 3) as HSV)), hsva[3]])
    },
    rgb (hsva: HSVA) {
      return toRgbaString([...hsv2rgb(...(hsva.slice(0, 3) as HSV)), hsva[3]])
    },
    hsl (hsva: HSVA): string {
      return toHslaString([...hsv2hsl(...(hsva.slice(0, 3) as HSV)), hsva[3]])
    }
  }
} as const

interface ParsedColor {
  value: string
  rawMode: ColorPickerMode | null
  legalValue: string
}

export default defineComponent({
  name: 'ColorPickerSwatches',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    mode: {
      type: String as PropType<ColorPickerMode>,
      required: true
    },
    swatches: {
      type: Array as PropType<string[]>,
      required: true
    },
    onUpdateColor: {
      type: Function as PropType<(value: string) => void>,
      required: true
    }
  },
  setup (props) {
    const parsedSwatchesRef = computed<ParsedColor[]>(() =>
      props.swatches.map((swatch) => {
        const rawMode = getModeFromValue(swatch)
        return {
          value: swatch,
          rawMode,
          legalValue: normalizeColor(swatch, rawMode)
        }
      })
    )

    function normalizeOutput (parsed: ParsedColor): string {
      const { mode } = props
      let { value, rawMode, legalValue } = parsed
      if (rawMode === mode) return value
      // Illegal preset mode colors are converted to rgb uniformly
      if (
        mode === 'rgb' &&
        rawMode &&
        !isCSSLegalColorMode(rawMode) &&
        value !== legalValue
      ) {
        return legalValue
      }

      if (!rawMode) {
        const maybeColorName = value.match(/^[a-zA-Z]+$/)
        const standardized = maybeColorName && standardizeColor(value)
        if (!standardized) {
          return value
        }

        rawMode = 'hex'
        value = standardized
        if (mode === rawMode) return value
      }

      const conversions = covert[rawMode]
      return !conversions || !(mode in conversions)
        ? value
        : (conversions[mode] as (colors: RGBA) => string)(
            conversions.parse(value)
          )
    }

    function handleSwatchSelect (parsed: ParsedColor): void {
      props.onUpdateColor(normalizeOutput(parsed))
    }

    return {
      parsedSwatchesRef,
      handleSwatchSelect
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-color-picker-swatches`}>
        {this.parsedSwatchesRef.map((swatch) => (
          <div
            class={`${clsPrefix}-color-picker-swatches__color`}
            onClick={() => this.handleSwatchSelect(swatch)}
          >
            <div style={{ background: swatch.legalValue }} />
          </div>
        ))}
      </div>
    )
  }
})
