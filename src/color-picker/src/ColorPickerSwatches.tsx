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
      props.color ? parseColor(props.color, props.mode) : null
    )

    const normalizedSwatchesRef = computed(() =>
      props.swatches.map((swatch) => parseColor(swatch, props.mode))
    )

    function parseColor (color: string, mode: ColorPickerMode): string {
      if (!mode) mode = props.mode
      const parsed = new ParseColor(color)
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

    function isLightColor (color: string): boolean {
      const parsed = new ParseColor(color)
      const _hsla = parsed.toHsla().values
      return _hsla[2] > 50 || _hsla[3] < 0.5
    }

    return {
      currentColorRef,
      normalizedSwatchesRef,
      isLightColor
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-color-picker-swatches`}>
        {this.normalizedSwatchesRef.map((swatch) => (
          <div
            class={[
              `${clsPrefix}-color-picker-swatches__color`,
              {
                [`${clsPrefix}-color-picker-swatches__color--selected`]:
                  this.currentColorRef === swatch,
                [`${clsPrefix}-color-picker-swatches__color--light`]:
                this.isLightColor(swatch)
              }
            ]}
            onClick={() => this.onUpdateColor(swatch)}
          >
            <div style={{ background: swatch }} />
          </div>
        ))}
      </div>
    )
  }
})
