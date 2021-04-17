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
import type { ExtractPublicPropTypes } from '../../_utils'
import { radioLight } from '../styles'
import type { RadioTheme } from '../styles'
import type { RadioProps } from './use-radio'
import { radioGroupInjectionKey } from './use-radio'
import style from './styles/radio-group.cssr'

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
      const lastInstanceDisabled: boolean = lastInstanceProps.disabled
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
        [`${clsPrefix}-radio-group__splitor--disabled`]: currentInstanceDisabled,
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
  value: {
    type: [String, Number] as PropType<string | number | undefined | null>
  },
  defaultValue: {
    type: [String, Number] as PropType<string | number | null>,
    default: null
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | undefined>,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': Function as PropType<(value: string | number) => void>,
  onUpdateValue: Function as PropType<(value: string | number) => void>,
  // deprecated
  onChange: {
    type: (Function as unknown) as PropType<
    ((value: string | number) => void) | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'radio-group',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>

export default defineComponent({
  name: 'RadioGroup',
  props: radioGroupProps,
  setup (props) {
    const formItem = useFormItem(props)
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Radio',
      'RadioGroup',
      style,
      radioLight,
      props,
      mergedClsPrefix
    )
    const { mergedSize: mergedSizeRef } = formItem
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    function doUpdateValue (value: string | number): void {
      const {
        onChange,
        onUpdateValue,
        'onUpdate:value': _onUpdateValue
      } = props
      if (onChange) {
        onChange(value)
      }
      if (onUpdateValue) {
        call(onUpdateValue, value)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value)
      }
      uncontrolledValueRef.value = value
    }
    provide(radioGroupInjectionKey, {
      cPrefixRef: mergedClsPrefix,
      nameRef: toRef(props, 'name'),
      valueRef: mergedValueRef,
      disabledRef: toRef(props, 'disabled'),
      mergedSizeRef: formItem.mergedSize,
      doUpdateValue
    })
    return {
      cPrefix: mergedClsPrefix,
      mergedValue: mergedValueRef,
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
            [createKey('buttonHeight', size)]: height
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--button-border-color': buttonBorderColor,
          '--button-border-color-active': buttonBorderColorActive,
          '--button-border-radius': buttonBorderRadius,
          '--button-box-shadow': buttonBoxShadow,
          '--button-box-shadow-focus': buttonBoxShadowFocus,
          '--button-box-shadow-hover': buttonBoxShadowHover,
          '--button-color-active': buttonColorActive,
          '--button-text-color': buttonTextColor,
          '--button-text-color-hover': buttonTextColorHover,
          '--button-text-color-active': buttonTextColorActive,
          '--height': height,
          '--opacity-disabled': opacityDisabled
        }
      })
    }
  },
  render () {
    const { mergedValue, cPrefix } = this
    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      mergedValue,
      cPrefix
    )
    return (
      <div
        class={[
          `${cPrefix}-radio-group`,
          isButtonGroup && `${cPrefix}-radio-group--button-group`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {children}
      </div>
    )
  }
})
