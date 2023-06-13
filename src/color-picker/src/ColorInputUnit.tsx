import {
  defineComponent,
  h,
  inject,
  type PropType,
  ref,
  watchEffect
} from 'vue'
import { NInput } from '../../input'
import { colorPickerInjectionKey } from './context'

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
  const trimmedValue = value.trim()
  if (/^#[0-9a-fA-F]+$/.test(trimmedValue)) {
    return [4, 5, 7, 9].includes(trimmedValue.length)
  }
  return false
}

// 0 - 100%
function normalizeAlphaUnit (value: string): number | false {
  if (/^\d{1,3}\.?\d*%$/.test(value.trim())) {
    return Math.max(0, Math.min(parseInt(value) / 100, 100))
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
    showAlpha: Boolean,
    onUpdateValue: {
      type: Function as PropType<(value: number | string) => void>,
      required: true
    }
  },
  setup (props) {
    const inputValueRef = ref<string>('')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { themeRef } = inject(colorPickerInjectionKey, null)!
    watchEffect(() => {
      inputValueRef.value = getInputString()
    })
    function getInputString (): string {
      const { value } = props
      if (value === null) return ''
      const { label } = props
      if (label === 'HEX') {
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
        case 'HEX':
          valid = normalizeHexaUnit(value)
          if (valid) {
            props.onUpdateValue(value)
          }
          inputValueRef.value = getInputString() // to normalized new value
          break
        case 'H':
          unit = normalizeHueUnit(value)
          if (unit === false) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'S':
        case 'L':
        case 'V':
          unit = normalizeSlvUnit(value)
          if (unit === false) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'A':
          unit = normalizeAlphaUnit(value)
          if (unit === false) {
            inputValueRef.value = getInputString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'R':
        case 'G':
        case 'B':
          unit = normalizeRgbUnit(value)
          if (unit === false) {
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
        // add more space for xxx% input
        style={this.label === 'A' ? 'flex-grow: 1.25;' : ''}
      />
    )
  }
})
