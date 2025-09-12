import type { DropdownInjection } from './Dropdown'
import type { NDropdownMenuInjection } from './DropdownMenu'
import type { NDropdownOptionInjection } from './DropdownOption'
import { createInjectionKey } from '../../_utils'

export const dropdownMenuInjectionKey
  = createInjectionKey<NDropdownMenuInjection>('n-dropdown-menu')

export const dropdownInjectionKey
  = createInjectionKey<DropdownInjection>('n-dropdown')

export const dropdownOptionInjectionKey
  = createInjectionKey<NDropdownOptionInjection>('n-dropdown-option')
