import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NRateImpl from './src/Rate'

export type * from './src/public-types'
export { rateProps } from './src/Rate'
export type { RateProps } from './src/Rate'

export const NRate: WithNativeAttrs<typeof NRateImpl, HTMLAttributes>
  = NRateImpl
