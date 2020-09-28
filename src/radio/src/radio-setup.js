import { inject, toRef } from 'vue'
import { useMemo } from '../../_utils/composition'

export default function setup (props) {
  const NRadioGroup = inject('NRadioGroup', null)
  return {
    NRadioGroup,
    renderSafeChecked: useMemo(() => {
      if (NRadioGroup) return NRadioGroup.value === props.value
      return props.checkedValue === props.value
    }, [
      NRadioGroup ? toRef(NRadioGroup, 'value') : null,
      toRef(props, 'value'),
      toRef(props, 'checkedValue')
    ])
  }
}
