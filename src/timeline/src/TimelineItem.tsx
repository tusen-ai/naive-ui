import {
  defineComponent,
  computed,
  inject,
  type PropType,
  h,
  type CSSProperties
} from 'vue'
import {
  createKey,
  formatLength,
  resolveSlot,
  resolveWrappedSlot,
  throwError,
  useHoudini
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { timelineInjectionKey } from './Timeline'
import { useConfig, useThemeClass } from '../../_mixins'

export const timelineItemProps = {
  time: [String, Number] as PropType<string | number>,
  title: String,
  content: String,
  color: String,
  lineType: {
    type: String as PropType<'default' | 'dashed'>,
    default: 'default'
  },
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
    useHoudini()
    const { inlineThemeDisabled } = useConfig()
    const cssVarsRef = computed(() => {
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'timeline-item',
        computed(() => {
          const {
            props: { size, iconSize: iconSizeProp }
          } = NTimeline
          const { type } = props
          return `${size[0]}${iconSizeProp || 'a'}${type[0]}`
        }),
        cssVarsRef,
        NTimeline.props
      )
      : undefined
    return {
      mergedClsPrefix: NTimeline.mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, color, onRender, $slots } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-timeline-item`,
          this.themeClass,
          `${mergedClsPrefix}-timeline-item--${this.type}-type`,
          `${mergedClsPrefix}-timeline-item--${this.lineType}-line-type`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-timeline-item-timeline`}>
          <div class={`${mergedClsPrefix}-timeline-item-timeline__line`} />
          {resolveWrappedSlot($slots.icon, (children) => {
            return children ? (
              <div
                class={`${mergedClsPrefix}-timeline-item-timeline__icon`}
                style={{ color }}
              >
                {children}
              </div>
            ) : (
              <div
                class={`${mergedClsPrefix}-timeline-item-timeline__circle`}
                style={{ borderColor: color }}
              />
            )
          })}
        </div>
        <div class={`${mergedClsPrefix}-timeline-item-content`}>
          {resolveWrappedSlot($slots.header, (children) => {
            const mergedChildren = children || this.title
            if (mergedChildren) {
              return (
                <div class={`${mergedClsPrefix}-timeline-item-content__title`}>
                  {children || this.title}
                </div>
              )
            }
            return null
          })}
          <div class={`${mergedClsPrefix}-timeline-item-content__content`}>
            {resolveSlot($slots.default, () => [this.content])}
          </div>
          <div class={`${mergedClsPrefix}-timeline-item-content__meta`}>
            {resolveSlot($slots.footer, () => [this.time])}
          </div>
        </div>
      </div>
    )
  }
})
