import { h, defineComponent, type PropType, type CSSProperties, ref } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { type ScrollbarProps } from '../../scrollbar/src/Scrollbar'
import { NxScrollbar, type ScrollbarInst } from '../../_internal'
import {
  VVirtualList,
  type VirtualListInst,
  type VirtualListItemData,
  type VirtualListScrollOptions
} from 'vueuc'
export { type VirtualListInst } from 'vueuc'

export const virtualListProps = {
  scrollbarProps: Object as PropType<ScrollbarProps>,
  items: {
    type: Array as PropType<VirtualListItemData[]>,
    default: () => []
  },
  itemSize: {
    type: Number,
    required: true
  },
  itemResizable: Boolean,
  itemsStyle: [String, Object] as PropType<string | CSSProperties>,
  visibleItemsTag: {
    type: [String, Object] as PropType<string | object>,
    default: 'div'
  },
  visibleItemsProps: Object,
  ignoreItemResize: Boolean,
  onScroll: Function as PropType<(event: Event) => void>,
  onWheel: Function as PropType<(event: WheelEvent) => void>,
  onResize: Function as PropType<(entry: ResizeObserverEntry) => void>,
  defaultScrollKey: [Number, String] as PropType<number | string>,
  defaultScrollIndex: Number,
  keyField: {
    type: String,
    default: 'key'
  },
  paddingTop: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  paddingBottom: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  }
} as const

export type VirtualListProps = ExtractPublicPropTypes<typeof virtualListProps>

export default defineComponent({
  name: 'VirtualList',
  props: virtualListProps,
  setup (props) {
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListInstRef = ref<VirtualListInst | null>(null)

    function syncScrollbar (): void {
      const { value: scrollbarInst } = scrollbarInstRef
      if (scrollbarInst) scrollbarInst.sync()
    }

    function handleScroll (e: Event): void {
      syncScrollbar()
      props.onScroll?.(e)
    }

    function handleResize (e: ResizeObserverEntry): void {
      syncScrollbar()
      props.onResize?.(e)
    }

    function handleWheel (e: WheelEvent): void {
      props.onWheel?.(e)
    }

    function scrollTo (
      options: VirtualListScrollOptions | number,
      y?: number
    ): void {
      if (typeof options === 'number') {
        virtualListInstRef.value?.scrollTo(options, y ?? 0)
      } else {
        virtualListInstRef.value?.scrollTo(options)
      }
    }

    function getScrollContainer (): HTMLElement | null | undefined {
      return virtualListInstRef.value?.listElRef
    }

    function getScrollContent (): HTMLElement | null | undefined {
      return virtualListInstRef.value?.itemsElRef
    }

    return {
      scrollTo,
      scrollbarInstRef,
      virtualListInstRef,
      getScrollContainer,
      getScrollContent,
      handleScroll,
      handleResize,
      handleWheel
    }
  },
  render () {
    return (
      <NxScrollbar
        {...this.scrollbarProps}
        ref="scrollbarInstRef"
        container={this.getScrollContainer}
        content={this.getScrollContent}
      >
        {{
          default: () => {
            return (
              <VVirtualList
                ref="virtualListInstRef"
                showScrollbar={false}
                items={this.items}
                itemSize={this.itemSize}
                itemResizable={this.itemResizable}
                itemsStyle={this.itemsStyle}
                visibleItemsTag={this.visibleItemsTag}
                visibleItemsProps={this.visibleItemsProps}
                ignoreItemResize={this.ignoreItemResize}
                keyField={this.keyField}
                defaultScrollKey={this.defaultScrollKey}
                defaultScrollIndex={this.defaultScrollIndex}
                paddingTop={this.paddingTop}
                paddingBottom={this.paddingBottom}
                onScroll={this.handleScroll}
                onResize={this.handleResize}
                onWheel={this.handleWheel}
              >
                {{
                  default: ({
                    item,
                    index
                  }: {
                    item: VirtualListItemData
                    index: number
                  }) => this.$slots.default?.({ item, index })
                }}
              </VVirtualList>
            )
          }
        }}
      </NxScrollbar>
    )
  }
})
