import { h, defineComponent, PropType, ref } from 'vue'
import {
  NScrollbar,
  ScrollbarInst as InternalScrollbarInst
} from '../../_internal'
import { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import { useTheme, ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'

export interface ScrollTo {
  (x: number, y: number): void
  (options: { left?: number, top?: number, behavior?: ScrollBehavior }): void
}

export type ScrollBy = ScrollTo

export interface ScrollbarInst {
  scrollTo: ScrollTo
  scrollBy: ScrollBy
}

export const scrollbarProps = {
  ...(useTheme.props as ThemeProps<ScrollbarTheme>),
  trigger: String as PropType<'none' | 'hover'>,
  xScrollable: Boolean,
  onScroll: Function as PropType<(e: Event) => void>,
  size: Number
} as const

export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>

const Scrollbar = defineComponent({
  name: 'Scrollbar',
  props: scrollbarProps,
  setup () {
    const scrollbarInstRef = ref<InternalScrollbarInst | null>(null)
    const exposedMethods: ScrollbarInst = {
      scrollTo: (...args: any[]) => {
        scrollbarInstRef.value?.scrollTo(args[0], args[1])
      },
      scrollBy: (...args: any[]) => {
        scrollbarInstRef.value?.scrollBy(args[0], args[1])
      }
    }
    return {
      ...exposedMethods,
      scrollbarInstRef
    }
  },
  render () {
    return (
      <NScrollbar ref="scrollbarInstRef" {...this.$props}>
        {this.$slots}
      </NScrollbar>
    )
  }
})

export default Scrollbar
