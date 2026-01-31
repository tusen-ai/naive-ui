import type {
  DrawerApiInjection,
  DrawerProviderInjection,
  DrawerReactiveListInjection
} from './DrawerProvider.ts'
import { createInjectionKey } from '../../_utils'

export const drawerProviderInjectionKey
  = createInjectionKey<DrawerProviderInjection>('n-drawer-provider')

export const drawerApiInjectionKey
  = createInjectionKey<DrawerApiInjection>('n-drawer-api')

export const drawerReactiveListInjectionKey
  = createInjectionKey<DrawerReactiveListInjection>('n-drawer-reactive-list')
