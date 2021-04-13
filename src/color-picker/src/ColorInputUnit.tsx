import { defineComponent, h, inject, PropType, ref, watchEffect } from 'vue'
import { NInput } from '../../input'
import { colorPickerThemeInjectionKey } from './ColorPicker'

// 0 - 255
function normalizeRgbUnit (value: string): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(0, Math.min(parseInt(value), 255))
  }
  return false
}

// 0 - 360
function normalizeHueUnit (value: string): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(0, Math.min(parseInt(value), 360))
  }
  return false
}

// 0 - 100
function normalizeSlvUnit (value: string): number | false {
  if (/^\d{1,3}\.?\d*$/.test(value.trim())) {
    return Math.max(0, Math.min(parseInt(value), 100))
  }
  return false
}

function normalizeHexaUnit (value: string): boolean {
  if (/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/.test(value.trim())) return true
  return false
}

// 0 - 100%
function normalizeAlphaUnit (value: string): number | false {
  if (/^\d{1,3}\.?\d*%$/.test(value.trim())) {
    return Math.max(0, Math.min(parseInt(value), 100))
  }
  return false
}

const inputThemeOverrides = {
  paddingSmall: '0 4px'
}

export default defineComponent({
  name: 'ColorInputUnit',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String] as PropType<number | string | null>,
      default: null
    },
    onUpdateValue: {
      type: Function as PropType<(value: number | string) => void>,
      required: true
    }
  },
  setup (props) {
    const inputValueRef = ref<string>('')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const themeRef = inject(colorPickerThemeInjectionKey, null)!
    watchEffect(() => {
      inputValueRef.value = getInputString()
    })
    function getInputString (): string {
      const { value } = props
      if (value === null) return ''
      const { label } = props
      if (label === 'HEXA') {
        return value as string
      }
      if (label === 'A') {
        return `${Math.floor((value as number) * 100)}%`
      }
      return String(Math.floor(value as number))
    }
    function handleInputUpdateValue (value: string): void {
      inputValueRef.value = value
    }
    function handleInputChange (value: string): void {
      let unit: number | false
      let valid: boolean
      switch (props.label) {
        case 'HEXA':
          valid = normalizeHexaUnit(value)
          if (!valid) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(value)
          }
          break
        case 'H':
          unit = normalizeHueUnit(value)
          if (!unit) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'S':
        case 'L':
        case 'V':
          unit = normalizeSlvUnit(value)
          if (!unit) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'A':
          unit = normalizeAlphaUnit(value)
          if (!unit) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'R':
        case 'G':
        case 'B':
          unit = normalizeRgbUnit(value)
          if (!unit) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
      }
    }
    return {
      mergedTheme: themeRef,
      inputValue: inputValueRef,
      handleInputChange,
      handleInputUpdateValue
    }
  },
  render () {
    const { mergedTheme } = this
    return (
      <NInput
        size="small"
        placeholder={this.label}
        theme={mergedTheme.peers.Input}
        themeOverrides={mergedTheme.peerOverrides.Input}
        builtinThemeOverrides={inputThemeOverrides}
        value={this.inputValue}
        onUpdateValue={this.handleInputUpdateValue}
        onChange={this.handleInputChange}
      />
    )
  }
})
