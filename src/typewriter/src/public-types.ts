import type { VNode } from 'vue'

export interface TypewriterOptions {
  interval?: number
  step?: number | number[]
  initialIndex?: number
}

export interface TypewriterSlots {
  default?: TypewriterDefaultSlot
}

export type TypewriterDefaultSlot = (PROPS: { typedContent: string }) => VNode[]
