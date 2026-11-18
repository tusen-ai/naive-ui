import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSwitchImpl from './src/Switch'

export type * from './src/public-types'
export { switchProps } from './src/Switch'
export type { SwitchProps, SwitchSlots } from './src/Switch'

export const NSwitch: WithNativeAttrs<typeof NSwitchImpl, HTMLAttributes>
  = NSwitchImpl
