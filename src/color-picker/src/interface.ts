import { VNodeChild } from 'vue'

export type OnUpdateValue = (value: string & null) => void
export type OnUpdateValueImpl = (value: string | null) => void

export type RenderLabel = (
  value: string | null
) => VNodeChild
