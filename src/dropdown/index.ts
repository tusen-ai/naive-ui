import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDropdownImpl from './src/Dropdown'

export { dropdownProps } from './src/Dropdown'
export type { DropdownProps } from './src/Dropdown'
export type {
  DropdownDividerOption,
  DropdownGroupOption,
  DropdownMenuProps,
  NodeProps as DropdownNodeProps,
  DropdownOption,
  DropdownRenderOption
} from './src/interface'
export type * from './src/public-types'

export const NDropdown: WithNativeAttrs<typeof NDropdownImpl, HTMLAttributes>
  = NDropdownImpl
