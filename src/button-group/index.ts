import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NButtonGroupImpl from './src/ButtonGroup'

export { buttonGroupProps } from './src/ButtonGroup'
export type { ButtonGroupProps } from './src/ButtonGroup'

export const NButtonGroup: WithNativeAttrs<
  typeof NButtonGroupImpl,
  HTMLAttributes
> = NButtonGroupImpl
