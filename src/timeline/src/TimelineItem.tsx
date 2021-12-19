import {
  defineComponent,
  computed,
  inject,
  PropType,
  h,
  renderSlot,
  CSSProperties
} from 'vue'
import { createKey, formatLength, throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { timelineInjectionKey } from './Timeline'

const timelineItemProps = {
  time: [String, Number] as PropType<string | number>,
  title: String,
  content: String,
  color: String,
  type: {
    type: String as PropType<
    'default' | 'success' | 'error' | 'warning' | 'info'
    >,
    default: 'default'
  }
}

export type TimelineItemProps = ExtractPublicPropTypes<typeof timelineItemProps>

export default defineComponent({
  name: 'TimelineItem',
  props: timelineItemProps,
  setup (props) {
    const NTimeline = inject(timelineInjectionKey)
    if (!NTimeline) {
      throwError(
        'timeline-item',
        '`n-timeline-item` must be placed inside `n-timeline`.'
      )
    }
    return {
      mergedClsPrefix: NTimeline.mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          props: { size, iconSize: iconSizeProp },
          mergedThemeRef
        } = NTimeline
        const { type } = props
        const {
          self: {
            titleTextColor,
            contentTextColor,
            metaTextColor,
            lineColor,
            titleFontWeight,
            contentFontSize,
            [createKey('iconSize', size)]: iconSize,
            [createKey('titleMargin', size)]: titleMargin,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('circleBorder', type)]: circleBorder,
            [createKey('iconColor', type)]: iconColor
          },
          common: { cubicBezierEaseInOut }
        } = mergedThemeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-circle-border': circleBorder,
          '--n-icon-color': iconColor,
          '--n-content-font-size': contentFontSize,
          '--n-content-text-color': contentTextColor,
          '--n-line-color': lineColor,
          '--n-meta-text-color': metaTextColor,
          '--n-title-font-size': titleFontSize,
          '--n-title-font-weight': titleFontWeight,
          '--n-title-margin': titleMargin,
          '--n-title-text-color': titleTextColor,
          '--n-icon-size': formatLength(iconSizeProp) || iconSize
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix, color, $slots } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-timeline-item`,
          `${mergedClsPrefix}-timeline-item--${this.type}-type`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-timeline-item-timeline`}>
          <div class={`${mergedClsPrefix}-timeline-item-timeline__line`} />
          {$slots.icon ? (
            <div
              class={`${mergedClsPrefix}-timeline-item-timeline__icon`}
              style={{ color: color }}
            >
              {$slots.icon()}
            </div>
          ) : (
            <div
              class={`${mergedClsPrefix}-timeline-item-timeline__circle`}
              style={{ borderColor: color }}
            />
          )}
        </div>
        <div class={`${mergedClsPrefix}-timeline-item-content`}>
          {this.title || $slots.header ? (
            <div class={`${mergedClsPrefix}-timeline-item-content__title`}>
              {renderSlot($slots, 'header', undefined, () => [this.title])}
            </div>
          ) : null}
          <div class={`${mergedClsPrefix}-timeline-item-content__content`}>
            {renderSlot($slots, 'default', undefined, () => [this.content])}
          </div>
          <div class={`${mergedClsPrefix}-timeline-item-content__meta`}>
            {renderSlot($slots, 'footer', undefined, () => [this.time])}
          </div>
        </div>
      </div>
    )
  }
})
