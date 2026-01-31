import type { Ref } from 'vue'
import type { DrawerApiInjection, DrawerReactive } from './DrawerProvider'
import { inject } from 'vue'
import { throwError } from '../../_utils'
import {
  drawerApiInjectionKey,
  drawerReactiveListInjectionKey
} from './context'

export function useDrawer(): DrawerApiInjection {
  const drawer = inject(drawerApiInjectionKey, null)
  if (drawer === null) {
    throwError('use-drawer', 'No outer <n-drawer-provider /> founded.')
  }
  return drawer
}

export function useDrawerReactiveList(): Ref<readonly DrawerReactive[]> {
  const drawerReactiveList = inject(drawerReactiveListInjectionKey, null)
  if (drawerReactiveList === null) {
    throwError(
      'use-drawer-reactive-list',
      'No outer <n-drawer-provider /> founded.'
    )
  }
  return drawerReactiveList as Ref<readonly DrawerReactive[]>
}
