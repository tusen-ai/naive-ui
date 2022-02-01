import { VNodeChild } from 'vue'

export type GradientType = 'flat' | 'linear-gradient' | 'radial-gradient'

export interface GradientStop {
  offset: number
  color: string
}

export interface GradientColor {
  type: GradientType
  color: string | null
  gradient: {
    degree: number
    stops: GradientStop[]
  }
}

export type OnUpdateValue = (value: string & null) => void
export type OnUpdateValueImpl = (value: string | null) => void

export type RenderLabel = (value: string | null) => VNodeChild
