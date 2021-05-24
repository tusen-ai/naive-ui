import {
  h,
  withDirectives,
  vShow,
  defineComponent,
  inject,
  PropType
} from 'vue'
import { throwError } from '../../_utils'
import { tabsInjectionKey } from './interface'
import type { ExtractPublicPropTypes } from '../../_utils'

export const tabPaneProps = {
  label: [String, Number] as PropType<string | number>,
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true
  },
  disabled: Boolean,
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  closable: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>

export default defineComponent({
  name: 'TabPane',
  alias: ['TabPanel'],
  props: tabPaneProps,
  setup () {
    const NTab = inject(tabsInjectionKey, null)
    if (!NTab) {
      throwError('tab-pane', '`n-tab-pane` must be placed inside `n-tabs`.')
    }
    return {
      mergedClsPrefix: NTab.mergedClsPrefixRef,
      type: NTab.typeRef,
      value: NTab.valueRef
    }
  },
  render () {
    const { name } = this
    const useVShow = this.displayDirective === 'show'
    const show = this.value === name
    return useVShow || show
      ? withDirectives(
        <div class={`${this.mergedClsPrefix}-tab-panel`} key={name}>
          {this.$slots}
        </div>,
        [[vShow, !useVShow || show]]
      )
      : null
  }
})
