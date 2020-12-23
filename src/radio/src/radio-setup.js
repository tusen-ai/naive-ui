import { inject, ref, toRef } from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { useFormItem } from '../../_mixins'

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
    }),
    ...useFormItem(props, {
      mergedSize (NFormItem) {
        const { size } = props
        if (size !== undefined) return size
        if (NRadioGroup) {
          const { mergedSize } = NRadioGroup
          if (mergedSize !== undefined) {
            return mergedSize
          }
        }
        if (NFormItem) {
          const { mergedSize } = NFormItem
          return mergedSize
        }
        return 'medium'
      }
    })
  }
}
