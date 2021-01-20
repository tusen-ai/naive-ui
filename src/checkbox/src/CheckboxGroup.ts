import {
  h,
  defineComponent,
  provide,
  PropType,
  computed,
  reactive,
  toRef
} from 'vue'
import { useFormItem } from '../../_mixins'
import { warn, call, getSlot, MaybeArray } from '../../_utils'

export interface CheckboxGroupInjection {
  disabled: boolean
  valueSet: Set<string | number>
  mergedSize: 'small' | 'medium' | 'large'
  toggleCheckbox: (checked: boolean, checkboxValue: string | number) => void
}

export default defineComponent({
  name: 'CheckboxGroup',
  props: {
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: undefined
    },
    value: {
      type: Array as PropType<Array<string | number>>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array] as PropType<
      MaybeArray<(value: Array<string | number>) => void> | undefined
      >,
      default: undefined
    },
    // deprecated
    onChange: {
      type: [Function, Array] as PropType<
      MaybeArray<(value: Array<string | number>) => void> | undefined
      >,
      validator: () => {
        if (__DEV__) {
          warn(
            'checkbox-group',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const formItem = useFormItem(props)
    const valueSetRef = computed<Set<string | number>>(() => {
      if (Array.isArray(props.value)) return new Set(props.value)
      return new Set()
    })
    function toggleCheckbox (
      checked: boolean,
      checkboxValue: string | number
    ): void {
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      const { onChange, 'onUpdate:value': onUpdateValue } = props
      if (Array.isArray(props.value)) {
        const groupValue = Array.from(props.value)
        const index = groupValue.findIndex((value) => value === checkboxValue)
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue)
            if (onUpdateValue) call(onUpdateValue, groupValue)
            nTriggerFormInput()
            nTriggerFormChange()
            // deprecated
            if (onChange) call(onChange, groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            if (onUpdateValue) call(onUpdateValue, groupValue)
            if (onChange) call(onChange, groupValue) // deprecated
            nTriggerFormInput()
            nTriggerFormChange()
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) call(onUpdateValue, [checkboxValue])
          if (onChange) call(onChange, [checkboxValue]) // deprecated
          nTriggerFormInput()
          nTriggerFormChange()
        } else {
          if (onUpdateValue) call(onUpdateValue, [])
          if (onChange) call(onChange, []) // deprecated
          nTriggerFormInput()
          nTriggerFormChange()
        }
      }
    }
    provide<CheckboxGroupInjection>(
      'NCheckboxGroup',
      reactive({
        valueSet: valueSetRef,
        disabled: toRef(props, 'disabled'),
        mergedSize: formItem.mergedSize,
        toggleCheckbox
      })
    )
  },
  render () {
    return h(
      'div',
      {
        class: 'n-checkbox-group'
      },
      getSlot(this)
    )
  }
})
