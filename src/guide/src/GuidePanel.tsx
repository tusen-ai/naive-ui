import type { CSSProperties, PropType, SlotsType } from 'vue'
import type { ButtonProps } from '../../button'
import type { GuideSlotProps, GuideSlots, GuideStep } from './interface'
import { computed, defineComponent, h, inject } from 'vue'
import { useConfig, useLocale } from '../../_mixins'
import {
  resolveSlotWithTypedProps,
  resolveWrappedSlotWithProps
} from '../../_utils'
import { NButton } from '../../button'
import { guideInjectionKey } from './interface'

export const guidePanelProps = {
  step: {
    type: Object as PropType<GuideStep>,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  prevText: String as PropType<string | null>,
  nextText: String as PropType<string | null>,
  finishText: String as PropType<string | null>,
  skipText: String as PropType<string | null>,
  prevButtonProps: Object as PropType<ButtonProps>,
  nextButtonProps: Object as PropType<ButtonProps>,
  finishButtonProps: Object as PropType<ButtonProps>,
  skipButtonProps: Object as PropType<ButtonProps>,
  onPrev: {
    type: Function as PropType<() => void>,
    required: true
  },
  onNext: {
    type: Function as PropType<() => void>,
    required: true
  },
  onFinish: {
    type: Function as PropType<() => void>,
    required: true
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true
  }
} as const

export default defineComponent({
  name: 'GuidePanel',
  props: guidePanelProps,
  slots: Object as SlotsType<GuideSlots>,
  setup(props) {
    const { localeRef } = useLocale('Guide')
    const { inlineThemeDisabled } = useConfig()
    const NGuide = inject(guideInjectionKey)!
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderRadius,
          color,
          dividerColor,
          fontSize,
          titleFontSize,
          titleFontWeight,
          textColor,
          titleTextColor,
          boxShadow,
          padding,
          actionGap
        }
      } = NGuide.mergedThemeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-color': color,
        '--n-divider-color': dividerColor,
        '--n-font-size': fontSize,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-text-color': textColor,
        '--n-title-text-color': titleTextColor,
        '--n-box-shadow': boxShadow,
        '--n-padding': padding,
        '--n-action-gap': actionGap
      }
    })
    return {
      mergedClsPrefix: NGuide.mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      localizedPrevText: computed(() => {
        return props.prevText ?? localeRef.value.prevText
      }),
      localizedNextText: computed(() => {
        return props.nextText ?? localeRef.value.nextText
      }),
      localizedFinishText: computed(() => {
        return props.finishText ?? localeRef.value.finishText
      }),
      localizedSkipText: computed(() => {
        return props.skipText ?? localeRef.value.skipText
      })
    }
  },
  render() {
    const { mergedClsPrefix, step, current, total, $slots } = this
    const slotProps: GuideSlotProps = { step, current, total }
    const isLast = current >= total
    const titleNode = resolveWrappedSlotWithProps(
      $slots.title,
      slotProps,
      children =>
        children || step.title ? (
          <div class={`${mergedClsPrefix}-guide-panel__title`}>
            {children ?? step.title}
          </div>
        ) : null
    )
    const contentNode = resolveSlotWithTypedProps(
      $slots.default,
      slotProps,
      () => {
        const { content } = step
        if (typeof content === 'function') {
          return [content()]
        }
        return content ? [content] : []
      }
    )
    const indicatorNode = resolveSlotWithTypedProps(
      $slots.indicator,
      slotProps,
      () => [`${current} / ${total}`]
    )
    const actionNode = resolveSlotWithTypedProps(
      $slots.actions,
      slotProps,
      () => [
        this.skipText !== null && (
          <NButton
            size="small"
            text
            onClick={this.onClose}
            {...this.skipButtonProps}
          >
            {{ default: () => this.localizedSkipText }}
          </NButton>
        ),
        current > 1 && this.prevText !== null && (
          <NButton size="small" onClick={this.onPrev} {...this.prevButtonProps}>
            {{ default: () => this.localizedPrevText }}
          </NButton>
        ),
        !isLast && this.nextText !== null && (
          <NButton
            size="small"
            type="primary"
            onClick={this.onNext}
            {...this.nextButtonProps}
          >
            {{ default: () => this.localizedNextText }}
          </NButton>
        ),
        isLast && this.finishText !== null && (
          <NButton
            size="small"
            type="primary"
            onClick={this.onFinish}
            {...this.finishButtonProps}
          >
            {{ default: () => this.localizedFinishText }}
          </NButton>
        )
      ]
    )
    return (
      <div
        class={`${mergedClsPrefix}-guide-panel`}
        style={this.cssVars as CSSProperties}
      >
        {titleNode}
        {contentNode.length ? (
          <div class={`${mergedClsPrefix}-guide-panel__content`}>
            {contentNode}
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-guide-panel__footer`}>
          <div class={`${mergedClsPrefix}-guide-panel__indicator`}>
            {indicatorNode}
          </div>
          <div class={`${mergedClsPrefix}-guide-panel__actions`}>
            {actionNode}
          </div>
        </div>
      </div>
    )
  }
})
