import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAffixImpl from './src/Affix'

export { affixProps } from './src/Affix'
export type { AffixProps } from './src/Affix'

export const NAffix: WithNativeAttrs<typeof NAffixImpl, HTMLAttributes>
  = NAffixImpl
