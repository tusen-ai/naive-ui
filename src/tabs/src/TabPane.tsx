import {
  h,
  defineComponent,
  inject,
  PropType,
  VNodeChild,
  VNode,
  ref,
  watch,
  computed,
  withDirectives,
  vShow
} from 'vue'
import { throwError, warn } from '../../_utils'
import { tabsInjectionKey } from './interface'
import type { ExtractPublicPropTypes } from '../../_utils'

export const tabPaneProps = {
  /** @deprecated */
  label: {
    type: [String, Number, Object, Function] as PropType<
    string | number | VNode | (() => VNodeChild)
    >,
    default: undefined,
    validator: () => {
      if (__DEV__) {
        warn('tab-pane', '`label` is deprecated, please use `tab` instead.')
      }
      return true
    }
  },
  tab: [String, Number, Object, Function] as PropType<
  string | number | VNode | (() => VNodeChild)
  >,
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true
  },
  disabled: Boolean,
  displayDirective: {
    type: String as PropType<'if' | 'show' | 'lazyload'>,
    default: 'if'
  },
  active: Boolean,
  closable: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>

export default defineComponent({
  __TAB_PANE__: true,
  name: 'TabPane',
  alias: ['TabPanel'],
  props: tabPaneProps,
  setup (props, { slots }) {
    const NTab = inject(tabsInjectionKey, null)
    if (!NTab) {
      throwError('tab-pane', '`n-tab-pane` must be placed inside `n-tabs`.')
    }

    const isRenderedRef = ref(false)
    const shouldRenderRef = computed(
      () =>
        props.active || (isRenderedRef.value && props.displayDirective !== 'if')
    )
    watch(
      () => props.active,
      (value) => value && (isRenderedRef.value = value),
      {
        immediate: true
      }
    )

    const genTabPane = (): VNode => (
      <div
        class={`${NTab.mergedClsPrefixRef.value}-tab-pane`}
        style={NTab.paneStyleRef.value}
      >
        {slots}
      </div>
    )

    return {
      shouldRender: shouldRenderRef,
      genTabPane
    }
  },
  render () {
    return this.shouldRender
      ? withDirectives(this.genTabPane(), [[vShow, this.active]])
      : null
  }
})
