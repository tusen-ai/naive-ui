import {
  h,
  ref,
  toRef,
  defineComponent,
  computed,
  CSSProperties,
  PropType
} from 'vue'
import { depx, pxfy } from 'seemly'
import { useMergedState } from 'vooks'
import { useConfig, useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, warn, createKey } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import { switchLight } from '../styles'
import type { SwitchTheme } from '../styles'

const switchProps = {
  ...(useTheme.props as ThemeProps<SwitchTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  value: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: true
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onChange: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: boolean) => void> | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'switch',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type SwitchProps = ExtractPublicPropTypes<typeof switchProps>

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Switch',
      'Switch',
      style,
      switchLight,
      props,
      mergedClsPrefix
    )
    const formItem = useFormItem(props)
    const { mergedSize: mergedSizeRef } = formItem
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    function doUpdateValue (value: boolean): void {
      const {
        'onUpdate:value': _onUpdateValue,
        onChange,
        onUpdateValue
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (_onUpdateValue) call(_onUpdateValue, value)
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doFocus (): void {
      const { nTriggerFormFocus } = formItem
      nTriggerFormFocus()
    }
    function doBlur (): void {
      const { nTriggerFormBlur } = formItem
      nTriggerFormBlur()
    }
    function handleClick (): void {
      if (!props.disabled) {
        doUpdateValue(!mergedValueRef.value)
      }
    }
    function handleFocus (): void {
      doFocus()
    }
    function handleBlur (): void {
      doBlur()
    }
    return {
      handleClick,
      handleBlur,
      handleFocus,
      mergedClsPrefix,
      mergedValue: mergedValueRef,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          self: {
            opacityDisabled,
            railColor,
            railColorActive,
            buttonBoxShadow,
            buttonColor,
            [createKey('buttonHeight', size)]: buttonHeight,
            [createKey('buttonWidth', size)]: buttonWidth,
            [createKey('buttonWidthPressed', size)]: buttonWidthPressed,
            [createKey('railHeight', size)]: railHeight,
            [createKey('railWidth', size)]: railWidth,
            [createKey('railBorderRadius', size)]: railBorderRadius,
            [createKey('buttonBorderRadius', size)]: buttonBorderRadius
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        const offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2)
        const height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)))
        const width =
          depx(railHeight) > depx(buttonHeight)
            ? railWidth
            : pxfy(depx(railWidth) + depx(buttonHeight) - depx(railHeight))
        return {
          '--bezier': cubicBezierEaseInOut,
          '--button-border-radius': buttonBorderRadius,
          '--button-box-shadow': buttonBoxShadow,
          '--button-color': buttonColor,
          '--button-width': buttonWidth,
          '--button-width-pressed': buttonWidthPressed,
          '--button-height': buttonHeight,
          '--height': height,
          '--offset': offset,
          '--opacity-disabled': opacityDisabled,
          '--rail-border-radius': railBorderRadius,
          '--rail-color': railColor,
          '--rail-color-active': railColorActive,
          '--rail-height': railHeight,
          '--rail-width': railWidth,
          '--width': width
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-switch`,
          {
            [`${mergedClsPrefix}-switch--active`]: this.mergedValue,
            [`${mergedClsPrefix}-switch--disabled`]: this.disabled,
            [`${mergedClsPrefix}-switch--round`]: this.round
          }
        ]}
        tabindex={!this.disabled ? 0 : undefined}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <div class={`${mergedClsPrefix}-switch__rail`} />
      </div>
    )
  }
})
