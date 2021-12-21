import {
  h,
  defineComponent,
  computed,
  PropType,
  VNode,
  provide,
  ref,
  toRef,
  VNodeChild,
  CSSProperties
} from 'vue'
import { useMergedState } from 'vooks'
import { useTheme, useFormItem, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { getSlot, warn, createKey, call, flatten } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { radioLight } from '../styles'
import type { RadioTheme } from '../styles'
import type { RadioProps } from './use-radio'
import { radioGroupInjectionKey } from './use-radio'
import style from './styles/radio-group.cssr'
import { OnUpdateValue, OnUpdateValueImpl } from './interface'

function mapSlot (
  defaultSlot: VNode[],
  value: string | number | null,
  clsPrefix: string
): {
    children: VNodeChild[]
    isButtonGroup: boolean
  } {
  const children = []
  let isButtonGroup = false
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i]
    const name = (wrappedInstance.type as any)?.name
    if (name === 'RadioButton') {
      isButtonGroup = true
    }
    if (__DEV__ && isButtonGroup && name !== 'RadioButton') {
      warn(
        'radio-group',
        '`n-radio-group` in button mode only takes `n-radio-button` as children.'
      )
      continue
    }
    const instanceProps: RadioProps = wrappedInstance.props as any
    if (name !== 'RadioButton') {
      children.push(wrappedInstance)
      continue
    }
    if (i === 0) {
      children.push(wrappedInstance)
    } else {
      const lastInstanceProps: RadioProps = children[children.length - 1]
        .props as any
      const lastInstanceChecked = value === lastInstanceProps.value
      const lastInstanceDisabled: boolean | undefined =
        lastInstanceProps.disabled
      const currentInstanceChecked = value === instanceProps.value
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
        [`${clsPrefix}-radio-group__splitor--disabled`]: lastInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: lastInstanceChecked
      }
      const currentInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]:
          currentInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: currentInstanceChecked
      }
      const splitorClass =
        lastInstancePriority < currentInstancePriority
          ? currentInstanceClass
          : lastInstanceClass
      children.push(
        <div class={[`${clsPrefix}-radio-group__splitor`, splitorClass]}></div>,
        wrappedInstance
      )
    }
  }
  return {
    children,
    isButtonGroup
  }
}

const radioGroupProps = {
  ...(useTheme.props as ThemeProps<RadioTheme>),
  name: String,
  value: [String, Number] as PropType<string | number | null>,
  defaultValue: {
    type: [String, Number] as PropType<string | number | null>,
    default: null
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>
} as const

export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>

export default defineComponent({
  name: 'RadioGroup',
  props: radioGroupProps,
  setup (props) {
    const selfElRef = ref<HTMLDivElement | null>(null)
    const {
      mergedSizeRef,
      mergedDisabledRef,
      nTriggerFormChange,
      nTriggerFormInput,
      nTriggerFormBlur,
      nTriggerFormFocus
    } = useFormItem(props)
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Radio',
      'RadioGroup',
      style,
      radioLight,
      props,
      mergedClsPrefixRef
    )
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    function doUpdateValue (value: string | number): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function handleFocusin (e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null)) return
      nTriggerFormFocus()
    }
    function handleFocusout (e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null)) return
      nTriggerFormBlur()
    }
    provide(radioGroupInjectionKey, {
      mergedClsPrefixRef,
      nameRef: toRef(props, 'name'),
      valueRef: mergedValueRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      doUpdateValue
    })
    return {
      selfElRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      handleFocusout,
      handleFocusin,
      cssVars: computed(() => {
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
    }
  },
  render () {
    const { mergedValue, mergedClsPrefix, handleFocusin, handleFocusout } = this
    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      mergedValue,
      mergedClsPrefix
    )
    return (
      <div
        onFocusin={handleFocusin}
        onFocusout={handleFocusout}
        ref="selfElRef"
        class={[
          `${mergedClsPrefix}-radio-group`,
          isButtonGroup && `${mergedClsPrefix}-radio-group--button-group`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {children}
      </div>
    )
  }
})
