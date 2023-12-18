import { defineComponent, h, type PropType, computed } from 'vue'
import { hsv2rgb, hsva, toRgbaString } from 'seemly'
import { type ColorPickerMode, convertColor, getModeFromValue } from './utils'
import { warn } from '../../_utils'

// Try to normalize the color values to ensure that they are valid CSS colors
function normalizeColor (color: string, mode: ColorPickerMode | null): string {
  if (mode === 'hsv') {
    const [h, s, v, a] = hsva(color)
    return toRgbaString([...hsv2rgb(h, s, v), a])
  }
  // For the mode that is not in preset, we keep the original value.
  // For color names, they are legal to CSS, so we don’t deal with them,
  // and only standardize them when outputting.
  return color
}

function getHexFromName (color: string): string {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) {
    return '#000000'
  }
  ctx.fillStyle = color
  return ctx.fillStyle
}

interface ParsedColor {
  value: string
  mode: ColorPickerMode | null
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
      props.swatches.map((value) => {
        const mode = getModeFromValue(value)
        return {
          value,
          mode,
          legalValue: normalizeColor(value, mode)
        }
      })
    )

    function normalizeOutput (parsed: ParsedColor): string {
      const { mode: modeProp } = props
      let { value, mode: swatchColorMode } = parsed
      // color name is converted to hex
      if (!swatchColorMode) {
        swatchColorMode = 'hex'
        if (/^[a-zA-Z]+$/.test(value)) {
          value = getHexFromName(value)
        } else {
          // for invalid color, we make it black
          warn('color-picker', `color ${value} in swatches is invalid.`)
          value = '#000000'
        }
      }

      if (swatchColorMode === modeProp) return value

      // swatch value to current mode value
      return convertColor(value, modeProp, swatchColorMode)
    }

    function handleSwatchSelect (parsed: ParsedColor): void {
      props.onUpdateColor(normalizeOutput(parsed))
    }

    function handleSwatchKeyDown (e: KeyboardEvent, parsed: ParsedColor): void {
      if (e.key === 'Enter') handleSwatchSelect(parsed)
    }

    return {
      parsedSwatchesRef,
      handleSwatchSelect,
      handleSwatchKeyDown
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-color-picker-swatches`}>
        {this.parsedSwatchesRef.map((swatch) => (
          <div
            class={`${clsPrefix}-color-picker-swatch`}
            tabindex={0}
            onClick={() => {
              this.handleSwatchSelect(swatch)
            }}
            onKeydown={(e) => {
              this.handleSwatchKeyDown(e, swatch)
            }}
          >
            <div
              class={`${clsPrefix}-color-picker-swatch__fill`}
              style={{ background: swatch.legalValue }}
            />
          </div>
        ))}
      </div>
    )
  }
})
