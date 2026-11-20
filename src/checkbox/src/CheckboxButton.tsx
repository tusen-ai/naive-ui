import type { CSSProperties } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { CheckboxTheme } from '../styles'
import { computed, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { createKey, resolveWrappedSlot } from '../../_utils'
import { checkboxLight } from '../styles'
import groupStyle from './styles/checkbox-group.cssr'
import { checkboxBaseProps, setup } from './use-checkbox'

export const checkboxButtonProps = {
  ...checkboxBaseProps,
  ...(useTheme.props as ThemeProps<CheckboxTheme>)
}
export type CheckboxButtonProps = ExtractPublicPropTypes<
  typeof checkboxButtonProps
>

export default defineComponent({
  name: 'CheckboxButton',
  props: checkboxButtonProps,
  setup(props) {
    const checkbox = setup(props)
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Checkbox',
      '-checkbox-button',
      groupStyle,
      checkboxLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { value: mergedSize } = checkbox.mergedSize
      const {
        common: { cubicBezierEaseInOut },
        self: {
          buttonColor,
          buttonColorActive,
          buttonTextColor,
          buttonTextColorActive,
          buttonTextColorHover,
          buttonBorderColor,
          buttonBorderColorActive,
          buttonBoxShadow,
          buttonBoxShadowHover,
          buttonBoxShadowFocus,
          buttonBorderRadius,
          opacityDisabled,
          [createKey('fontSize', mergedSize)]: fontSize,
          [createKey('buttonHeight', mergedSize)]: buttonHeight
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-button-color': buttonColor,
        '--n-button-color-active': buttonColorActive,
        '--n-button-text-color': buttonTextColor,
        '--n-button-text-color-active': buttonTextColorActive,
        '--n-button-text-color-hover': buttonTextColorHover,
        '--n-button-border-color': buttonBorderColor,
        '--n-button-border-color-active': buttonBorderColorActive,
        '--n-button-box-shadow': buttonBoxShadow,
        '--n-button-box-shadow-hover': buttonBoxShadowHover,
        '--n-button-box-shadow-focus': buttonBoxShadowFocus,
        '--n-button-border-radius': buttonBorderRadius,
        '--n-button-height': buttonHeight,
        '--n-font-size': fontSize,
        '--n-opacity-disabled': opacityDisabled
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'checkbox-button',
          computed(() => checkbox.mergedSize.value[0]),
          cssVarsRef,
          props
        )
      : undefined
    return {
      ...checkbox,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
      mergedClsPrefix,
      renderedChecked,
      mergedDisabled,
      label,
      $slots,
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars,
      themeClass
    } = this as any
    return (
      <label
        class={[
          themeClass,
          `${mergedClsPrefix}-checkbox-button`,
          renderedChecked && `${mergedClsPrefix}-checkbox-button--checked`,
          mergedDisabled && `${mergedClsPrefix}-checkbox-button--disabled`
        ]}
        style={cssVars as CSSProperties}
        onClick={handleClick}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
      >
        <input
          type="checkbox"
          class={`${mergedClsPrefix}-checkbox-button__input`}
          checked={renderedChecked}
          disabled={mergedDisabled}
          tabindex={-1}
        />
        <div class={`${mergedClsPrefix}-checkbox-button__state-border`} />
        {resolveWrappedSlot($slots.default, (children) => {
          if (!children && !label)
            return null
          return (
            <span class={`${mergedClsPrefix}-checkbox-button__label`}>
              {children || label}
            </span>
          )
        })}
      </label>
    )
  }
})
