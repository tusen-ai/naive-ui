import {
  h,
  ref,
  onMounted,
  computed,
  defineComponent,
  PropType,
  watch,
  toRef,
  renderSlot,
  VNode,
  provide,
  reactive
} from 'vue'
import { RawNode, TreeMate, TreeNode } from 'treemate'
import { VirtualList, VirtualListRef } from 'vueuc'
import { depx, getPadding } from 'seemly'
import { NEmpty } from '../../../empty'
import { NScrollbar } from '../../../scrollbar'
import type { ScrollbarRef } from '../../../scrollbar'
import { formatLength } from '../../../_utils'
import { createKey } from '../../../_utils/cssr'
import { useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import NSelectOption from './SelectOption'
import NSelectGroupHeader from './SelectGroupHeader'
import style from './styles/index.cssr'
import { baseSelectMenuLight, BaseSelectMenuTheme } from '../styles'

export interface BaseSelectMenuInjection {
  handleOptionMouseEnter: (e: MouseEvent, tmNode: TreeNode) => void
  handleOptionClick: (e: MouseEvent, tmNode: TreeNode) => void
  valueSet: Set<number | string>
  pendingTmNode: TreeNode | null
  multiple: boolean
  value: string | number | Array<string | number> | null
}

export interface BaseSelectMenuRef {
  getPendingOption: () => TreeNode | null
}

export default defineComponent({
  name: 'BaseSelectMenu',
  props: {
    ...(useTheme.props as ThemeProps<BaseSelectMenuTheme>),
    scrollable: {
      type: Boolean,
      default: true
    },
    treeMate: {
      type: Object as PropType<TreeMate>,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    pattern: {
      type: String,
      default: undefined
    },
    value: {
      type: [String, Number, Array] as PropType<
      string | number | null | Array<string | number>
      >,
      default: null
    },
    width: {
      type: [Number, String],
      default: undefined
    },
    autoPending: {
      type: Boolean,
      default: false
    },
    virtualScroll: {
      type: Boolean,
      default: true
    },
    onScroll: {
      type: Function as PropType<((e: Event) => void) | undefined>,
      default: undefined
    },
    // deprecated
    onMenuToggleOption: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'BaseSelectMenu',
      'BaseSelectMenu',
      style,
      baseSelectMenuLight,
      props
    )
    const virtualListRef = ref<VirtualListRef | null>(null)
    const scrollbarRef = ref<ScrollbarRef | null>(null)
    const { treeMate } = props
    const pendingNodeRef = ref(
      props.autoPending
        ? props.value === null
          ? treeMate.getFirstAvailableNode()
          : props.multiple
            ? treeMate.getNode(
              ((props.value as Array<string | number> | null) || [])[
                ((props.value as Array<string | number> | null) || []).length -
                  1
              ]
            ) || treeMate.getFirstAvailableNode()
            : treeMate.getNode(props.value as string | number) ||
            treeMate.getFirstAvailableNode()
        : null
    )
    const itemSizeRef = computed(() => {
      return depx(themeRef.value.self[createKey('optionHeight', props.size)])
    })
    const paddingRef = computed(() => {
      return getPadding(themeRef.value.self[createKey('padding', props.size)])
    })
    const valueSetRef = computed(() => {
      if (props.multiple && Array.isArray(props.value)) {
        return new Set(props.value)
      }
      return new Set<string | number>()
    })
    const emptyRef = computed(() => {
      const tmNodes = props.treeMate.flattenedNodes
      return tmNodes && tmNodes.length === 0
    })
    const styleRef = computed(() => {
      return [{ width: formatLength(props.width) }, cssVarsRef.value]
    })
    const tmNodesRef = computed(() => {
      return props.treeMate.treeNodes
    })
    watch(toRef(props, 'treeMate'), () => {
      if (props.autoPending) {
        const tmNode = props.treeMate.getFirstAvailableNode()
        setPendingTmNode(tmNode)
      } else {
        setPendingTmNode(null)
      }
    })
    function doToggleOption (option: RawNode): void {
      const { onMenuToggleOption } = props
      if (onMenuToggleOption) onMenuToggleOption(option)
    }
    function doScroll (e: Event): void {
      const { onScroll } = props
      if (onScroll) onScroll(e)
    }
    // required, scroller sync need to be triggered manually
    function handleVirtualListScroll (e: Event): void {
      scrollbarRef.value?.sync()
      doScroll(e)
    }
    function handleVirtualListResize (): void {
      scrollbarRef.value?.sync()
    }
    function getPendingOption (): RawNode | null {
      const { value: pendingTmNode } = pendingNodeRef
      if (pendingTmNode) return pendingTmNode.rawNode
      return null
    }
    function handleOptionMouseEnter (e: MouseEvent, tmNode: TreeNode): void {
      if (tmNode.disabled) return
      setPendingTmNode(tmNode, false)
    }
    function handleOptionClick (e: MouseEvent, tmNode: TreeNode): void {
      if (tmNode.disabled) return
      doToggleOption(tmNode.rawNode)
    }
    // keyboard related methods
    function handleKeyUp (e: KeyboardEvent): void {
      switch (e.code) {
        case 'ArrowUp':
          prev()
          break
        case 'ArrowDown':
          next()
          break
      }
    }
    function handleMouseDown (e: MouseEvent): void {
      e.preventDefault()
    }
    function next (): void {
      const { value: pendingTmNode } = pendingNodeRef
      if (pendingTmNode) {
        setPendingTmNode(pendingTmNode.getNext({ loop: true }), true)
      }
    }
    function prev (): void {
      const { value: pendingTmNode } = pendingNodeRef
      if (pendingTmNode) {
        setPendingTmNode(pendingTmNode.getPrev({ loop: true }), true)
      }
    }
    function setPendingTmNode (tmNode: TreeNode | null, doScroll = false): void {
      pendingNodeRef.value = tmNode
      if (doScroll && tmNode) {
        if (props.virtualScroll) {
          virtualListRef.value?.scrollTo({ index: tmNode.fIndex })
        } else {
          scrollbarRef.value?.scrollTo({
            index: tmNode.fIndex,
            elSize: itemSizeRef.value
          })
        }
      }
    }
    provide<BaseSelectMenuInjection>(
      'NBaseSelectMenu',
      reactive({
        handleOptionMouseEnter,
        handleOptionClick,
        valueSet: valueSetRef,
        multiple: toRef(props, 'multiple'),
        value: toRef(props, 'value'),
        pendingTmNode: pendingNodeRef
      })
    )
    onMounted(() => {
      const { value } = scrollbarRef
      if (value) value.sync()
    })
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderRadius,
          color,
          boxShadow,
          groupHeaderTextColor,
          actionDividerColor,
          optionTextColorPressed,
          optionTextColor,
          optionTextColorDisabled,
          optionTextColorActive,
          optionOpacityDisabled,
          optionCheckColor,
          actionTextColor,
          optionColorPending,
          [createKey('optionFontSize', size)]: fontSize,
          [createKey('optionHeight', size)]: optionHeight
        }
      } = themeRef.value
      return {
        '--action-divider-color': actionDividerColor,
        '--action-text-color': actionTextColor,
        '--bezier': cubicBezierEaseInOut,
        '--border-radius': borderRadius,
        '--box-shadow': boxShadow,
        '--color': color,
        '--option-font-size': fontSize,
        '--group-header-text-color': groupHeaderTextColor,
        '--option-check-color': optionCheckColor,
        '--option-color-pending': optionColorPending,
        '--option-height': optionHeight,
        '--option-opacity-disabled': optionOpacityDisabled,
        '--option-text-color': optionTextColor,
        '--option-text-color-active': optionTextColorActive,
        '--option-text-color-disabled': optionTextColorDisabled,
        '--option-text-color-pressed': optionTextColorPressed
      }
    })
    return {
      virtualListRef,
      scrollbarRef,
      style: styleRef,
      defaultScrollIndex: pendingNodeRef.value?.fIndex,
      itemSize: itemSizeRef,
      padding: paddingRef,
      tmNodes: tmNodesRef,
      empty: emptyRef,
      next,
      prev,
      virtualListContainer () {
        const { value } = virtualListRef
        return value?.listRef as HTMLElement
      },
      virtualListContent () {
        const { value } = virtualListRef
        return value?.itemsRef as HTMLElement
      },
      doScroll,
      handleKeyUp,
      handleMouseDown,
      handleVirtualListResize,
      handleVirtualListScroll,
      getPendingOption
    }
  },
  render () {
    const { $slots, virtualScroll } = this
    return (
      <div
        class={[
          'n-base-select-menu',
          {
            'n-base-select-menu--multiple': this.multiple
          }
        ]}
        style={this.style as any}
        onKeyup={this.handleKeyUp}
        onMousedown={this.handleMouseDown}
      >
        {!this.empty ? (
          <NScrollbar
            ref="scrollbarRef"
            scrollable={this.scrollable}
            container={virtualScroll ? this.virtualListContainer : undefined}
            content={virtualScroll ? this.virtualListContent : undefined}
            onScroll={this.doScroll}
          >
            {{
              default: () => {
                return virtualScroll ? (
                  <VirtualList
                    ref="virtualListRef"
                    class="n-virtual-list"
                    items={this.tmNodes}
                    itemSize={this.itemSize}
                    showScrollbar={false}
                    defaultScrollIndex={this.defaultScrollIndex}
                    paddingTop={this.padding.top}
                    paddingBottom={this.padding.bottom}
                    onResize={this.handleVirtualListResize}
                    onScroll={this.handleVirtualListScroll}
                  >
                    {{
                      default: ({ item: tmNode }: { item: TreeNode }) => {
                        return tmNode.rawNode.type === 'group' ? (
                          <NSelectGroupHeader
                            key={tmNode.key}
                            tmNode={tmNode}
                          />
                        ) : (
                          <NSelectOption key={tmNode.key} tmNode={tmNode} />
                        )
                      }
                    }}
                  </VirtualList>
                ) : (
                  <div
                    class="n-base-select-menu-option-wrapper"
                    style={{
                      paddingTop: this.padding.top,
                      paddingBottom: this.padding.bottom
                    }}
                  >
                    {this.tmNodes.map((tmNode) =>
                      tmNode.rawNode.type === 'group' ? (
                        <NSelectGroupHeader key={tmNode.key} tmNode={tmNode} />
                      ) : (
                        <NSelectOption key={tmNode.key} tmNode={tmNode} />
                      )
                    )}
                  </div>
                )
              }
            }}
          </NScrollbar>
        ) : (
          <div style="padding: 14px 0; width: 100%">
            {renderSlot($slots, 'empty', undefined, () => [
              (<NEmpty />) as VNode
            ])}
          </div>
        )}
        {$slots.action && (
          <div class="n-base-select-menu__action">
            {renderSlot($slots, 'action')}
          </div>
        )}
      </div>
    )
  }
})
