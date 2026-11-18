import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NQrCodeImpl from './src/QrCode'

export { qrCodeProps } from './src/QrCode'
export type { QrCodeProps } from './src/QrCode'

export const NQrCode: WithNativeAttrs<typeof NQrCodeImpl, HTMLAttributes>
  = NQrCodeImpl
