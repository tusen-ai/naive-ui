import { inject, ref, toRef } from 'vue'
import { useMemo, useMergedState } from 'vooks'

export default function setup (props) {
  const NRadioGroup = inject('NRadioGroup', null)
  const uncontrolledCheckedRef = ref(props.defaultChecked)
  const controlledCheckedRef = toRef(props, 'checked')
  const mergedCheckedRef = useMergedState(
    controlledCheckedRef,
    uncontrolledCheckedRef
  )
  return {
    NRadioGroup,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: useMemo(() => {
      if (NRadioGroup) return NRadioGroup.value === props.value
      return mergedCheckedRef.value
    })
  }
}
