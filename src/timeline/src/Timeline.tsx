import {
  h,
  defineComponent,
  PropType,
  ExtractPropTypes,
  provide,
  InjectionKey,
  Ref
} from 'vue'
import { MergedTheme, useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { TimelineTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'
import { timelineLight } from '../styles'
import style from './styles/index.cssr'

const timelineProps = {
  ...(useTheme.props as ThemeProps<TimelineTheme>),
  itemPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  size: {
    type: String as PropType<'medium' | 'large'>,
    default: 'medium'
  }
} as const

export interface TimelineInjection {
  props: ExtractPropTypes<typeof timelineProps>
  mergedThemeRef: Ref<MergedTheme<TimelineTheme>>
  mergedClsPrefixRef: Ref<string>
}
export const timelineInjectionKey: InjectionKey<TimelineInjection> = Symbol(
  'timeline'
)
export type TimelineProps = ExtractPublicPropTypes<typeof timelineProps>

export default defineComponent({
  name: 'Timeline',
  props: timelineProps,
  setup (props, { slots }) {
    const { mergedClsPrefix: mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Timeline',
      'Timeline',
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
    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      return (
        <div
          class={[
            `${mergedClsPrefix}-timeline`,
            `${mergedClsPrefix}-timeline--${props.size}-size`,
            `${mergedClsPrefix}-timeline--${props.itemPlacement}-placement`
          ]}
        >
          {slots}
        </div>
      )
    }
  }
})
