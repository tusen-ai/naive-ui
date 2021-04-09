import { Ref, InjectionKey } from 'vue'

export type DrawerBodyInjection = Ref<HTMLElement | null> | null
export const drawerBodyInjectionKey: InjectionKey<DrawerBodyInjection> = Symbol(
  'drawerBodyInjeciton'
)
