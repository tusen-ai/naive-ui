export type ProgressStatus =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'
export interface ProgressGradient {
  stops: string[]
}

export type ProgressSize = 'tiny' | 'small' | 'medium' | 'large'

export type ProgressType = 'line' | 'circle' | 'multiple-circle' | 'dashboard'
