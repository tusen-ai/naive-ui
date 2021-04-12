import { defineComponent, h, PropType, ref, watchEffect } from 'vue'
import { NInput } from '../../input'

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

// 0 - 100%
function normalizeAlphaUnit (value: string): number | false {
  if (/^\d{1,3}\.?\d*%$/.test(value.trim())) {
    return Math.max(0, Math.min(parseInt(value), 100))
  }
  return false
}

export default defineComponent({
  name: 'ColorInputUnit',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number as PropType<number | null>,
      default: null
    },
    onUpdateValue: {
      type: Function as PropType<(value: number) => void>,
      required: true
    }
  },
  setup (props) {
    const inputValueRef = ref<string>('')
    watchEffect(() => {
      inputValueRef.value = getIntegerString()
    })
    function getIntegerString (): string {
      if (props.value === null) return ''
      return String(Math.floor(props.value))
    }
    function handleInputUpdateValue (value: string): void {
      inputValueRef.value = value
    }
    function handleInputChange (value: string): void {
      let unit: number | false
      switch (props.label) {
        case 'H':
          unit = normalizeHueUnit(value)
          if (!unit) {
            inputValueRef.value = getIntegerString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'S':
        case 'L':
        case 'V':
          unit = normalizeSlvUnit(value)
          if (!unit) {
            inputValueRef.value = getIntegerString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'A':
          unit = normalizeAlphaUnit(value)
          if (!unit) {
            inputValueRef.value = getIntegerString()
          } else {
            props.onUpdateValue(unit)
          }
          break
        case 'R':
        case 'G':
        case 'B':
          unit = normalizeRgbUnit(value)
          if (!unit) {
            inputValueRef.value = getIntegerString()
          } else {
            props.onUpdateValue(unit)
          }
          break
      }
    }
    return {
      inputValue: inputValueRef,
      handleInputChange,
      handleInputUpdateValue
    }
  },
  render () {
    return (
      <NInput
        size="small"
        placeholder=""
        value={this.inputValue}
        onUpdateValue={this.handleInputUpdateValue}
        onChange={this.handleInputChange}
      />
    )
  }
})
