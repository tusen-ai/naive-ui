import { h, defineComponent, PropType } from 'vue'
import { NScrollbar } from '../../_internal'
import { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import { useTheme, ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'

export type ScrollTo = (x: number, y: number) => void

export interface ScrollbarInst {
  scrollTo: ScrollTo
}

const scrollbarProps = {
  ...(useTheme.props as ThemeProps<ScrollbarTheme>),
  xScrollable: Boolean,
  onScroll: Function as PropType<(e: Event) => void>
} as const

export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>

const Scrollbar = defineComponent({
  name: 'Scrollbar',
  props: scrollbarProps,
  setup (props, { slots }) {
    return () => h(NScrollbar, props, slots)
  }
})

export default Scrollbar
