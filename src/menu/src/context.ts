import { createInjectionKey } from '../../_utils'
import type {
  MenuInjection,
  MenuOptionGroupInjection,
  SubmenuInjection
} from './use-menu-child'

export const menuInjectionKey = createInjectionKey<MenuInjection>('n-menu')

export const submenuInjectionKey =
  createInjectionKey<SubmenuInjection>('n-submenu')

export const menuItemGroupInjectionKey =
  createInjectionKey<MenuOptionGroupInjection>('n-menu-item-group')
