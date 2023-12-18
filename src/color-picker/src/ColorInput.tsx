import {
  type HSVA,
  type HSLA,
  type RGBA,
  toHsvaString,
  toRgbaString,
  toHslaString,
  toHexaString,
  toHexString,
  toHsvString,
  toRgbString,
  toHslString,
  type HSV,
  type RGB,
  type HSL
} from 'seemly'
import { h, defineComponent, type PropType } from 'vue'
import { NInputGroup } from '../../input'
import ColorInputUnit from './ColorInputUnit'
import type { ColorPickerMode } from './utils'

export default defineComponent({
  name: 'ColorInput',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    mode: {
      type: String as PropType<ColorPickerMode>,
      required: true
    },
    modes: {
      type: Array as PropType<ColorPickerMode[]>,
      required: true
    },
    showAlpha: {
      type: Boolean,
      required: true
    },
    value: {
      // for hex to get percise value
      type: String as PropType<string | null>,
      default: null
    },
    valueArr: {
      type: Array as unknown as PropType<HSVA | RGBA | HSLA | null>,
      default: null
    },
    onUpdateValue: {
      type: Function as PropType<(value: string) => void>,
      required: true
    },
    onUpdateMode: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup (props) {
    return {
      handleUnitUpdateValue (index: number, value: number | string) {
        const { showAlpha } = props
        if (props.mode === 'hex') {
          props.onUpdateValue(
            (showAlpha ? toHexaString : toHexString)(value as string)
          )
          return
        }
        let nextValueArr: any
        if (props.valueArr === null) {
          nextValueArr = [0, 0, 0, 0]
        } else {
          nextValueArr = Array.from(props.valueArr) as typeof props.valueArr
        }
        switch (props.mode) {
          case 'hsv':
            nextValueArr[index] = value
            props.onUpdateValue(
              (showAlpha ? toHsvaString : toHsvString)(
                nextValueArr as HSVA | HSV
              )
            )
            break
          case 'rgb':
            nextValueArr[index] = value
            props.onUpdateValue(
              (showAlpha ? toRgbaString : toRgbString)(
                nextValueArr as RGBA | RGB
              )
            )
            break
          case 'hsl':
            nextValueArr[index] = value
            props.onUpdateValue(
              (showAlpha ? toHslaString : toHslString)(
                nextValueArr as HSLA | HSL
              )
            )
            break
        }
      }
    }
  },
  render () {
    const { clsPrefix, modes } = this
    return (
      <div class={`${clsPrefix}-color-picker-input`}>
        <div
          class={`${clsPrefix}-color-picker-input__mode`}
          onClick={this.onUpdateMode}
          style={{
            cursor: modes.length === 1 ? '' : 'pointer'
          }}
        >
          {this.mode.toUpperCase() + (this.showAlpha ? 'A' : '')}
        </div>
        <NInputGroup>
          {{
            default: () => {
              const { mode, valueArr, showAlpha } = this
              if (mode === 'hex') {
                // hex and rgba shares the same value arr
                let hexValue: string | null = null
                try {
                  hexValue =
                    valueArr === null
                      ? null
                      : (showAlpha ? toHexaString : toHexString)(
                          valueArr as RGBA
                        )
                } catch {}
                return (
                  <ColorInputUnit
                    label={'HEX'}
                    showAlpha={showAlpha}
                    value={hexValue}
                    onUpdateValue={(unitValue) => {
                      this.handleUnitUpdateValue(0, unitValue)
                    }}
                  />
                )
              }
              return (mode + (showAlpha ? 'a' : '')).split('').map((v, i) => (
                <ColorInputUnit
                  label={v.toUpperCase()}
                  value={valueArr === null ? null : valueArr[i]}
                  onUpdateValue={(unitValue) => {
                    this.handleUnitUpdateValue(i, unitValue)
                  }}
                />
              ))
            }
          }}
        </NInputGroup>
      </div>
    )
  }
})
