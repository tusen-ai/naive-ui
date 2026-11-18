import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NWatermarkImpl from './src/Watermark'

export { watermarkProps } from './src/Watermark'
export type { WatermarkProps } from './src/Watermark'

export const NWatermark: WithNativeAttrs<
  typeof NWatermarkImpl,
  HTMLAttributes
> = NWatermarkImpl
