import type {
  MenuInjection,
  MenuOptionGroupInjection,
  SubmenuInjection
} from './use-menu-child'
import { createInjectionKey } from '../../_utils'

export const menuInjectionKey = createInjectionKey<MenuInjection>('n-menu')

export const submenuInjectionKey = createInjectionKey<SubmenuInjection | null>(
  'n-submenu'
)

export const menuItemGroupInjectionKey
  = createInjectionKey<MenuOptionGroupInjection | null>('n-menu-item-group')
