import type { Ref } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { DrawerTheme } from '../styles'
import { createInjectionKey } from '../../_utils/vue/create-injection-key'

export type DrawerBodyInjection = Ref<HTMLElement | null> | null
export const drawerBodyInjectionKey
  = createInjectionKey<DrawerBodyInjection>('n-drawer-body')

export interface DrawerInjection {
  isMountedRef: Ref<boolean>
  mergedThemeRef: Ref<MergedTheme<DrawerTheme>>
  mergedClsPrefixRef: Ref<string>
  doUpdateShow: (show: boolean) => void
  doUpdateWidth: (value: number) => void
  doUpdateHeight: (value: number) => void
}
export const drawerInjectionKey
  = createInjectionKey<DrawerInjection>('n-drawer')
