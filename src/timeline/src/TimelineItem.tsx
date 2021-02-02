import {
  defineComponent,
  computed,
  inject,
  PropType,
  h,
  renderSlot,
  CSSProperties
} from 'vue'
import { useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { timelineLight } from '../styles'
import type { TimelineInjection } from './Timeline'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'TimelineItem',
  props: {
    time: [String, Number],
    title: String,
    content: String,
    type: {
      type: String as PropType<
      'default' | 'success' | 'error' | 'warning' | 'info'
      >,
      default: 'default'
    }
  },
  setup (props) {
    const NTimeline = inject<TimelineInjection>(
      'NTimeline'
    ) as TimelineInjection
    const themeRef = useTheme(
      'Timeline',
      'Timeline',
      style,
      timelineLight,
      NTimeline
    )
    return {
      cssVars: computed(() => {
        const { size } = NTimeline
        const { type } = props
        const {
          self: {
            titleTextColor,
            contentTextColor,
            metaTextColor,
            lineColor,
            titleFontWeight,
            contentFontSize,
            [createKey('titleMargin', size)]: titleMargin,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('circleBorder', type)]: circleBorder
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--circle-border': circleBorder,
          '--content-font-size': contentFontSize,
          '--content-text-color': contentTextColor,
          '--line-color': lineColor,
          '--meta-text-color': metaTextColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-margin': titleMargin,
          '--title-text-color': titleTextColor
        }
      })
    }
  },
  render () {
    return (
      <div
        class={['n-timeline-item', `n-timeline-item--${this.type}-type`]}
        style={this.cssVars as CSSProperties}
      >
        <div class="n-timeline-item-timeline">
          <div class="n-timeline-item-timeline__line" />
          <div class="n-timeline-item-timeline__circle" />
        </div>
        <div class="n-timeline-item-content">
          {this.title ? (
            <div class="n-timeline-item-content__title">
              {renderSlot(this.$slots, 'header', undefined, () => [this.title])}
            </div>
          ) : null}
          <div class="n-timeline-item-content__content">
            {renderSlot(this.$slots, 'default', undefined, () => [
              this.content
            ])}
          </div>
          <div class="n-timeline-item-content__meta">
            {renderSlot(this.$slots, 'footer', undefined, () => [this.time])}
          </div>
        </div>
      </div>
    )
  }
})
