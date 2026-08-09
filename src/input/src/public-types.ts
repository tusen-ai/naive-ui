import type { UnwrapRef } from 'vue'
import type { InputWrappedRef } from './interface'

export type InputSize = 'tiny' | 'small' | 'medium' | 'large'

export type InputInst = UnwrapRef<InputWrappedRef>
