import { h, defineComponent, computed, CSSProperties } from 'vue'
import { on } from 'evtd'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NIconSwitchTransition } from '../../_internal'
import { createKey, ExtractPublicPropTypes } from '../../_utils'
import { checkboxLight } from '../styles'
import type { CheckboxTheme } from '../styles'
import CheckMark from './CheckMark'
import LineMark from './LineMark'

import style from './styles/index.cssr'
import { useRtl } from '../../_mixins/use-rtl'

import { setup, checkboxProps } from './use-checkbox'
export { checkboxProps }
export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

export default defineComponent({
  name: 'Checkbox',
  props: {
    ...(useTheme.props as ThemeProps<CheckboxTheme>),
    ...checkboxProps
  },
  setup (props) {
    const checkbox = setup(props)

    const themeRef = useTheme(
      'Checkbox',
      '-checkbox',
      style,
      checkboxLight,
      props,
      checkbox.mergedClsPrefix
    )

    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)

    const rtlEnabledRef = useRtl('Checkbox', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { value: mergedSize } = checkbox.mergedSize

      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderRadius,
          color,
          colorChecked,
          colorDisabled,
          colorTableHeader,
          colorTableHeaderModal,
          colorTableHeaderPopover,
          checkMarkColor,
          checkMarkColorDisabled,
          border,
          borderFocus,
          borderDisabled,
          borderChecked,
          boxShadowFocus,
          textColor,
          textColorDisabled,
          checkMarkColorDisabledChecked,
          colorDisabledChecked,
          borderDisabledChecked,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          [createKey('fontSize', mergedSize)]: fontSize,
          [createKey('size', mergedSize)]: size
        }
      } = themeRef.value
      return {
        '--n-label-line-height': labelLineHeight,
        '--n-label-font-weight': labelFontWeight,
        '--n-size': size,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-border': border,
        '--n-border-checked': borderChecked,
        '--n-border-focus': borderFocus,
        '--n-border-disabled': borderDisabled,
        '--n-border-disabled-checked': borderDisabledChecked,
        '--n-box-shadow-focus': boxShadowFocus,
        '--n-color': color,
        '--n-color-checked': colorChecked,
        '--n-color-table': colorTableHeader,
        '--n-color-table-modal': colorTableHeaderModal,
        '--n-color-table-popover': colorTableHeaderPopover,
        '--n-color-disabled': colorDisabled,
        '--n-color-disabled-checked': colorDisabledChecked,
        '--n-text-color': textColor,
        '--n-text-color-disabled': textColorDisabled,
        '--n-check-mark-color': checkMarkColor,
        '--n-check-mark-color-disabled': checkMarkColorDisabled,
        '--n-check-mark-color-disabled-checked': checkMarkColorDisabledChecked,
        '--n-font-size': fontSize,
        '--n-label-padding': labelPadding
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'checkbox',
        computed(() => checkbox.mergedSize.value[0]),
        cssVarsRef,
        props
      )
      : undefined

    return Object.assign(checkbox, {
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    })
  },
  render () {
    const {
      $slots,
      renderedChecked,
      mergedDisabled,
      indeterminate,
      privateInsideTable,
      cssVars,
      labelId,
      label,
      mergedClsPrefix,
      focusable,
      handleKeyUp,
      handleKeyDown,
      handleClick
    } = this
    this.onRender?.()
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-checkbox`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`,
          renderedChecked && `${mergedClsPrefix}-checkbox--checked`,
          mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`,
          indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`,
          privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`
        ]}
        tabindex={mergedDisabled || !focusable ? undefined : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : renderedChecked}
        aria-labelledby={labelId}
        style={cssVars as CSSProperties}
        onKeyup={handleKeyUp}
        onKeydown={handleKeyDown}
        onClick={handleClick}
        onMousedown={() => {
          on(
            'selectstart',
            window,
            (e: Event): void => {
              e.preventDefault()
            },
            {
              once: true
            }
          )
        }}
      >
        <div class={`${mergedClsPrefix}-checkbox-box-wrapper`}>
          &nbsp;
          <div class={`${mergedClsPrefix}-checkbox-box`}>
            <NIconSwitchTransition>
              {{
                default: () =>
                  this.indeterminate ? (
                    <div
                      key="indeterminate"
                      class={`${mergedClsPrefix}-checkbox-icon`}
                    >
                      {LineMark}
                    </div>
                  ) : (
                    <div key="check" class={`${mergedClsPrefix}-checkbox-icon`}>
                      {CheckMark}
                    </div>
                  )
              }}
            </NIconSwitchTransition>
            <div class={`${mergedClsPrefix}-checkbox-box__border`} />
          </div>
        </div>
        {label !== null || $slots.default ? (
          <span class={`${mergedClsPrefix}-checkbox__label`} id={labelId}>
            {$slots.default ? $slots.default() : label}
          </span>
        ) : null}
      </div>
    )
  }
})
