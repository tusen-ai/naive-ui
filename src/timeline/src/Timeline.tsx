import { h, defineComponent, PropType, ExtractPropTypes, provide } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { TimelineTheme } from '../styles'

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

export type TimelineInjection = ExtractPropTypes<typeof timelineProps>

export default defineComponent({
  name: 'Timeline',
  provide () {
    return {
      NTimeline: this
    }
  },
  props: timelineProps,
  setup (props, { slots }) {
    provide<TimelineInjection>('NTimeline', props)
    return () => (
      <div
        class={[
          'n-timeline',
          `n-timeline--${props.size}-size`,
          `n-timeline--${props.itemPlacement}-placement`
        ]}
      >
        {slots}
      </div>
    )
  }
})
