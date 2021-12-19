import {
  h,
  ref,
  toRef,
  defineComponent,
  computed,
  CSSProperties,
  PropType,
  Transition,
  watchEffect
} from 'vue'
import { depx, pxfy } from 'seemly'
import { useMergedState } from 'vooks'
import { useConfig, useFormItem, useTheme } from '../../_mixins'
import { NBaseLoading } from '../../_internal'
import type { ThemeProps } from '../../_mixins'
import { call, createKey, warnOnce } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { switchLight } from '../styles'
import type { SwitchTheme } from '../styles'
import type { OnUpdateValueImpl, OnUpdateValue } from './interface'
import style from './styles/index.cssr'

const switchProps = {
  ...(useTheme.props as ThemeProps<SwitchTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  value: {
    type: [String, Number, Boolean] as PropType<
    string | number | boolean | undefined
    >,
    default: undefined
  },
  loading: Boolean,
  defaultValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  round: {
    type: Boolean,
    default: true
  },
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  checkedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false
  },
  railStyle: Function as PropType<
  (params: { focused: boolean, checked: boolean }) => string | CSSProperties
  >,
  /** @deprecated */
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>
} as const

export type SwitchProps = ExtractPublicPropTypes<typeof switchProps>

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange) {
          warnOnce(
            'switch',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Switch',
      'Switch',
      style,
      switchLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const checkedRef = computed(() => {
      return mergedValueRef.value === props.checkedValue
    })
    const pressedRef = ref(false)
    const focusedRef = ref(false)
    const mergedRailStyleRef = computed(() => {
      const { railStyle } = props
      if (!railStyle) return undefined
      return railStyle({ focused: focusedRef.value, checked: checkedRef.value })
    })
    function doUpdateValue (value: string | number | boolean): void {
      const {
        'onUpdate:value': _onUpdateValue,
        onChange,
        onUpdateValue
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (onChange) call(onChange as OnUpdateValueImpl, value)
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
      if (props.loading) return
      if (!mergedDisabledRef.value) {
        if (mergedValueRef.value !== props.checkedValue) {
          doUpdateValue(props.checkedValue)
        } else {
          doUpdateValue(props.uncheckedValue)
        }
      }
    }
    function handleFocus (): void {
      focusedRef.value = true
      doFocus()
    }
    function handleBlur (): void {
      focusedRef.value = false
      doBlur()
      pressedRef.value = false
    }
    function handleKeyup (e: KeyboardEvent): void {
      if (props.loading) return
      if (e.code === 'Space') {
        doUpdateValue(!mergedValueRef.value)
        pressedRef.value = false
      }
    }
    function handleKeydown (e: KeyboardEvent): void {
      if (props.loading) return
      if (e.code === 'Space') {
        e.preventDefault()
        pressedRef.value = true
      }
    }
    return {
      handleClick,
      handleBlur,
      handleFocus,
      handleKeyup,
      handleKeydown,
      mergedRailStyle: mergedRailStyleRef,
      pressed: pressedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      checked: checkedRef,
      mergedDisabled: mergedDisabledRef,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          self: {
            opacityDisabled,
            railColor,
            railColorActive,
            buttonBoxShadow,
            buttonColor,
            boxShadowFocus,
            loadingColor,
            textColor,
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
          '--n-bezier': cubicBezierEaseInOut,
          '--n-button-border-radius': buttonBorderRadius,
          '--n-button-box-shadow': buttonBoxShadow,
          '--n-button-color': buttonColor,
          '--n-button-width': buttonWidth,
          '--n-button-width-pressed': buttonWidthPressed,
          '--n-button-height': buttonHeight,
          '--n-height': height,
          '--n-offset': offset,
          '--n-opacity-disabled': opacityDisabled,
          '--n-rail-border-radius': railBorderRadius,
          '--n-rail-color': railColor,
          '--n-rail-color-active': railColorActive,
          '--n-rail-height': railHeight,
          '--n-rail-width': railWidth,
          '--n-width': width,
          '--n-box-shadow-focus': boxShadowFocus,
          '--n-loading-color': loadingColor,
          '--n-text-color': textColor
        }
      })
    }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedDisabled,
      checked,
      mergedRailStyle,
      $slots
    } = this
    const { checked: checkedSlot, unchecked: uncheckedSlot } = $slots
    return (
      <div
        role="switch"
        aria-checked={checked}
        class={[
          `${mergedClsPrefix}-switch`,
          checked && `${mergedClsPrefix}-switch--active`,
          mergedDisabled && `${mergedClsPrefix}-switch--disabled`,
          this.round && `${mergedClsPrefix}-switch--round`,
          this.loading && `${mergedClsPrefix}-switch--loading`,
          this.pressed && `${mergedClsPrefix}-switch--pressed`
        ]}
        tabindex={!this.mergedDisabled ? 0 : undefined}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyup={this.handleKeyup}
        onKeydown={this.handleKeydown}
      >
        <div
          class={`${mergedClsPrefix}-switch__rail`}
          aria-hidden="true"
          style={mergedRailStyle}
        >
          {(checkedSlot || uncheckedSlot) && (
            <div
              aria-hidden
              class={`${mergedClsPrefix}-switch__children-placeholder`}
            >
              <div class={`${mergedClsPrefix}-switch__rail-placeholder`}>
                <div class={`${mergedClsPrefix}-switch__button-placeholder`} />
                {checkedSlot?.()}
              </div>
              <div class={`${mergedClsPrefix}-switch__rail-placeholder`}>
                <div class={`${mergedClsPrefix}-switch__button-placeholder`} />
                {uncheckedSlot?.()}
              </div>
            </div>
          )}
          <div class={`${mergedClsPrefix}-switch__button`}>
            <Transition name="fade-in-scale-up-transition">
              {{
                default: () =>
                  this.loading ? (
                    <NBaseLoading
                      key="loading"
                      clsPrefix={mergedClsPrefix}
                      strokeWidth={20}
                    />
                  ) : null
              }}
            </Transition>
            {checkedSlot && (
              <div key="checked" class={`${mergedClsPrefix}-switch__checked`}>
                {checkedSlot()}
              </div>
            )}
            {uncheckedSlot && (
              <div
                key="unchecked"
                class={`${mergedClsPrefix}-switch__unchecked`}
              >
                {uncheckedSlot()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
})
