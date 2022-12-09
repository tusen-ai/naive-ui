import {
  h,
  defineComponent,
  provide,
  PropType,
  computed,
  toRef,
  ref,
  watchEffect,
  VNode,
  VNodeChild,
  CSSProperties
} from 'vue'
import { useMergedState } from 'vooks'
import { useTheme, useConfig, useFormItem, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  MaybeArray,
  createKey,
  warnOnce,
  warn,
  flatten,
  getSlot
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/checkbox-group.cssr'
import { checkboxLight } from '../styles'
import type { CheckboxTheme } from '../styles'
import type { CheckboxProps } from './use-checkbox'
import { checkboxGroupInjectionKey } from './use-checkbox'
import { useRtl } from '../../_mixins/use-rtl'

function mapSlot (
  defaultSlot: VNode[],
  value: Array<string | number> | null,
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
    const instanceProps: CheckboxProps = wrappedInstance.props as any
    if (name !== 'CheckboxButton') {
      children.push(wrappedInstance)
      continue
    }
    if (i === 0) {
      children.push(wrappedInstance)
    } else {
      const lastInstanceProps: CheckboxProps = children[children.length - 1]
        .props as any
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const lastInstanceChecked = value?.includes(lastInstanceProps.value!)
      const lastInstanceDisabled: boolean | undefined =
        lastInstanceProps.disabled
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentInstanceChecked = value?.includes(instanceProps.value!)
      const currentInstanceDisabled = instanceProps.disabled
      /**
       * Priority of button splitor:
       * !disabled  checked >
       *  disabled  checked >
       * !disabled !checked >
       *  disabled !checked
       */
      const lastInstancePriority: number =
        (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
      const currentInstancePriority =
        (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
      const lastInstanceClass = {
        [`${clsPrefix}-checkbox-group__splitor--disabled`]:
          lastInstanceDisabled,
        [`${clsPrefix}-checkbox-group__splitor--checked`]: lastInstanceChecked
      }
      const currentInstanceClass = {
        [`${clsPrefix}-checkbox-group__splitor--disabled`]:
          currentInstanceDisabled,
        [`${clsPrefix}-checkbox-group__splitor--checked`]:
          currentInstanceChecked
      }
      const splitorClass =
        lastInstancePriority < currentInstancePriority
          ? currentInstanceClass
          : lastInstanceClass
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
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)

    const themeRef = useTheme(
      'Checkbox',
      '-checkbox-group',
      style,
      checkboxLight,
      props,
      mergedClsPrefixRef
    )
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

    const rtlEnabledRef = useRtl('Checkbox', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          buttonBorderColor,
          buttonBorderColorActive,
          buttonBorderRadius,
          buttonBoxShadow,
          buttonBoxShadowFocus,
          buttonBoxShadowHover,
          buttonColorActive,
          buttonTextColor,
          buttonTextColorActive,
          buttonTextColorHover,
          opacityDisabled,
          [createKey('buttonHeight', size)]: height,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-button-border-color': buttonBorderColor,
        '--n-button-border-color-active': buttonBorderColorActive,
        '--n-button-border-radius': buttonBorderRadius,
        '--n-button-box-shadow': buttonBoxShadow,
        '--n-button-box-shadow-focus': buttonBoxShadowFocus,
        '--n-button-box-shadow-hover': buttonBoxShadowHover,
        '--n-button-color-active': buttonColorActive,
        '--n-button-text-color': buttonTextColor,
        '--n-button-text-color-hover': buttonTextColorHover,
        '--n-button-text-color-active': buttonTextColorActive,
        '--n-height': height,
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
      mergedValue: mergedValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedValue, mergedClsPrefix, rtlEnabled, themeClass } = this

    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      mergedValue,
      mergedClsPrefix
    )
    return (
      <div
        class={[
          `${mergedClsPrefix}-checkbox-group`,
          rtlEnabled && `${mergedClsPrefix}-checkbox-group--rtl`,
          themeClass,
          isButtonGroup && `${mergedClsPrefix}-checkbox-group--button-group`
        ]}
        style={this.cssVars as CSSProperties}
        role="group"
      >
        {children}
      </div>
    )
  }
})
