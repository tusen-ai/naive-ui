export type ProgressStatus =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'
export interface ProgressGradient {
  stops: string[]
}
