import {
  h,
  withDirectives,
  vShow,
  defineComponent,
  ExtractPropTypes,
  inject,
  onBeforeUnmount,
  computed,
  PropType
} from 'vue'
import { getSlot } from '../../_utils'

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

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export interface TabsInjection {
  value: string | number | null
  type: 'line' | 'card'
  addPanel: (props: TabPaneProps) => void
  removePanel: (props: TabPaneProps) => void
}

export default defineComponent({
  name: 'TabPane',
  alias: ['TabPanel'],
  props: tabPaneProps,
  setup (props) {
    const NTab = inject<TabsInjection>('NTabs') as TabsInjection
    NTab.addPanel(props)
    onBeforeUnmount(() => {
      NTab.removePanel(props)
    })
    return {
      type: computed(() => NTab.type),
      show: computed(() => props.name === NTab.value)
    }
  },
  render () {
    const useVShow = this.displayDirective === 'show'
    return useVShow || this.show
      ? withDirectives(
        h(
          'div',
          {
            class: 'n-tab-panel',
            key: this.name
          },
          getSlot(this)
        ),
        [[vShow, !useVShow || this.show]]
      )
      : null
  }
})
