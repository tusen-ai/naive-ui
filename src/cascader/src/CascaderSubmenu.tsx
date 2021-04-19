import { h, ref, defineComponent, inject, PropType } from 'vue'
import NCascaderOption from './CascaderOption'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarInst } from '../../scrollbar'
import {
  TmNode,
  CascaderSubmenuInstance,
  cascaderInjectionKey
} from './interface'

export default defineComponent({
  name: 'CascaderSubmenu',
  props: {
    depth: {
      type: Number,
      required: true
    },
    tmNodes: {
      type: Array as PropType<TmNode[]>,
      required: true
    }
  },
  setup () {
    const {
      mergedClsPrefixRef,
      mergedThemeRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const inst: CascaderSubmenuInstance = {
      scroll (index: number, elSize: number) {
        scrollbarInstRef.value?.scrollTo({
          index,
          elSize
        })
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollbarInstRef,
      ...inst
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme } = this
    return (
      <div class={`${mergedClsPrefix}-cascader-submenu`}>
        <NScrollbar
          ref="scrollbarInstRef"
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        >
          {{
            default: () =>
              this.tmNodes.map((tmNode) => (
                <NCascaderOption key={tmNode.key} tmNode={tmNode} />
              ))
          }}
        </NScrollbar>
      </div>
    )
  }
})
