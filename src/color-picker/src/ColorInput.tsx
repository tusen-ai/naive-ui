import {
  HSVA,
  HSLA,
  RGBA,
  toHsvaString,
  toRgbaString,
  toHslaString,
  toHexaString,
  rgba
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
        if (props.mode === 'hexa') {
          props.onUpdateValue(toRgbaString(rgba(value as string)))
          return
        }
        let nextValueArr: any
        if (props.value === null) {
          nextValueArr = [0, 0, 0, 0]
        } else {
          nextValueArr = Array.from(props.value) as typeof props.value
        }
        switch (props.mode) {
          case 'hsva':
            nextValueArr[index] = value
            props.onUpdateValue(toHsvaString(nextValueArr))
            break
          case 'rgba':
            nextValueArr[index] = value
            props.onUpdateValue(toRgbaString(nextValueArr))
            break
          case 'hsla':
            nextValueArr[index] = value
            props.onUpdateValue(toHslaString(nextValueArr))
            break
        }
      }
    }
  },
  render () {
    const { value, mode } = this
    return (
      <div class="n-color-picker-input">
        <div class="n-color-picker-input__mode" onClick={this.onUpdateMode}>
          {mode.toUpperCase()}
        </div>
        <NInputGroup>
          {{
            default: () =>
              mode === 'hexa' ? (
                <ColorInputUnit
                  label={mode.toUpperCase()}
                  value={value === null ? null : toHexaString(value)}
                  onUpdateValue={(unitValue) => {
                    this.handleUnitUpdateValue(0, unitValue)
                  }}
                />
              ) : (
                mode.split('').map((v, i) => (
                  <ColorInputUnit
                    label={v.toUpperCase()}
                    value={value === null ? null : value[i]}
                    onUpdateValue={(unitValue) => {
                      this.handleUnitUpdateValue(i, unitValue)
                    }}
                  />
                ))
              )
          }}
        </NInputGroup>
      </div>
    )
  }
})
