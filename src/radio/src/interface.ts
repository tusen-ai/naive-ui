import type { VNode } from 'vue'

export type OnUpdateValue = (value: string & number & boolean) => void

export type OnUpdateValueImpl = (value: string | number | boolean) => void

export interface RadioSlots {
  default?: () => VNode[]
}
