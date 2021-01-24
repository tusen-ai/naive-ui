import {
  defineComponent,
  computed,
  CSSProperties,
  PropType,
  h,
  renderSlot
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { statisticLight } from '../styles'
import type { StatisticTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Statistic',
  props: {
    ...(useTheme.props as ThemeProps<StatisticTheme>),
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    valueStyle: {
      type: [Object, String] as PropType<undefined | string | CSSProperties>,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Statistic',
      'Statistic',
      style,
      statisticLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          self: {
            labelFontWeight,
            valueFontWeight,
            valuePrefixTextColor,
            labelTextColor,
            valueSuffixTextColor,
            valueTextColor,
            labelFontSize
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--label-font-size': labelFontSize,
          '--label-font-weight': labelFontWeight,
          '--label-text-color': labelTextColor,
          '--value-font-weight': valueFontWeight,
          '--value-prefix-text-color': valuePrefixTextColor,
          '--value-suffix-text-color': valueSuffixTextColor,
          '--value-text-color': valueTextColor
        }
      })
    }
  },
  render () {
    const { $slots } = this
    return (
      <div class="n-statistic" style={this.cssVars as CSSProperties}>
        <div class="n-statistic__label">{this.label}</div>
        <div class="n-statistic-value">
          {$slots.prefix ? (
            <span class="n-statistic-value__prefix">
              {renderSlot($slots, 'prefix')}
            </span>
          ) : null}
          {this.value !== undefined ? (
            <span class="n-statistic-value__content">{this.value}</span>
          ) : (
            <span class="n-statistic-value__content">{$slots}</span>
          )}
          {$slots.suffix ? (
            <span class="n-statistic-value__suffix">
              {renderSlot($slots, 'suffix')}
            </span>
          ) : null}
        </div>
      </div>
    )
  }
})
