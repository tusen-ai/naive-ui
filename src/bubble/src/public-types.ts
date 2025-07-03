import type { VNode } from 'vue'

export type BubblePlacement = 'start' | 'end'
export type BubbleVariant = 'filled' | 'borderless' | 'outlined' | 'shadow'
export type BubbleShape = 'round' | 'corner'

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

export interface BubbleInst {}
