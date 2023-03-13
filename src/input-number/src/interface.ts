export type OnUpdateValue = (value: number | null) => void
export type Size = 'tiny' | 'small' | 'medium' | 'large'

export interface InputNumberInst {
  focus: () => void
  blur: () => void
  select: () => void
}
