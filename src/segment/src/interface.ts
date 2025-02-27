export interface SegmentItemType {
  label: string
  value: string | number
  icon?: string
  disabled?: boolean
}

export type SegmentSize = 'small' | 'medium' | 'large'

export type OnUpdateValue = (value: string & number & boolean) => void

export type OnUpdateValueImpl = (value: string | number | boolean) => void
