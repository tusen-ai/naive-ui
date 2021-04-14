import {
  HSVA,
  HSLA,
  RGBA,
  toHsvaString,
  toRgbaString,
  toHslaString,
  toHexaString,
  rgba,
  toHexString,
  toHsvString,
  toRgbString,
  toHslString
} from 'seemly'
import { h, defineComponent, PropType } from 'vue'
import { NInputGroup } from '../../input'
import ColorInputUnit from './ColorInputUnit'
import type { ColorPickerMode } from './utils'

export default defineComponent({
  name: 'ColorInput',
  props: {
    mode: {
      type: String as PropType<ColorPickerMode>,
      required: true
    },
    showAlpha: {
      type: Boolean,
      required: true
    },
    value: {
      type: (Array as unknown) as PropType<HSVA | RGBA | HSLA | null>,
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
            (showAlpha ? toHexaString : toHexString)(rgba(value as string))
          )
          return
        }
        let nextValueArr: any
        if (props.value === null) {
          nextValueArr = [0, 0, 0, 0]
        } else {
          nextValueArr = Array.from(props.value) as typeof props.value
        }
        switch (props.mode) {
          case 'hsv':
            nextValueArr[index] = value
            props.onUpdateValue(
              (showAlpha ? toHsvaString : toHsvString)(nextValueArr)
            )
            break
          case 'rgb':
            nextValueArr[index] = value
            props.onUpdateValue(
              (showAlpha ? toRgbaString : toRgbString)(nextValueArr)
            )
            break
          case 'hsl':
            nextValueArr[index] = value
            props.onUpdateValue(
              (showAlpha ? toHslaString : toHslString)(nextValueArr)
            )
            break
        }
      }
    }
  },
  render () {
    return (
      <div class="n-color-picker-input">
        <div class="n-color-picker-input__mode" onClick={this.onUpdateMode}>
          {this.mode.toUpperCase() + (this.showAlpha ? 'A' : '')}
        </div>
        <NInputGroup>
          {{
            default: () => {
              const { mode, value, showAlpha } = this
              if (mode === 'hex') {
                return (
                  <ColorInputUnit
                    label={'HEX'}
                    showAlpha={showAlpha}
                    value={
                      value === null
                        ? null
                        : (showAlpha ? toHexaString : toHexString)(value)
                    }
                    onUpdateValue={(unitValue) => {
                      this.handleUnitUpdateValue(0, unitValue)
                    }}
                  />
                )
              }
              return (mode + (showAlpha ? 'a' : '')).split('').map((v, i) => (
                <ColorInputUnit
                  label={v.toUpperCase()}
                  value={value === null ? null : value[i]}
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
