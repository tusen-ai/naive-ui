import type { PropType, VNode } from 'vue'

export type BubblePlacement = 'start' | 'end'
export type BubbleVariant = 'filled' | 'borderless' | 'outlined' | 'shadow'
export type BubbleShape = 'round' | 'corner'

export const BubbleProps = {
  placement: {
    type: String as PropType<BubblePlacement>,
    default: 'start'
  },
  variant: {
    type: String as PropType<BubbleVariant>,
    default: 'filled'
  },
  avatar: {
    type: String
  },
  content: {
    type: String
  },
  shape: {
    type: String as PropType<BubbleShape>
  },
  loading: {
    type: Boolean,
    default: false
  },
  isTyping: {
    type: Boolean,
    default: false
  }
}

export type BubbleAvatarSlot = () => VNode[]
export type BubbleHeaderSlot = () => VNode[]
export type BubbleFooterSlot = () => VNode[]
export type BubbleLoadingSlot = () => VNode[]
export type BubbleContentSlot = () => VNode[]

export interface BubbleSlots {
  avatar?: BubbleAvatarSlot
  header?: BubbleHeaderSlot
  footer?: BubbleFooterSlot
  loading?: BubbleLoadingSlot
  content?: BubbleContentSlot
}
