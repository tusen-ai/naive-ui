import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NLogImpl from './src/Log'

export { logProps } from './src/Log'
export type { LogInst, LogProps } from './src/Log'
export type * from './src/public-types'

export const NLog: WithNativeAttrs<typeof NLogImpl, HTMLAttributes> = NLogImpl
