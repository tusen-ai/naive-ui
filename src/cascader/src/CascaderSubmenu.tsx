import { h, ref, defineComponent, inject, PropType } from 'vue'
import NCascaderOption from './CascaderOption'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarRef } from '../../scrollbar'
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NCascader = inject(cascaderInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarRef | null>(null)
    const inst: CascaderSubmenuInstance = {
      scroll (index: number, elSize: number) {
        scrollbarInstRef.value?.scrollTo({
          index,
          elSize
        })
      }
    }
    return {
      NCascader,
      scrollbarInstRef,
      ...inst
    }
  },
  render () {
    const { NCascader } = this
    return (
      <div class={`${NCascader.mergedClsPrefix}-cascader-submenu`}>
        <NScrollbar
          ref="scrollbarInstRef"
          theme={NCascader.mergedTheme.peers.Scrollbar}
          themeOverrides={NCascader.mergedTheme.peerOverrides.Scrollbar}
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
