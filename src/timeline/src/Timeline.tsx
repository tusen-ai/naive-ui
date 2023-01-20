import {
  h,
  defineComponent,
  PropType,
  ExtractPropTypes,
  provide,
  Ref
} from 'vue'
import { MergedTheme, useConfig, useTheme, useRtl } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { TimelineTheme } from '../styles'
import { createInjectionKey, ExtractPublicPropTypes } from '../../_utils'
import { timelineLight } from '../styles'
import style from './styles/index.cssr'

export const timelineProps = {
  ...(useTheme.props as ThemeProps<TimelineTheme>),
  horizontal: Boolean,
  itemPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  size: {
    type: String as PropType<'medium' | 'large'>,
    default: 'medium'
  },
  iconSize: Number
} as const

export interface TimelineInjection {
  props: ExtractPropTypes<typeof timelineProps>
  mergedThemeRef: Ref<MergedTheme<TimelineTheme>>
  mergedClsPrefixRef: Ref<string>
}
export const timelineInjectionKey =
  createInjectionKey<TimelineInjection>('n-timeline')

export type TimelineProps = ExtractPublicPropTypes<typeof timelineProps>

export default defineComponent({
  name: 'Timeline',
  props: timelineProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const themeRef = useTheme(
      'Timeline',
      '-timeline',
      style,
      timelineLight,
      props,
      mergedClsPrefixRef
    )
    provide(timelineInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef
    })
    const rtlEnabledRef = useRtl('Timeline', mergedRtlRef, mergedClsPrefixRef)
    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <div
          class={[
            `${mergedClsPrefix}-timeline`,
            props.horizontal && `${mergedClsPrefix}-timeline--horizontal`,
            rtlEnabledRef?.value && `${mergedClsPrefix}-timeline--rtl`,
            `${mergedClsPrefix}-timeline--${props.size}-size`,
            !props.horizontal &&
              `${mergedClsPrefix}-timeline--${props.itemPlacement}-placement`
          ]}
        >
          {slots}
        </div>
      )
    }
  }
})
