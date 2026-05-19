import type {
  ComputedRef,
  CSSProperties,
  PropType,
  Ref,
  VNode,
  VNodeChild
} from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { CheckboxTheme } from '../styles'
import type { CheckboxBaseProps } from './use-checkbox'
import { useMergedState } from 'vooks'
import {
  computed,
  defineComponent,
  h,
  provide,
  ref,
  toRef,
  watchEffect
} from 'vue'
import { useConfig, useFormItem, useTheme, useThemeClass } from '../../_mixins'
import { call, createKey, flatten, getSlot, warn, warnOnce } from '../../_utils'
import { checkboxLight } from '../styles'
import groupStyle from './styles/checkbox-group.cssr'
import { checkboxGroupInjectionKey } from './use-checkbox'

export interface CheckboxGroupInjection {
  checkedCountRef: ComputedRef<number>
  maxRef: Ref<number | undefined>
  minRef: Ref<number | undefined>
  disabledRef: Ref<boolean>
  valueSetRef: Ref<Set<string | number>>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  toggleCheckbox: (checked: boolean, checkboxValue: string | number) => void
}

function mapSlot(
  defaultSlot: VNode[],
  valueSet: Set<string | number>,
  clsPrefix: string
): {
  children: VNodeChild[]
  isButtonGroup: boolean
} {
  const children: VNode[] = []
  let isButtonGroup = false
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i]
    const name = (wrappedInstance.type as any)?.name
    if (name === 'CheckboxButton') {
      isButtonGroup = true
    }
    if (__DEV__ && isButtonGroup && name !== 'CheckboxButton') {
      warn(
        'checkbox-group',
        '`n-checkbox-group` in button mode only takes `n-checkbox-button` as children.'
      )
      continue
    }
    const instanceProps: CheckboxBaseProps = wrappedInstance.props as any
    if (name !== 'CheckboxButton') {
      children.push(wrappedInstance)
      continue
    }
    if (i === 0) {
      children.push(wrappedInstance)
    }
    else {
      const lastInstanceProps: CheckboxBaseProps = children[children.length - 1]
        .props as any
      const lastInstanceChecked
        = lastInstanceProps.value !== undefined
          ? valueSet.has(lastInstanceProps.value)
          : false
      const lastInstanceDisabled: boolean | undefined
        = lastInstanceProps.disabled
      const currentInstanceChecked
        = instanceProps.value !== undefined
          ? valueSet.has(instanceProps.value)
          : false
      const currentInstanceDisabled = instanceProps.disabled
      const lastInstancePriority
        = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
      const currentInstancePriority
        = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
      const splitorClass
        = lastInstancePriority < currentInstancePriority
          ? {
              [`${clsPrefix}-checkbox-group__splitor--checked`]:
                currentInstanceChecked,
              [`${clsPrefix}-checkbox-group__splitor--disabled`]:
                currentInstanceDisabled
            }
          : {
              [`${clsPrefix}-checkbox-group__splitor--checked`]:
                lastInstanceChecked,
              [`${clsPrefix}-checkbox-group__splitor--disabled`]:
                lastInstanceDisabled
            }
      children.push(
        <div class={[`${clsPrefix}-checkbox-group__splitor`, splitorClass]} />,
        wrappedInstance
      )
    }
  }
  return {
    children,
    isButtonGroup
  }
}

export const checkboxGroupProps = {
  ...(useTheme.props as ThemeProps<CheckboxTheme>),
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
  setup(props) {
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
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const themeRef = useTheme(
      'Checkbox',
      '-checkbox-group',
      groupStyle,
      checkboxLight,
      props,
      mergedClsPrefixRef
    )
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
    function toggleCheckbox(
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
        const index = groupValue.findIndex(value => value === checkboxValue)
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
            if (onChange)
              call(onChange, groupValue)
          }
        }
        else {
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
            if (onChange)
              call(onChange, groupValue) // deprecated
            uncontrolledValueRef.value = groupValue
            nTriggerFormInput()
            nTriggerFormChange()
          }
        }
      }
      else {
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
          if (onChange)
            call(onChange, [checkboxValue]) // deprecated
          uncontrolledValueRef.value = [checkboxValue]
          nTriggerFormInput()
          nTriggerFormChange()
        }
        else {
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
          if (onChange)
            call(onChange, []) // deprecated
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
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          buttonColor,
          buttonColorChecked,
          buttonTextColor,
          buttonTextColorChecked,
          buttonTextColorHover,
          buttonBorder,
          buttonBorderChecked,
          buttonBoxShadowFocus,
          buttonBorderRadius,
          opacityDisabled,
          [createKey('buttonHeight', size)]: height
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-button-color': buttonColor,
        '--n-button-color-checked': buttonColorChecked,
        '--n-button-text-color': buttonTextColor,
        '--n-button-text-color-checked': buttonTextColorChecked,
        '--n-button-text-color-hover': buttonTextColorHover,
        '--n-button-border': buttonBorder,
        '--n-button-border-checked': buttonBorderChecked,
        '--n-button-box-shadow-focus': buttonBoxShadowFocus,
        '--n-button-border-radius': buttonBorderRadius,
        '--n-button-height': height,
        '--n-opacity-disabled': opacityDisabled
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'checkbox-group',
          computed(() => mergedSizeRef.value[0]),
          cssVarsRef,
          props
        )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      valueSet: valueSetRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { mergedClsPrefix, valueSet, cssVars, themeClass } = this
    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      valueSet,
      mergedClsPrefix
    )
    this.onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-checkbox-group`,
          themeClass,
          isButtonGroup && `${mergedClsPrefix}-checkbox-group--button-group`
        ]}
        style={cssVars as CSSProperties}
        role="group"
      >
        {children}
      </div>
    )
  }
})
