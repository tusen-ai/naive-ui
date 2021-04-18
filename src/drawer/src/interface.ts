import { Ref, InjectionKey } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { DrawerTheme } from '../styles'

export type DrawerBodyInjection = Ref<HTMLElement | null> | null
export const drawerBodyInjectionKey: InjectionKey<DrawerBodyInjection> = Symbol(
  'drawerBody'
)

export interface DrawerInjection {
  isMountedRef: Ref<boolean>
  mergedThemeRef: Ref<MergedTheme<DrawerTheme>>
  mergedClsPrefixRef: Ref<string>
}
export const drawerInjectionKey: InjectionKey<DrawerInjection> = Symbol(
  'drawer'
)
