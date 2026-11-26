import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NLegacyTransferImpl from './src/Transfer'

export type { Option as LegacyTransferOption } from './src/interface'
export { transferProps as legacyTransferProps } from './src/Transfer'
export type { transferProps as LegacyTransferProps } from './src/Transfer'

export const NLegacyTransfer: WithNativeAttrs<
  typeof NLegacyTransferImpl,
  HTMLAttributes
> = NLegacyTransferImpl
