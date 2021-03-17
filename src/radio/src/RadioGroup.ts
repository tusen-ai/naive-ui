import {
  h,
  defineComponent,
  computed,
  PropType,
  VNode,
  provide,
  ref,
  toRef,
  reactive,
  VNodeChild
} from 'vue'
import { useMergedState } from 'vooks'
import { useTheme, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { getSlot, warn, createKey, call, flatten } from '../../_utils'
import { radioLight } from '../styles'
import type { RadioTheme } from '../styles'
import type { RadioProps, RadioGroupInjection } from './use-radio'
import style from './styles/radio-group.cssr'

function mapSlot (
  defaultSlot: VNode[],
  value: string | number | null
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
        'n-radio-group__splitor--disabled': lastInstanceDisabled,
        'n-radio-group__splitor--checked': lastInstanceChecked
      }
      const currentInstanceClass = {
        'n-radio-group__splitor--disabled': currentInstanceDisabled,
        'n-radio-group__splitor--checked': currentInstanceChecked
      }
      const splitorClass =
        lastInstancePriority < currentInstancePriority
          ? currentInstanceClass
          : lastInstanceClass
      children.push(
        h('div', {
          class: ['n-radio-group__splitor', splitorClass]
        }),
        wrappedInstance
      )
    }
  }
  return {
    children,
    isButtonGroup
  }
}

export default defineComponent({
  name: 'RadioGroup',
  props: {
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
      type: Function as PropType<
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
  },
  setup (props) {
    const formItem = useFormItem(props)
    const themeRef = useTheme('Radio', 'RadioGroup', style, radioLight, props)
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
    provide<RadioGroupInjection>(
      'NRadioGroup',
      reactive({
        name: toRef(props, 'name'),
        value: mergedValueRef,
        doUpdateValue,
        disabled: toRef(props, 'disabled'),
        mergedSize: formItem.mergedSize
      })
    )
    return {
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
    const { mergedValue } = this
    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      mergedValue
    )
    return h(
      'div',
      {
        class: [
          'n-radio-group',
          {
            'n-radio-group--button-group': isButtonGroup
          }
        ],
        style: this.cssVars
      },
      children
    )
  }
})
