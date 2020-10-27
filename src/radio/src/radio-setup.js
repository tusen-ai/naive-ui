import { inject } from 'vue'
import { useMemo } from 'vooks'

export default function setup (props) {
  const NRadioGroup = inject('NRadioGroup', null)
  return {
    NRadioGroup,
    renderSafeChecked: useMemo(() => {
      if (NRadioGroup) return NRadioGroup.value === props.value
      return props.checkedValue === props.value
    })
  }
}
