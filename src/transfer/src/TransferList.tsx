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
import { NScrollbar, ScrollbarInst } from '../../scrollbar'
import { Option, transferInjectionKey } from './interface'
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedThemeRef, cPrefixRef } = inject(transferInjectionKey)!
    const scrollerInstRef = ref<ScrollbarInst | null>(null)
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
      mergedTheme: mergedThemeRef,
      cPrefix: cPrefixRef,
      scrollerInstRef,
      vlInstRef,
      syncVLScroller,
      scrollContainer,
      scrollContent
    }
  },
  render () {
    const { mergedTheme, cPrefix, syncVLScroller } = this
    return this.options.length ? (
      this.virtualScroll ? (
        <NScrollbar
          ref="scrollerInstRef"
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
          container={this.scrollContainer}
          content={this.scrollContent}
        >
          {{
            default: () => (
              <VirtualList
                ref="srcVlInstRef"
                style={{ height: '100%' }}
                class={`${cPrefix}-transfer-list-content`}
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
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        >
          {{
            default: () => (
              <div class={`${cPrefix}-transfer-list-content`}>
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
              theme={mergedTheme.peers.Empty}
              themeOverrides={mergedTheme.peerOverrides.Empty}
            />
          )
        }}
      </Transition>
    )
  }
})
