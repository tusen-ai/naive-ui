import {
  HSVA,
  HSLA,
  RGBA,
  toHsvaString,
  toRgbaString,
  toHslaString
} from 'seemly'
import { h, defineComponent, PropType, Fragment } from 'vue'
import { NInputGroup } from '../../input'
import { NSelect } from '../../select'
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
      type: Function as PropType<(value: ColorPickerMode) => void>,
      required: true
    }
  },
  setup (props) {
    return {
      options: [
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsla',
          value: 'hsla'
        },
        {
          label: 'hsva',
          value: 'hsva'
        }
      ],
      handleUnitUpdateValue (index: number, value: number) {
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
    const { value } = this
    return (
      <div class="n-color-input">
        <NInputGroup>
          {{
            default: () => (
              <>
                <NSelect
                  size="small"
                  value={this.mode}
                  options={this.options}
                  onUpdateValue={this.onUpdateMode as (value: string) => void}
                />
                {this.mode.split('').map((v, i) => (
                  <ColorInputUnit
                    label={v.toUpperCase()}
                    value={value === null ? null : value[i]}
                    onUpdateValue={(unitValue) => {
                      this.handleUnitUpdateValue(i, unitValue)
                    }}
                  />
                ))}
              </>
            )
          }}
        </NInputGroup>
      </div>
    )
  }
})
