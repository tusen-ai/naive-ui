import {
  h,
  defineComponent,
  inject,
  type PropType,
  type VNodeChild,
  type VNode,
  watchEffect,
  type HTMLAttributes
} from 'vue'
import { throwError, warnOnce } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { tabsInjectionKey } from './interface'

export const tabPaneProps = {
  tab: [String, Number, Object, Function] as PropType<
  string | number | VNode | (() => VNodeChild)
  >,
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true
  },
  disabled: Boolean,
  displayDirective: {
    type: String as PropType<'if' | 'show' | 'show:lazy'>,
    default: 'if'
  },
  closable: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  tabProps: Object as PropType<HTMLAttributes>,
  /** @deprecated */
  label: [String, Number, Object, Function] as PropType<
  string | number | VNode | (() => VNodeChild)
  >
} as const

export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>

export default defineComponent({
  __TAB_PANE__: true,
  name: 'TabPane',
  alias: ['TabPanel'],
  props: tabPaneProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.label !== undefined) {
          warnOnce(
            'tab-pane',
            '`label` is deprecated, please use `tab` instead.'
          )
        }
      })
    }
    const NTab = inject(tabsInjectionKey, null)
    if (!NTab) {
      throwError('tab-pane', '`n-tab-pane` must be placed inside `n-tabs`.')
    }
    return {
      style: NTab.paneStyleRef,
      class: NTab.paneClassRef,
      mergedClsPrefix: NTab.mergedClsPrefixRef
    }
  },
  render () {
    return (
      <div
        class={[`${this.mergedClsPrefix}-tab-pane`, this.class]}
        style={this.style}
      >
        {this.$slots}
      </div>
    )
  }
})
