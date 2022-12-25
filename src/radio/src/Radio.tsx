import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, resolveWrappedSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { radioLight, RadioTheme } from '../styles'
import { setup, radioProps } from './use-radio'
import style from './styles/radio.cssr'

export { radioProps }
export type RadioProps = ExtractPublicPropTypes<typeof radioProps>

export default defineComponent({
  name: 'Radio',
  props: {
    ...(useTheme.props as ThemeProps<RadioTheme>),
    ...radioProps
  },
  setup (props) {
    const radio = setup(props)
    const themeRef = useTheme(
      'Radio',
      '-radio',
      style,
      radioLight,
      props,
      radio.mergedClsPrefix
    )
    const cssVarsRef = computed(() => {
      const {
        mergedSize: { value: size }
      } = radio
      const {
        common: { cubicBezierEaseInOut },
        self: {
          boxShadow,
          boxShadowActive,
          boxShadowDisabled,
          boxShadowFocus,
          boxShadowHover,
          color,
          colorDisabled,
          colorActive,
          textColor,
          textColorDisabled,
          dotColorActive,
          dotColorDisabled,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          [createKey('fontSize', size)]: fontSize,
          [createKey('radioSize', size)]: radioSize
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-label-line-height': labelLineHeight,
        '--n-label-font-weight': labelFontWeight,
        '--n-box-shadow': boxShadow,
        '--n-box-shadow-active': boxShadowActive,
        '--n-box-shadow-disabled': boxShadowDisabled,
        '--n-box-shadow-focus': boxShadowFocus,
        '--n-box-shadow-hover': boxShadowHover,
        '--n-color': color,
        '--n-color-active': colorActive,
        '--n-color-disabled': colorDisabled,
        '--n-dot-color-active': dotColorActive,
        '--n-dot-color-disabled': dotColorDisabled,
        '--n-font-size': fontSize,
        '--n-radio-size': radioSize,
        '--n-text-color': textColor,
        '--n-text-color-disabled': textColorDisabled,
        '--n-label-padding': labelPadding
      }
    })
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } =
      useConfig(props)
    const rtlEnabledRef = useRtl('Radio', mergedRtlRef, mergedClsPrefixRef)
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'radio',
        computed(() => radio.mergedSize.value[0]),
        cssVarsRef,
        props
      )
      : undefined
    return Object.assign(radio, {
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    })
  },
  render () {
    const { $slots, mergedClsPrefix, onRender, label } = this
    onRender?.()
    return (
      <label
        class={[
          `${mergedClsPrefix}-radio`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-radio--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-radio--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-radio--checked`]: this.renderSafeChecked,
            [`${mergedClsPrefix}-radio--focus`]: this.focus
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <input
          ref="inputRef"
          type="radio"
          class={`${mergedClsPrefix}-radio-input`}
          value={this.value}
          name={this.mergedName}
          checked={this.renderSafeChecked}
          disabled={this.mergedDisabled}
          onChange={this.handleRadioInputChange}
          onFocus={this.handleRadioInputFocus}
          onBlur={this.handleRadioInputBlur}
        />
        <div class={`${mergedClsPrefix}-radio__dot-wrapper`}>
          &nbsp;
          <div
            class={[
              `${mergedClsPrefix}-radio__dot`,
              this.renderSafeChecked && `${mergedClsPrefix}-radio__dot--checked`
            ]}
          />
        </div>
        {resolveWrappedSlot($slots.default, (children) => {
          if (!children && !label) return null
          return (
            <div ref="labelRef" class={`${mergedClsPrefix}-radio__label`}>
              {children || label}
            </div>
          )
        })}
      </label>
    )
  }
})
