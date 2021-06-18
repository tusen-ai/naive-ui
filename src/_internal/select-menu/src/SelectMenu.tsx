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
  provide,
  Ref,
  UnwrapRef,
  InjectionKey
} from 'vue'
import { TreeNode, createIndexGetter } from 'treemate'
import { VirtualList, VirtualListInst } from 'vueuc'
import { depx, getPadding, happensIn } from 'seemly'
import { NEmpty } from '../../../empty'
import { NScrollbar } from '../../../scrollbar'
import type { ScrollbarInst } from '../../../scrollbar'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption,
  Value,
  SelectTreeMate
} from '../../../select/src/interface'
import { formatLength } from '../../../_utils'
import { createKey } from '../../../_utils/cssr'
import { useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import NInternalLoading from '../../loading'
import NFocusDetector from '../../focus-detector'
import NSelectOption from './SelectOption'
import NSelectGroupHeader from './SelectGroupHeader'
import style from './styles/index.cssr'
import { internalSelectMenuLight, InternalSelectMenuTheme } from '../styles'
import { Size } from './interface'

export interface InternalSelectMenuInjection {
  handleOptionMouseEnter: (
    e: MouseEvent,
    tmNode: TreeNode<SelectBaseOption>
  ) => void
  handleOptionClick: (e: MouseEvent, tmNode: TreeNode<SelectBaseOption>) => void
  valueSetRef: Ref<Set<number | string>>
  pendingTmNodeRef: Ref<TreeNode<SelectBaseOption> | null>
  multipleRef: Ref<boolean>
  valueRef: Ref<string | number | Array<string | number> | null>
}

export const internalSelectionMenuInjectionKey: InjectionKey<InternalSelectMenuInjection> =
  Symbol('internal-select-menu')

interface InternalExposedProps {
  selfRef: Ref<HTMLElement | null>
  getPendingOption: () => SelectBaseOption | null
  prev: () => void
  next: () => void
}

export type InternalSelectMenuRef = UnwrapRef<InternalExposedProps>

export default defineComponent({
  name: 'InternalSelectMenu',
  props: {
    ...(useTheme.props as ThemeProps<InternalSelectMenuTheme>),
    clsPrefix: {
      type: String,
      required: true
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    treeMate: {
      type: Object as PropType<SelectTreeMate>,
      required: true
    },
    multiple: Boolean,
    size: {
      type: String as PropType<Size>,
      default: 'medium'
    },
    value: {
      type: [String, Number, Array] as PropType<Value | null>,
      default: null
    },
    width: [Number, String],
    autoPending: Boolean,
    virtualScroll: {
      type: Boolean,
      default: true
    },
    // show is used to toggle pending state initialization
    show: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    focusable: Boolean,
    onMousedown: Function as PropType<(e: MouseEvent) => void>,
    onScroll: Function as PropType<(e: Event) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onTabOut: Function as PropType<() => void>,
    onMouseenter: Function as PropType<(e: MouseEvent) => void>,
    onMouseleave: Function as PropType<(e: MouseEvent) => void>,
    // deprecated
    onMenuToggleOption: Function as PropType<(value: SelectBaseOption) => void>
  },
  setup (props) {
    const themeRef = useTheme(
      'InternalSelectMenu',
      'InternalSelectMenu',
      style,
      internalSelectMenuLight,
      props,
      toRef(props, 'clsPrefix')
    )
    const selfRef = ref<HTMLElement | null>(null)
    const virtualListRef = ref<VirtualListInst | null>(null)
    const scrollbarRef = ref<ScrollbarInst | null>(null)
    const flattenedNodesRef = computed(() => props.treeMate.getFlattenedNodes())
    const fIndexGetterRef = computed(() =>
      createIndexGetter(flattenedNodesRef.value)
    )
    const pendingNodeRef = ref<TreeNode<SelectBaseOption> | null>(null)
    function initPendingNode (): void {
      const { treeMate } = props
      setPendingTmNode(
        props.autoPending
          ? props.value === null
            ? treeMate.getFirstAvailableNode()
            : props.multiple
              ? treeMate.getNode(
                ((props.value as Array<string | number> | null) || [])[
                  ((props.value as Array<string | number> | null) || [])
                    .length - 1
                ]
              ) || treeMate.getFirstAvailableNode()
              : treeMate.getNode(props.value as string | number) ||
              treeMate.getFirstAvailableNode()
          : null
      )
    }
    watch(toRef(props, 'show'), (value) => {
      if (value) initPendingNode()
    })
    initPendingNode()
    const defaultScrollIndex = pendingNodeRef.value
      ? fIndexGetterRef.value(pendingNodeRef.value.key) ?? undefined
      : undefined
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
      const tmNodes = flattenedNodesRef.value
      return tmNodes && tmNodes.length === 0
    })
    const styleRef = computed(() => {
      return [{ width: formatLength(props.width) }, cssVarsRef.value]
    })
    watch(toRef(props, 'treeMate'), () => {
      if (props.autoPending) {
        const tmNode = props.treeMate.getFirstAvailableNode()
        setPendingTmNode(tmNode)
      } else {
        setPendingTmNode(null)
      }
    })
    function doToggleOption (option: SelectBaseOption): void {
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
    function getPendingOption (): SelectBaseOption | null {
      const { value: pendingTmNode } = pendingNodeRef
      if (pendingTmNode) return pendingTmNode.rawNode
      return null
    }
    function handleOptionMouseEnter (
      e: MouseEvent,
      tmNode: TreeNode<SelectBaseOption>
    ): void {
      if (tmNode.disabled) return
      setPendingTmNode(tmNode, false)
    }
    function handleOptionClick (
      e: MouseEvent,
      tmNode: TreeNode<SelectBaseOption>
    ): void {
      if (tmNode.disabled) return
      doToggleOption(tmNode.rawNode)
    }
    // keyboard related methods
    function handleKeyUp (e: KeyboardEvent): void {
      if (happensIn(e, 'action')) return
      props.onKeyup?.(e)
    }
    function handleKeyDown (e: KeyboardEvent): void {
      if (happensIn(e, 'action')) return
      props.onKeydown?.(e)
    }
    function handleMouseDown (e: MouseEvent): void {
      props.onMousedown?.(e)
      if (props.focusable) return
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
    function setPendingTmNode (
      tmNode: TreeNode<SelectBaseOption> | null,
      doScroll = false
    ): void {
      pendingNodeRef.value = tmNode
      if (doScroll && tmNode) {
        const fIndex = fIndexGetterRef.value(tmNode.key)
        if (fIndex === null) return
        if (props.virtualScroll) {
          virtualListRef.value?.scrollTo({ index: fIndex })
        } else {
          scrollbarRef.value?.scrollTo({
            index: fIndex,
            elSize: itemSizeRef.value
          })
        }
      }
    }
    function handleFocusin (e: FocusEvent): void {
      if (selfRef.value?.contains(e.target as any)) {
        props.onFocus?.(e)
      }
    }
    function handleFocusout (e: FocusEvent): void {
      if (!selfRef.value?.contains(e.relatedTarget as any)) {
        props.onBlur?.(e)
      }
    }
    provide(internalSelectionMenuInjectionKey, {
      handleOptionMouseEnter,
      handleOptionClick,
      valueSetRef,
      multipleRef: toRef(props, 'multiple'),
      valueRef: toRef(props, 'value'),
      pendingTmNodeRef: pendingNodeRef
    })
    onMounted(() => {
      const { value } = scrollbarRef
      if (value) value.sync()
    })
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          height,
          borderRadius,
          color,
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
          loadingColor,
          loadingSize,
          [createKey('optionFontSize', size)]: fontSize,
          [createKey('optionHeight', size)]: optionHeight,
          [createKey('optionPadding', size)]: optionPadding
        }
      } = themeRef.value
      return {
        '--height': height,
        '--action-divider-color': actionDividerColor,
        '--action-text-color': actionTextColor,
        '--bezier': cubicBezierEaseInOut,
        '--border-radius': borderRadius,
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
        '--option-text-color-pressed': optionTextColorPressed,
        '--option-padding': optionPadding,
        '--option-padding-left': getPadding(optionPadding, 'left'),
        '--loading-color': loadingColor,
        '--loading-size': loadingSize
      }
    })
    const exposedProps: InternalExposedProps = {
      selfRef,
      next,
      prev,
      getPendingOption
    }
    return {
      virtualListRef,
      scrollbarRef,
      style: styleRef,
      defaultScrollIndex,
      itemSize: itemSizeRef,
      padding: paddingRef,
      flattenedNodes: flattenedNodesRef,
      empty: emptyRef,
      virtualListContainer () {
        const { value } = virtualListRef
        return value?.listElRef as HTMLElement
      },
      virtualListContent () {
        const { value } = virtualListRef
        return value?.itemsElRef as HTMLElement
      },
      doScroll,
      handleFocusin,
      handleFocusout,
      handleKeyUp,
      handleKeyDown,
      handleMouseDown,
      handleVirtualListResize,
      handleVirtualListScroll,
      ...exposedProps
    }
  },
  render () {
    const { $slots, virtualScroll, clsPrefix } = this
    return (
      <div
        ref="selfRef"
        tabindex={this.focusable ? 0 : -1}
        class={[
          `${clsPrefix}-base-select-menu`,
          this.multiple && `${clsPrefix}-base-select-menu--multiple`
        ]}
        style={this.style as any}
        onFocusin={this.handleFocusin}
        onFocusout={this.handleFocusout}
        onKeyup={this.handleKeyUp}
        onKeydown={this.handleKeyDown}
        onMousedown={this.handleMouseDown}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
      >
        {this.loading ? (
          <div class={`${clsPrefix}-base-select-menu__loading`}>
            <NInternalLoading clsPrefix={clsPrefix} strokeWidth={20} />
          </div>
        ) : !this.empty ? (
          <NScrollbar
            ref="scrollbarRef"
            scrollable={this.scrollable}
            container={virtualScroll ? this.virtualListContainer : undefined}
            content={virtualScroll ? this.virtualListContent : undefined}
            onScroll={virtualScroll ? undefined : this.doScroll}
          >
            {{
              default: () => {
                return virtualScroll ? (
                  <VirtualList
                    ref="virtualListRef"
                    class={`${clsPrefix}-virtual-list`}
                    items={this.flattenedNodes}
                    itemSize={this.itemSize}
                    showScrollbar={false}
                    defaultScrollIndex={this.defaultScrollIndex}
                    paddingTop={this.padding.top}
                    paddingBottom={this.padding.bottom}
                    onResize={this.handleVirtualListResize}
                    onScroll={this.handleVirtualListScroll}
                  >
                    {{
                      default: ({
                        item: tmNode
                      }: {
                        item: TreeNode<
                        | SelectGroupOption
                        | SelectBaseOption
                        | SelectIgnoredOption
                        >
                      }) => {
                        return tmNode.isGroup ? (
                          <NSelectGroupHeader
                            key={tmNode.key}
                            clsPrefix={clsPrefix}
                            tmNode={
                              tmNode as unknown as TreeNode<SelectGroupOption>
                            }
                          />
                        ) : tmNode.ignored ? null : (
                          <NSelectOption
                            clsPrefix={clsPrefix}
                            key={tmNode.key}
                            tmNode={
                              tmNode as unknown as TreeNode<SelectBaseOption>
                            }
                          />
                        )
                      }
                    }}
                  </VirtualList>
                ) : (
                  <div
                    class={`${clsPrefix}-base-select-menu-option-wrapper`}
                    style={{
                      paddingTop: this.padding.top,
                      paddingBottom: this.padding.bottom
                    }}
                  >
                    {this.flattenedNodes.map((tmNode) =>
                      tmNode.isGroup ? (
                        <NSelectGroupHeader
                          key={tmNode.key}
                          clsPrefix={clsPrefix}
                          tmNode={
                            tmNode as unknown as TreeNode<SelectGroupOption>
                          }
                        />
                      ) : (
                        <NSelectOption
                          clsPrefix={clsPrefix}
                          key={tmNode.key}
                          tmNode={
                            tmNode as unknown as TreeNode<SelectBaseOption>
                          }
                        />
                      )
                    )}
                  </div>
                )
              }
            }}
          </NScrollbar>
        ) : (
          <div class={`${clsPrefix}-base-select-menu__empty`}>
            {renderSlot($slots, 'empty', undefined, () => [<NEmpty />])}
          </div>
        )}
        {$slots.action && (
          <div class={`${clsPrefix}-base-select-menu__action`} data-action>
            {renderSlot($slots, 'action')}
          </div>
        )}
        {$slots.action && <NFocusDetector onFocus={this.onTabOut} />}
      </div>
    )
  }
})
