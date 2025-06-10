import type { VNode } from 'vue'

export interface SegmentItemType {
  label: string
  value: string | number
  disabled?: boolean
}

export type SegmentSize = 'small' | 'medium' | 'large'

export type segmentValueType = string | number | null

export type OnUpdateValue = (value: string & number) => void

export type OnUpdateValueImpl = (value: string | number) => void

export interface SegmentSlots {
  default?: SegmentDefaultSlot
}
export type SegmentDefaultSlot = (
  props: SegmentItemType & { checked?: boolean }
) => VNode[]
