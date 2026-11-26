import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTransferImpl from './src/Transfer'

export type {
  Option as TransferOption,
  TransferRenderSourceLabel,
  TransferRenderSourceList,
  TransferRenderTargetLabel
} from './src/interface'
export type * from './src/public-types'
export { transferProps } from './src/Transfer'
export type { TransferProps } from './src/Transfer'

export const NTransfer: WithNativeAttrs<typeof NTransferImpl, HTMLAttributes>
  = NTransferImpl
