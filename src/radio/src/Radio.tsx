import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { radioLight, RadioTheme } from '../styles'
import useRadio from './use-radio'
import style from './styles/radio.cssr'

export type RadioProps = ExtractPublicPropTypes<typeof useRadio.props>

export default defineComponent({
  name: 'Radio',
  props: {
    ...(useTheme.props as ThemeProps<RadioTheme>),
    ...useRadio.props
  },
  setup (props) {
    const radio = useRadio(props)
    const themeRef = useTheme(
      'Radio',
      'Radio',
      style,
      radioLight,
      props,
      radio.mergedClsPrefix
    )
    return Object.assign(radio, {
      cssVars: computed(() => {
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
            textColor,
            textColorDisabled,
            dotColorActive,
            dotColorDisabled,
            labelPadding,
            [createKey('fontSize', size)]: fontSize,
            [createKey('radioSize', size)]: radioSize
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-box-shadow': boxShadow,
          '--n-box-shadow-active': boxShadowActive,
          '--n-box-shadow-disabled': boxShadowDisabled,
          '--n-box-shadow-focus': boxShadowFocus,
          '--n-box-shadow-hover': boxShadowHover,
          '--n-color': color,
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
    })
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <label
        class={[
          `${mergedClsPrefix}-radio`,
          {
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
        <div
          class={[
            `${mergedClsPrefix}-radio__dot`,
            this.renderSafeChecked && `${mergedClsPrefix}-radio__dot--checked`
          ]}
        />
        {$slots.default ? (
          <div ref="labelRef" class={`${mergedClsPrefix}-radio__label`}>
            {$slots.default()}
          </div>
        ) : null}
      </label>
    )
  }
})
