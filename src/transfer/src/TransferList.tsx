import {
  h,
  defineComponent,
  ref,
  inject,
  PropType,
  TransitionGroup,
  Transition
} from 'vue'
import { VirtualList, VirtualListRef } from 'vueuc'
import { NEmpty } from '../../empty'
import { NScrollbar, ScrollbarRef } from '../../scrollbar'
import type { Option, TransferInjection } from './interface'
import NTransferListItem from './TransferListItem'

export default defineComponent({
  name: 'TransferList',
  props: {
    virtualScroll: {
      type: Boolean,
      required: true
    },
    itemSize: {
      type: Number,
      required: true
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    isMounted: {
      type: Boolean,
      required: true
    },
    isInputing: {
      type: Boolean,
      required: true
    },
    source: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const NTransfer = inject<TransferInjection>(
      'NTransfer'
    ) as TransferInjection
    const scrollerInstRef = ref<ScrollbarRef | null>(null)
    const vlInstRef = ref<VirtualListRef | null>(null)
    function syncVLScroller (): void {
      scrollerInstRef.value?.sync()
    }
    function scrollContainer (): HTMLElement | null {
      const { value } = vlInstRef
      if (!value) return null
      const { listRef } = value
      return listRef
    }
    function scrollContent (): HTMLElement | null {
      const { value } = vlInstRef
      if (!value) return null
      const { itemsRef } = value
      return itemsRef
    }
    return {
      NTransfer,
      scrollerInstRef,
      vlInstRef,
      syncVLScroller,
      scrollContainer,
      scrollContent
    }
  },
  render () {
    const { NTransfer, syncVLScroller } = this
    return this.options.length ? (
      this.virtualScroll ? (
        <NScrollbar
          ref="scrollerInstRef"
          unstableTheme={NTransfer.mergedTheme.peers.Scrollbar}
          themeOverrides={NTransfer.mergedTheme.peerOverrides.Scrollbar}
          container={this.scrollContainer}
          content={this.scrollContent}
        >
          {{
            default: () => (
              <VirtualList
                ref="srcVlInstRef"
                class="n-virtual-scroller n-transfer-list-content"
                items={this.options}
                itemSize={this.itemSize}
                showScrollbar={false}
                onResize={syncVLScroller}
                onScroll={syncVLScroller}
              >
                {{
                  default: ({ item }: { item: Option }) => {
                    const { source, disabled } = this
                    return (
                      <NTransferListItem
                        source={source}
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled || disabled}
                        label={item.label}
                      />
                    )
                  }
                }}
              </VirtualList>
            )
          }}
        </NScrollbar>
      ) : (
        <NScrollbar
          unstableTheme={NTransfer.mergedTheme.peers.Scrollbar}
          themeOverrides={NTransfer.mergedTheme.peerOverrides.Scrollbar}
        >
          {{
            default: () => (
              <div class="n-transfer-list-content">
                <TransitionGroup
                  name="item"
                  appear={this.isMounted}
                  css={!this.isInputing}
                >
                  {{
                    default: () => {
                      const { source, disabled } = this
                      return this.options.map((option) => (
                        <NTransferListItem
                          source={source}
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled || disabled}
                          label={option.label}
                        />
                      ))
                    }
                  }}
                </TransitionGroup>
              </div>
            )
          }}
        </NScrollbar>
      )
    ) : (
      <Transition
        name="n-fade-in-transition"
        appear={this.isMounted}
        css={!this.isInputing}
      >
        {{
          default: () => (
            <NEmpty
              unstableTheme={NTransfer.mergedTheme.peers.Empty}
              themeOverrides={NTransfer.mergedTheme.peerOverrides.Empty}
            />
          )
        }}
      </Transition>
    )
  }
})
