import { defineComponent, h, PropType, computed } from 'vue'
import {
  hsl2hsv,
  HSLA,
  hsla,
  hsv2hsl,
  hsv2rgb,
  HSVA,
  hsva,
  RGB,
  rgb2hsv,
  RGBA,
  rgba,
  toHexaString,
  toHslaString,
  toHsvaString,
  toRgbaString
} from 'seemly'
import { ColorPickerMode, getModeFromValue } from './utils'
import { throwError } from '../../_utils'

interface ParseColorAction<V extends number[]> {
  values: V
  toString: () => string
}

class ParseColor {
  h: number
  s: number
  v: number
  a: number
  constructor (color: string) {
    const rawMode = getModeFromValue(color)

    let _hsva: HSVA | null, _rgba: RGBA, _hsla: HSLA
    _hsva = null
    switch (rawMode) {
      case 'hex':
      case 'rgb':
        _rgba = rgba(color)
        _hsva = [...rgb2hsv(...(_rgba.slice(0, 3) as RGB)), _rgba[3]]
        break
      case 'hsv':
        _hsva = hsva(color)
        break
      case 'hsl':
        _hsla = hsla(color)
        _hsva = [...hsl2hsv(...(_hsla.slice(0, 3) as RGB)), _hsla[3]]
        break
    }

    if (!_hsva) {
      throwError('color-picker-swatches', `Invalid color value ${color}.`)
    }

    this.h = _hsva[0]
    this.s = _hsva[1]
    this.v = _hsva[2]
    this.a = _hsva[3]
  }

  toRgba (): ParseColorAction<RGBA> {
    const values = [...hsv2rgb(this.h, this.s, this.v), this.a] as RGBA
    return {
      values,
      toString: () => toRgbaString(values)
    }
  }

  toHexa (): ParseColorAction<RGBA> {
    const values = [...hsv2rgb(this.h, this.s, this.v), this.a] as RGBA
    return {
      values,
      toString: () => toHexaString(values)
    }
  }

  toHsva (): ParseColorAction<HSVA> {
    const values = [this.h, this.s, this.v, this.a] as HSVA
    return {
      values,
      toString: () => toHsvaString(values)
    }
  }

  toHsla (): ParseColorAction<HSLA> {
    const values = [...hsv2hsl(this.h, this.s, this.v), this.a] as HSLA
    return {
      values,
      toString: () => toHslaString(values)
    }
  }
}

function getDistanceToWhite (color: string | ParseColor): number {
  const parsed = typeof color === 'string' ? new ParseColor(color) : color
  const [, s, l] = parsed.toHsla().values
  return Math.sqrt(Math.pow(100 - l, 2) + Math.pow(s, 2))
}

export default defineComponent({
  name: 'ColorPickerSwatches',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    color: {
      type: String as PropType<string | null>,
      default: null
    },
    mode: {
      type: String as PropType<ColorPickerMode>,
      required: true
    },
    swatches: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => []
    },
    onUpdateColor: {
      type: Function as PropType<(value: string) => void>,
      required: true
    }
  },
  setup (props) {
    const currentColorRef = computed(() =>
      props.color ? normalizeColor(props.color, props.mode) : null
    )

    const parsedSwatchesRef = computed(() =>
      props.swatches.map((swatch) => {
        const parsed = new ParseColor(swatch)
        const normalized = normalizeColor(parsed, props.mode)
        return {
          parsed,
          normalized,
          rgba: ['hex', 'rgb'].includes(props.mode)
            ? normalized
            : normalizeColor(parsed, 'rgb'),
          isSelected: currentColorRef.value === normalized,
          isNearWhite: getDistanceToWhite(parsed) < 3
        }
      })
    )

    function normalizeColor (
      color: string | ParseColor,
      mode: ColorPickerMode
    ): string {
      if (!mode) mode = props.mode
      const parsed = typeof color === 'string' ? new ParseColor(color) : color
      switch (mode) {
        case 'rgb':
          return parsed.toRgba().toString()
        case 'hex':
          return parsed.toHexa().toString()
        case 'hsv':
          return parsed.toHsva().toString()
        case 'hsl':
          return parsed.toHsla().toString()
      }
    }

    return {
      currentColorRef,
      parsedSwatchesRef
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-color-picker-swatches`}>
        {this.parsedSwatchesRef.map((swatch) => (
          <div
            class={[
              `${clsPrefix}-color-picker-swatches__color`,
              {
                [`${clsPrefix}-color-picker-swatches__color--selected`]:
                  swatch.isSelected,
                [`${clsPrefix}-color-picker-swatches__color--light`]:
                  swatch.isNearWhite
              }
            ]}
            onClick={() => this.onUpdateColor(swatch.normalized)}
          >
            <div style={{ background: swatch.rgba }} />
          </div>
        ))}
      </div>
    )
  }
})
