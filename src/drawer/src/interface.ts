import { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { DrawerTheme } from '../styles'

export type DrawerBodyInjection = Ref<HTMLElement | null> | null
export const drawerBodyInjectionKey =
  createInjectionKey<DrawerBodyInjection>('drawerBody')

export interface DrawerInjection {
  isMountedRef: Ref<boolean>
  mergedThemeRef: Ref<MergedTheme<DrawerTheme>>
  mergedClsPrefixRef: Ref<string>
  doUpdateShow: (show: boolean) => void
}
export const drawerInjectionKey = createInjectionKey<DrawerInjection>('drawer')
