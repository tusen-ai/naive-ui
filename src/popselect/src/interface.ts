import type { MergedTheme } from '../../_mixins'
import type { PopselectTheme } from '../styles'

export type PopselectSize = 'small' | 'medium' | 'large' | 'huge'

export interface PopselectInjection {
  mergedTheme: MergedTheme<PopselectTheme>
  setShow: (value: boolean) => void
  syncPosition: () => void
}
