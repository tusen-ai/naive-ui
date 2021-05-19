/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  provide,
  PropType,
  watch,
  CSSProperties,
  VNode
} from 'vue'
import { createTreeMate, flatten } from 'treemate'
import { useMergedState } from 'vooks'
import { VirtualListInst, VVirtualList } from 'vueuc'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, warn } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { NScrollbar, ScrollbarInst } from '../../scrollbar'
import { treeLight } from '../styles'
import type { TreeTheme } from '../styles'
import NTreeNode from './TreeNode'
import { keysWithFilter } from './utils'
import style from './styles/index.cssr'
import {
  DragInfo,
  DropInfo,
  TreeOptions,
  Key,
  TreeOption,
  TmNode,
  InternalDragInfo,
  InternalDropInfo,
  treeInjectionKey
} from './interface'
import MotionWrapper from './MotionWrapper'

interface MotionData {
  __motion: true
  height: number | undefined
  mode: 'expand' | 'collapse'
  nodes: TmNode[]
}

const ITEM_SIZE = 30

const treeProps = {
  ...(useTheme.props as ThemeProps<TreeTheme>),
  data: {
    type: Array as PropType<TreeOptions>,
    default: () => []
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  expandOnDragenter: {
    type: Boolean,
    default: true
  },
  cancelable: {
    type: Boolean,
    default: true
  },
  checkable: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: false
  },
  blockNode: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  checkedKeys: Array as PropType<Key[]>,
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  expandedKeys: Array as PropType<Key[]>,
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  selectedKeys: Array as PropType<Key[]>,
  defaultSelectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  remote: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  pattern: {
    type: String,
    default: ''
  },
  filter: {
    type: Function as PropType<(pattern: string, node: TreeOption) => boolean>,
    default: (pattern: string, node: TreeOption) => {
      if (!pattern) return true
      return ~node.label.toLowerCase().indexOf(pattern.toLowerCase())
    }
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<void>>,
  cascade: {
    type: Boolean,
    default: false
  },
  selectable: {
    type: Boolean,
    default: true
  },
  virtualScroll: Boolean,
  onDragenter: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragstart: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:expandedKeys': [Function, Array] as PropType<
  MaybeArray<(value: Key[]) => void>
  >,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:checkedKeys': [Function, Array] as PropType<
  MaybeArray<(value: Key[]) => void>
  >,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:selectedKeys': [Function, Array] as PropType<
  MaybeArray<(value: Key[]) => void>
  >,
  // deprecated
  /** @deprecated */
  onExpandedKeysChange: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: Key[]) => void> | undefined
    >,
    validator: () => {
      warn(
        'tree',
        '`on-expanded-keys-change` is deprecated, please use `on-update:expanded-keys` instead.'
      )
      return true
    },
    default: undefined
  },
  /** @deprecated */
  onCheckedKeysChange: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: Key[]) => void> | undefined
    >,
    validator: () => {
      warn(
        'tree',
        '`on-checked-keys-change` is deprecated, please use `on-update:expanded-keys` instead.'
      )
      return true
    },
    default: undefined
  },
  /** @deprecated */
  onSelectedKeysChange: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: Key[]) => void> | undefined
    >,
    validator: () => {
      warn(
        'tree',
        '`on-selected-keys-change` is deprecated, please use `on-update:selected-keys` instead.'
      )
      return true
    },
    default: undefined
  }
} as const

export type TreeProps = ExtractPublicPropTypes<typeof treeProps>

