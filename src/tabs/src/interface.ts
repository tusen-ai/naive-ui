import { type Ref, type CSSProperties } from 'vue'
import { createInjectionKey } from '../../_utils'

export type TabsType = 'line' | 'card' | 'bar' | 'segment'

export type OnUpdateValue = (value: string & number) => void
export type OnUpdateValueImpl = (value: string | number) => void

export type OnClose = (name: string & number) => void
export type OnCloseImpl = (name: string | number) => void

export type OnBeforeLeave = (
  name: string & number,
  oldName: string & number & null
) => boolean | Promise<boolean>
export type OnBeforeLeaveImpl = (
  name: string | number,
  oldName: string | number | null
) => boolean | Promise<boolean>

export interface TabsInjection {
  mergedClsPrefixRef: Ref<string>
  valueRef: Ref<string | number | null>
  typeRef: Ref<TabsType>
  closableRef: Ref<boolean>
  tabStyleRef: Ref<string | CSSProperties | undefined>
  paneClassRef: Ref<string | undefined>
  paneStyleRef: Ref<string | CSSProperties | undefined>
  tabChangeIdRef: { id: number }
  onBeforeLeaveRef: Ref<OnBeforeLeave | undefined>
  triggerRef: Ref<'click' | 'hover'>
  activateTab: (panelName: string | number) => void
  handleClose: (panelName: string | number) => void
  handleAdd: () => void
}

export type Addable =
  | boolean
  | {
    disabled?: boolean
  }

export const tabsInjectionKey = createInjectionKey<TabsInjection>('n-tabs')

export interface TabsInst {
  syncBarPosition: () => void
}
