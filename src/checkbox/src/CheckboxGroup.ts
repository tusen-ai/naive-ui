import {
  h,
  defineComponent,
  provide,
  PropType,
  computed,
  reactive,
  toRef,
  ref
} from 'vue'
import { useMergedState } from 'vooks'
import { useFormItem } from '../../_mixins'
import { warn, call, MaybeArray } from '../../_utils'

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
    value: Array as PropType<Array<string | number> | null>,
    defaultValue: {
      type: Array as PropType<Array<string | number> | null>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': [Function, Array] as PropType<
    MaybeArray<(value: Array<string | number>) => void>
    >,
    onUpdateValue: [Function, Array] as PropType<
    MaybeArray<(value: Array<string | number>) => void>
    >,
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
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = computed(() => props.value)
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const valueSetRef = computed<Set<string | number>>(() => {
      if (Array.isArray(mergedValueRef.value)) {
        return new Set(mergedValueRef.value)
      }
      return new Set()
    })
    function toggleCheckbox (
      checked: boolean,
      checkboxValue: string | number
    ): void {
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props
      if (Array.isArray(mergedValueRef.value)) {
        const groupValue = Array.from(mergedValueRef.value)
        const index = groupValue.findIndex((value) => value === checkboxValue)
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue)
            if (onUpdateValue) call(onUpdateValue, groupValue)
            if (_onUpdateValue) call(_onUpdateValue, groupValue)
            nTriggerFormInput()
            nTriggerFormChange()
            // deprecated
            if (onChange) call(onChange, groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            if (onUpdateValue) call(onUpdateValue, groupValue)
            if (_onUpdateValue) call(_onUpdateValue, groupValue)
            if (onChange) call(onChange, groupValue) // deprecated
            nTriggerFormInput()
            nTriggerFormChange()
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) call(onUpdateValue, [checkboxValue])
          if (_onUpdateValue) call(_onUpdateValue, [checkboxValue])
          if (onChange) call(onChange, [checkboxValue]) // deprecated
          nTriggerFormInput()
          nTriggerFormChange()
        } else {
          if (onUpdateValue) call(onUpdateValue, [])
          if (_onUpdateValue) call(_onUpdateValue, [])
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
      this.$slots
    )
  }
})
