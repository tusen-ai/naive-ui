import { h, ref, defineComponent, inject, type PropType, computed } from 'vue'
import { VirtualList, type VirtualListInst } from 'vueuc'
import NCascaderOption from './CascaderOption'
import { NScrollbar } from '../../_internal'
import type { ScrollbarInst } from '../../_internal'
import {
  type TmNode,
  type CascaderSubmenuInstance,
  cascaderInjectionKey
} from './interface'
import { depx } from 'seemly'

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
      virtualScrollRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      optionHeightRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(cascaderInjectionKey)!
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const vlInstRef = ref<VirtualListInst | null>(null)
    const inst: CascaderSubmenuInstance = {
      scroll (index: number, elSize: number) {
        if (virtualScrollRef.value) {
          vlInstRef.value?.scrollTo({
            index
          })
        } else {
          scrollbarInstRef.value?.scrollTo({
            index,
            elSize
          })
        }
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollbarInstRef,
      vlInstRef,
      virtualScroll: virtualScrollRef,
      itemSize: computed(() => depx(optionHeightRef.value)),
      handleVlScroll: () => {
        scrollbarInstRef.value?.sync()
      },
      getVlContainer: () => {
        return vlInstRef.value?.listElRef
      },
      getVlContent: () => {
        return vlInstRef.value?.itemsElRef
      },
      ...inst
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme, virtualScroll } = this
    return (
      <div
        class={[
          virtualScroll && `${mergedClsPrefix}-cascader-submenu--virtual`,
          `${mergedClsPrefix}-cascader-submenu`
        ]}
      >
        <NScrollbar
          ref="scrollbarInstRef"
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
          container={virtualScroll ? this.getVlContainer : undefined}
          content={virtualScroll ? this.getVlContent : undefined}
        >
          {{
            default: () =>
              virtualScroll ? (
                <VirtualList
                  items={this.tmNodes}
                  itemSize={this.itemSize}
                  onScroll={this.handleVlScroll}
                  showScrollbar={false}
                  ref="vlInstRef"
                >
                  {{
                    default: ({ item: tmNode }: { item: TmNode }) => (
                      <NCascaderOption key={tmNode.key} tmNode={tmNode} />
                    )
                  }}
                </VirtualList>
              ) : (
                this.tmNodes.map((tmNode) => (
                  <NCascaderOption key={tmNode.key} tmNode={tmNode} />
                ))
              )
          }}
        </NScrollbar>
      </div>
    )
  }
})
