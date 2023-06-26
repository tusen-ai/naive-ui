import {
  h,
  defineComponent,
  provide,
  type PropType,
  computed,
  toRef,
  ref,
  type Ref,
  type ComputedRef,
  watchEffect
} from 'vue'
import { useMergedState } from 'vooks'
import { useConfig, useFormItem } from '../../_mixins'
import {
  call,
  type MaybeArray,
  createInjectionKey,
  warnOnce,
  type ExtractPublicPropTypes
} from '../../_utils'

export interface CheckboxGroupInjection {
  checkedCountRef: ComputedRef<number>
  maxRef: Ref<number | undefined>
  minRef: Ref<number | undefined>
  disabledRef: Ref<boolean>
  valueSetRef: Ref<Set<string | number>>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  toggleCheckbox: (checked: boolean, checkboxValue: string | number) => void
}

export const checkboxGroupInjectionKey =
  createInjectionKey<CheckboxGroupInjection>('n-checkbox-group')

export const checkboxGroupProps = {
  min: Number,
  max: Number,
  size: String as PropType<'small' | 'medium' | 'large'>,
  value: Array as PropType<Array<string | number> | null>,
  defaultValue: {
    type: Array as PropType<Array<string | number> | null>,
    default: null
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<
  (
    value: Array<string | number>,
    meta: {
      actionType: 'check' | 'uncheck'
      value: string | number
    }
  ) => void
  >
  >,
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<
  (
    value: Array<string | number>,
    meta: {
      actionType: 'check' | 'uncheck'
      value: string | number
    }
  ) => void
  >
  >,
  // deprecated
  onChange: [Function, Array] as PropType<
  MaybeArray<(value: Array<string | number>) => void> | undefined
  >
} as const

export type CheckboxGroupProps = ExtractPublicPropTypes<
  typeof checkboxGroupProps
>

export default defineComponent({
  name: 'CheckboxGroup',
  props: checkboxGroupProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'checkbox-group',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef } = useConfig(props)
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = computed(() => props.value)
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const checkedCount = computed(() => {
      return mergedValueRef.value?.length || 0
    })

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
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: 'check',
                value: checkboxValue
              })
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: 'check',
                value: checkboxValue
              })
            }
            nTriggerFormInput()
            nTriggerFormChange()
            uncontrolledValueRef.value = groupValue
            // deprecated
            if (onChange) call(onChange, groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: 'uncheck',
                value: checkboxValue
              })
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: 'uncheck',
                value: checkboxValue
              })
            }
            if (onChange) call(onChange, groupValue) // deprecated
            uncontrolledValueRef.value = groupValue
            nTriggerFormInput()
            nTriggerFormChange()
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) {
            call(onUpdateValue, [checkboxValue], {
              actionType: 'check',
              value: checkboxValue
            })
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [checkboxValue], {
              actionType: 'check',
              value: checkboxValue
            })
          }
          if (onChange) call(onChange, [checkboxValue]) // deprecated
          uncontrolledValueRef.value = [checkboxValue]
          nTriggerFormInput()
          nTriggerFormChange()
        } else {
          if (onUpdateValue) {
            call(onUpdateValue, [], {
              actionType: 'uncheck',
              value: checkboxValue
            })
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [], {
              actionType: 'uncheck',
              value: checkboxValue
            })
          }
          if (onChange) call(onChange, []) // deprecated
          uncontrolledValueRef.value = []
          nTriggerFormInput()
          nTriggerFormChange()
        }
      }
    }
    provide(checkboxGroupInjectionKey, {
      checkedCountRef: checkedCount,
      maxRef: toRef(props, 'max'),
      minRef: toRef(props, 'min'),
      valueSetRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      toggleCheckbox
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    return (
      <div class={`${this.mergedClsPrefix}-checkbox-group`} role="group">
        {this.$slots}
      </div>
    )
  }
})