export default defineComponent({
  name: 'Tree',
  props: treeProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Tree',
      'Tree',
      style,
      treeLight,
      props,
      mergedClsPrefixRef
    )
    const selfElRef = ref<HTMLDivElement | null>(null)
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListInstRef = ref<VirtualListInst | null>(null)
    function getScrollContainer (): HTMLElement | null | undefined {
      return virtualListInstRef.value?.listElRef
    }
    function getScrollContent (): HTMLElement | null | undefined {
      return virtualListInstRef.value?.itemsElRef
    }
    const treeMateRef = computed(() => createTreeMate(props.data))
    const uncontrolledCheckedKeysRef = ref(
      props.defaultCheckedKeys || props.checkedKeys
    )
    const controlledCheckedKeysRef = toRef(props, 'checkedKeys')
    const mergedCheckedKeysRef = useMergedState(
      controlledCheckedKeysRef,
      uncontrolledCheckedKeysRef
    )
    const checkedStatusRef = computed(() => {
      return treeMateRef.value.getCheckedKeys(mergedCheckedKeysRef.value, {
        cascade: props.cascade
      })
    })
    const displayedCheckedKeysRef = computed(() => {
      return checkedStatusRef.value.checkedKeys
    })
    const displayedIndeterminateKeysRef = computed(() => {
      return checkedStatusRef.value.indeterminateKeys
    })
    const uncontrolledSelectedKeysRef = ref(
      props.defaultSelectedKeys || props.selectedKeys
    )
    const controlledSelectedKeysRef = toRef(props, 'selectedKeys')
    const mergedSelectedKeysRef = useMergedState(
      controlledSelectedKeysRef,
      uncontrolledSelectedKeysRef
    )
    const uncontrolledExpandedKeysRef = ref(
      props.defaultExpandAll
        ? treeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedKeys || props.expandedKeys
    )
    const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )

    const fNodesRef = computed(() =>
      treeMateRef.value.getFlattenedNodes(mergedExpandedKeysRef.value)
    )

    const draggingNodeKeyRef = ref<Key | null>(null)
    const draggingNodeRef = ref<TreeOption | null>(null)
    const droppingNodeKeyRef = ref<Key | null>(null)
    const expandTimerIdRef = ref<number | undefined>(undefined)
    const highlightKeysRef = ref<Key[]>([])
    const loadingKeysRef = ref<Key[]>([])

    watch(toRef(props, 'data'), () => {
      loadingKeysRef.value = []
      expandTimerIdRef.value = undefined
    })
    watch(toRef(props, 'pattern'), (value) => {
      if (value) {
        const [expandedKeysAfterChange, highlightKeys] = keysWithFilter(
          props.data,
          props.pattern,
          props.filter
        )
        highlightKeysRef.value = highlightKeys
        doExpandedKeysChange(expandedKeysAfterChange)
      } else {
        highlightKeysRef.value = []
      }
    })

    const aipRef = ref(false) // animation in progress
    const afNodeRef = ref<Array<TmNode | MotionData>>([]) // animation flattened nodes
    watch(mergedExpandedKeysRef, (value, prevValue) => {
      const prevVSet = new Set(prevValue)
      let addedKey: Key | null = null
      let removedKey: Key | null = null
      for (const expandedKey of value) {
        if (!prevVSet.has(expandedKey)) {
          if (addedKey !== null) return // multi expand, not triggered by click
          addedKey = expandedKey
        }
      }
      const currentVSet = new Set(value)
      for (const expandedKey of prevValue) {
        if (!currentVSet.has(expandedKey)) {
          if (removedKey !== null) return // multi collapse, not triggered by click
          removedKey = expandedKey
        }
      }
      if (
        (addedKey !== null && removedKey !== null) ||
        (addedKey === null && removedKey === null)
      ) {
        // 1. multi action, not triggered by click
        // 2. no action, don't know what happened
        return
      }
      const { virtualScroll } = props
      const viewportHeight = (virtualScroll
        ? virtualListInstRef.value!.listElRef
        : selfElRef.value!
      ).offsetHeight
      const viewportItemCount = Math.ceil(viewportHeight / ITEM_SIZE) + 1
      if (addedKey !== null) {
        // play add animation
        aipRef.value = true
        afNodeRef.value = treeMateRef.value.getFlattenedNodes(prevValue)
        const expandedNodeIndex = afNodeRef.value.findIndex(
          (node) => (node as any).key === addedKey
        )
        if (~expandedNodeIndex) {
          const expandedChildren = flatten(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (afNodeRef.value[expandedNodeIndex] as TmNode).children!,
            value
          )
          afNodeRef.value.splice(expandedNodeIndex + 1, 0, {
            __motion: true,
            mode: 'expand',
            height: virtualScroll
              ? expandedChildren.length * ITEM_SIZE
              : undefined,
            nodes: virtualScroll
              ? expandedChildren.slice(0, viewportItemCount)
              : expandedChildren
          })
        }
      }
      if (removedKey !== null) {
        // play remove animation
        aipRef.value = true
        afNodeRef.value = treeMateRef.value.getFlattenedNodes(value)
        const collapsedNodeIndex = afNodeRef.value.findIndex(
          (node) => (node as any).key === removedKey
        )
        if (~collapsedNodeIndex) {
          const collapsedChildren = flatten(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (afNodeRef.value[collapsedNodeIndex] as TmNode).children!,
            value
          )
          afNodeRef.value.splice(collapsedNodeIndex + 1, 0, {
            __motion: true,
            mode: 'collapse',
            height: virtualScroll
              ? collapsedChildren.length * ITEM_SIZE
              : undefined,
            nodes: virtualScroll
              ? collapsedChildren.slice(0, viewportItemCount)
              : collapsedChildren
          })
        }
      }
    })

    const mergedFNodesRef = computed(() => {
      if (aipRef.value) return afNodeRef.value
      else return fNodesRef.value
    })

    function handleAfterEnter (): void {
      aipRef.value = false
    }

    function doExpandedKeysChange (value: Key[]): void {
      const {
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
        onExpandedKeysChange
      } = props
      uncontrolledExpandedKeysRef.value = value
      if (onUpdateExpandedKeys) call(onUpdateExpandedKeys, value)
      if (onExpandedKeysChange) call(onExpandedKeysChange, value)
    }
    function doCheckedKeysChange (value: Key[]): void {
      const {
        'onUpdate:checkedKeys': onUpdateCheckedKeys,
        onCheckedKeysChange
      } = props
      uncontrolledCheckedKeysRef.value = value
      if (onUpdateCheckedKeys) call(onUpdateCheckedKeys, value)
      if (onCheckedKeysChange) call(onCheckedKeysChange, value)
    }
    function doSelectedKeysChange (value: Key[]): void {
      const {
        'onUpdate:selectedKeys': onUpdateSelectedKeys,
        onSelectedKeysChange
      } = props
      uncontrolledSelectedKeysRef.value = value
      if (onUpdateSelectedKeys) call(onUpdateSelectedKeys, value)
      if (onSelectedKeysChange) call(onSelectedKeysChange, value)
    }
    // Drag & Drop
    function doDragEnter (info: DragInfo): void {
      const { onDragenter } = props
      if (onDragenter) call(onDragenter, info)
    }
    function doDragLeave (info: DragInfo): void {
      const { onDragleave } = props
      if (onDragleave) call(onDragleave, info)
    }
    function doDragEnd (info: DragInfo): void {
      const { onDragend } = props
      if (onDragend) call(onDragend, info)
    }
    function doDragStart (info: DragInfo): void {
      const { onDragstart } = props
      if (onDragstart) call(onDragstart, info)
    }
    function doDrop (info: DropInfo): void {
      const { onDrop } = props
      if (onDrop) call(onDrop, info)
    }
    function resetDragStatus (): void {
      draggingNodeKeyRef.value = null
      draggingNodeRef.value = null
      droppingNodeKeyRef.value = null
    }
    function handleCheck (node: TmNode, checked: boolean): void {
      if (props.disabled || node.disabled) return
      const { checkedKeys } = treeMateRef.value[checked ? 'check' : 'uncheck'](
        node.key,
        displayedCheckedKeysRef.value,
        {
          cascade: props.cascade
        }
      )
      doCheckedKeysChange(checkedKeys)
    }
    function toggleExpand (node: TmNode): void {
      if (props.disabled) return
      const { value: mergedExpandedKeys } = mergedExpandedKeysRef
      const index = mergedExpandedKeys.findIndex(
        (expandNodeId) => expandNodeId === node.key
      )
      if (~index) {
        const expandedKeysAfterChange = Array.from(mergedExpandedKeys)
        expandedKeysAfterChange.splice(index, 1)
        doExpandedKeysChange(expandedKeysAfterChange)
      } else {
        doExpandedKeysChange(mergedExpandedKeys.concat(node.key))
      }
    }
    function handleSwitcherClick (node: TmNode): void {
      if (props.disabled || node.disabled || aipRef.value) return
      toggleExpand(node)
    }
    function handleSelect (node: TmNode): void {
      if (props.disabled || node.disabled || !props.selectable) return
      if (props.multiple) {
        const selectedKeys = mergedSelectedKeysRef.value
        const index = selectedKeys.findIndex((key) => key === node.key)
        if (~index) {
          if (props.cancelable) {
            selectedKeys.splice(index, 1)
          }
        } else if (!~index) {
          selectedKeys.push(node.key)
        }
        doSelectedKeysChange(selectedKeys)
      } else {
        const selectedKeys = mergedSelectedKeysRef.value
        if (selectedKeys.includes(node.key)) {
          if (props.cancelable) {
            doSelectedKeysChange([])
          }
        } else {
          doSelectedKeysChange([node.key])
        }
      }
    }
    function handleDragEnter ({ event, node }: InternalDragInfo): void {
      // node should be a tmNode
      if (!props.draggable || props.disabled || node.disabled) return
      doDragEnter({ event, node: node.rawNode })
      if (!props.expandOnDragenter) return
      droppingNodeKeyRef.value = node.key
      if (node.key === draggingNodeKeyRef.value) return
      if (!mergedExpandedKeysRef.value.includes(node.key) && !node.isLeaf) {
        window.clearTimeout(expandTimerIdRef.value)
        const expand = (): void => {
          if (
            droppingNodeKeyRef.value === node.key &&
            !mergedExpandedKeysRef.value.includes(node.key)
          ) {
            doExpandedKeysChange(mergedExpandedKeysRef.value.concat(node.key))
          }
        }
        if (!node.shallowLoaded) {
          if (!loadingKeysRef.value.includes(node.key)) {
            loadingKeysRef.value.push(node.key)
          }
          if (props.onLoad) {
            void props.onLoad(node.rawNode).then(() => {
              loadingKeysRef.value.splice(
                loadingKeysRef.value.findIndex((key) => key === node.key),
                1
              )
              expand()
            })
          }
          return
        }
        expandTimerIdRef.value = window.setTimeout(() => {
          expand()
          expandTimerIdRef.value = undefined
        }, 800)
      }
    }
    function handleDragLeave ({ event, node }: InternalDragInfo): void {
      if (!props.draggable || props.disabled || node.disabled) return
      droppingNodeKeyRef.value = null
      doDragLeave({ event, node: node.rawNode })
    }
    function handleDragEnd ({ event, node }: InternalDragInfo): void {
      if (!props.draggable || props.disabled || node.disabled) return
      doDragEnd({ event, node: node.rawNode })
      resetDragStatus()
    }
    function handleDragStart ({ event, node }: InternalDragInfo): void {
      if (!props.draggable || props.disabled || node.disabled) return
      draggingNodeKeyRef.value = node.key
      draggingNodeRef.value = node.rawNode
      doDragStart({ event, node: node.rawNode })
    }
    function handleDrop ({ event, node, dropPosition }: InternalDropInfo): void {
      if (
        !props.draggable ||
        props.disabled ||
        node.disabled ||
        !draggingNodeRef.value
      ) {
        return
      }
      doDrop({
        event,
        node: node.rawNode,
        dragNode: draggingNodeRef.value,
        dropPosition
      })
      resetDragStatus()
    }
    function handleScroll (): void {
      scrollbarInstRef.value?.sync()
    }
    function handleResize (): void {
      scrollbarInstRef.value?.sync()
    }
    provide(treeInjectionKey, {
      loadingKeysRef,
      highlightKeysRef,
      displayedCheckedKeysRef,
      displayedIndeterminateKeysRef,
      mergedSelectedKeysRef,
      mergedExpandedKeysRef,
      mergedThemeRef: themeRef,
      remoteRef: toRef(props, 'remote'),
      onLoadRef: toRef(props, 'onLoad'),
      draggableRef: toRef(props, 'draggable'),
      checkableRef: toRef(props, 'checkable'),
      blockNodeRef: toRef(props, 'blockNode'),
      handleSwitcherClick,
      handleDragEnd,
      handleDragEnter,
      handleDragLeave,
      handleDragStart,
      handleDrop,
      handleSelect,
      handleCheck
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      fNodes: mergedFNodesRef,
      aip: aipRef,
      selfElRef,
      virtualListInstRef,
      scrollbarInstRef,
      handleScroll,
      getScrollContainer,
      getScrollContent,
      handleAfterEnter,
      handleResize,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            nodeBorderRadius,
            nodeColorHover,
            nodeColorPressed,
            nodeColorActive,
            arrowColor,
            loadingColor,
            nodeTextColor,
            nodeTextColorDisabled
          }
        } = themeRef.value
        return {
          '--arrow-color': arrowColor,
          '--loading-color': loadingColor,
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--node-border-radius': nodeBorderRadius,
          '--node-color-active': nodeColorActive,
          '--node-color-hover': nodeColorHover,
          '--node-color-pressed': nodeColorPressed,
          '--node-text-color': nodeTextColor,
          '--node-text-color-disabled': nodeTextColorDisabled
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    const createNode = (tmNode: TmNode | MotionData): VNode =>
      '__motion' in tmNode ? (
        <MotionWrapper
          height={tmNode.height}
          nodes={tmNode.nodes}
          clsPrefix={mergedClsPrefix}
          mode={tmNode.mode}
          onAfterEnter={this.handleAfterEnter}
        />
      ) : (
        <NTreeNode
          key={tmNode.key}
          tmNode={tmNode}
          clsPrefix={mergedClsPrefix}
        />
      )
    if (this.virtualScroll) {
      const { mergedTheme } = this
      return (
        <NScrollbar
          ref="scrollbarInstRef"
          container={this.getScrollContainer}
          content={this.getScrollContent}
          class={`${mergedClsPrefix}-tree`}
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        >
          {{
            default: () => (
              <VVirtualList
                ref="virtualListInstRef"
                items={this.fNodes}
                itemSize={ITEM_SIZE}
                ignoreItemResize={this.aip}
                style={this.cssVars as CSSProperties}
                onScroll={this.handleScroll}
                onResize={this.handleResize}
                showScrollbar={false}
                itemResizable
              >
                {{
                  default: ({ item }: { item: TmNode | MotionData }) =>
                    createNode(item)
                }}
              </VVirtualList>
            )
          }}
        </NScrollbar>
      )
    }
    return (
      <div
        class={`${mergedClsPrefix}-tree`}
        style={this.cssVars as CSSProperties}
        ref="selfElRef"
      >
        {this.fNodes.map(createNode)}
      </div>
    )
  }
})
