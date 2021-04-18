import {
  h,
  withDirectives,
  vShow,
  defineComponent,
  ExtractPropTypes,
  inject,
  onBeforeUnmount,
  PropType,
  InjectionKey,
  Ref
} from 'vue'
import { getSlot, throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'

const tabPaneProps = {
  label: [String, Number] as PropType<string | number>,
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  }
} as const

export type TabPaneSetupProps = ExtractPropTypes<typeof tabPaneProps>
export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>

export interface TabsInjection {
  mergedClsPrefixRef: Ref<string>
  valueRef: Ref<string | number | null>
  typeRef: Ref<'line' | 'card'>
  addPanel: (props: TabPaneSetupProps) => void
  removePanel: (props: TabPaneSetupProps) => void
}

export const tabsInjectionKey: InjectionKey<TabsInjection> = Symbol('tabs')

export default defineComponent({
  name: 'TabPane',
  alias: ['TabPanel'],
  props: tabPaneProps,
  setup (props) {
    const NTab = inject(tabsInjectionKey, null)
    if (!NTab) {
      throwError('tab-pane', '`n-tab-pane` must be placed inside `n-tabs`.')
    }
    NTab.addPanel(props)
    onBeforeUnmount(() => {
      NTab.removePanel(props)
    })
    return {
      mergedClsPrefix: NTab.mergedClsPrefixRef,
      type: NTab.typeRef,
      value: NTab.valueRef
    }
  },
  render () {
    const useVShow = this.displayDirective === 'show'
    const show = this.value === this.name
    return useVShow || show
      ? withDirectives(
        h(
          'div',
          {
            class: `${this.mergedClsPrefix}-tab-panel`,
            key: this.name
          },
          getSlot(this)
        ),
        [[vShow, !useVShow || show]]
      )
      : null
  }
})
