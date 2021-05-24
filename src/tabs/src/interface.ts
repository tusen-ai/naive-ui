import { Ref, InjectionKey, CSSProperties } from 'vue'

export type OnUpdateValue = (value: string & number) => void
export type OnUpdateValueImpl = (value: string | number) => void

export interface TabsInjection {
  mergedClsPrefixRef: Ref<string>
  valueRef: Ref<string | number | null>
  typeRef: Ref<'line' | 'card'>
  closableRef: Ref<boolean>
  tabStyleRef: Ref<string | CSSProperties | undefined>
  handleTabClick: (panelName: string | number, disabled: boolean) => void
  handleClose: (e: MouseEvent, panelName: string | number) => void
  handleAdd: () => void
}

export type Addable =
  | boolean
  | {
    disabled?: boolean
  }

export const tabsInjectionKey: InjectionKey<TabsInjection> = Symbol('tabs')
