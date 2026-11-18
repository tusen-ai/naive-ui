import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NMenuImpl from './src/Menu'

export type {
  MenuDividerOption,
  MenuGroupOption,
  MenuInst,
  MenuNodeProps,
  MenuOption
} from './src/interface'
export { menuProps } from './src/Menu'
export type { MenuProps } from './src/Menu'

export const NMenu: WithNativeAttrs<
  typeof NMenuImpl,
  Omit<HTMLAttributes, 'role'>
> = NMenuImpl
