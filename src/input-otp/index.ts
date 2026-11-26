import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NInputOtpImpl from './src/InputOtp'

export { inputOtpProps } from './src/InputOtp'
export type { InputOtpProps } from './src/InputOtp'
export type * from './src/public-types'

export const NInputOtp: WithNativeAttrs<typeof NInputOtpImpl, HTMLAttributes>
  = NInputOtpImpl
