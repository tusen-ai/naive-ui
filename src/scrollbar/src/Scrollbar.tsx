import { type PropType } from 'vue'
import { NScrollbar } from '../../_internal'
import { type ScrollbarTheme } from '../../_internal/scrollbar/styles'
import { useTheme, type ThemeProps } from '../../_mixins'
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

const Scrollbar = NScrollbar as unknown as (props: ScrollbarProps) => any

export default Scrollbar
