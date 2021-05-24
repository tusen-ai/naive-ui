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
import { createTreeMate, flatten, createIndexGetter } from 'treemate'
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
import { keysWithFilter, emptyImage } from './utils'
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
  DropPosition,
  AllowDrop,
  MotionData,
  treeInjectionKey
} from './interface'
import MotionWrapper from './MotionWrapper'
import { defaultAllowDrop } from './dnd'

// TODO:
// During expanding, some node are mis-applied with :active style
// Async dnd has bug

const ITEM_SIZE = 30

const treeProps = {
  ...(useTheme.props as ThemeProps<TreeTheme>),
  data: {
    type: Array as PropType<TreeOptions>,
    default: () => []
  },
  defaultExpandAll: Boolean,
  expandOnDragenter: {
    type: Boolean,
    default: true
  },
  cancelable: Boolean,
  checkable: Boolean,
  draggable: Boolean,
  blockNode: Boolean,
  blockLine: Boolean,
  disabled: Boolean,
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
  indent: {
    type: Number,
    default: 16
  },
  allowDrop: {
    type: Function as PropType<AllowDrop>,
    default: defaultAllowDrop
  },
  virtualScroll: Boolean,
  onDragenter: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragleave: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragend: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragstart: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
  onDragover: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
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

    let expandTimerId: number | null = null
    let nodeKeyToBeExpanded: Key | null = null
    const highlightKeysRef = ref<Key[]>([])
    const loadingKeysRef = ref<Key[]>([])

    let dragStartX: number = 0
    const draggingNodeRef = ref<TmNode | null>(null)
    const droppingNodeRef = ref<TmNode | null>(null)
    const droppingMouseNodeRef = ref<TmNode | null>(null)
    const droppingPositionRef = ref<'before' | 'inside' | 'after' | null>(null)
    const droppingOffsetLevelRef = ref<number>(0)
    const droppingNodeParentRef = computed(() => {
      const { value: droppingNode } = droppingNodeRef
      if (!droppingNode) return null
      // May avoid overlap between line mark of first child & rect mark of parent
      // if (droppingNode.isFirstChild && droppingPositionRef.value === 'before') {
      //   return null
      // }
      return droppingNode.parent
    })

    // shallow watch data
    watch(
      toRef(props, 'data'),
      () => {
        loadingKeysRef.value = []
        resetDndState()
      },
      {
        deep: false
      }
    )
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

    const getFIndexRef = computed(() => {
      return createIndexGetter(fNodesRef.value)
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
    function doDragOver (info: DragInfo): void {
      const { onDragover } = props
      if (onDragover) call(onDragover, info)
    }
    function doDrop (info: DropInfo): void {
      const { onDrop } = props
      if (onDrop) call(onDrop, info)
    }
    function resetDndState (): void {
      resetDragState()
      resetDropState()
    }
    function resetDragState (): void {
      draggingNodeRef.value = null
    }
    function resetDropState (): void {
      droppingOffsetLevelRef.value = 0
      droppingNodeRef.value = null
      droppingMouseNodeRef.value = null
      droppingPositionRef.value = null
      resetDragExpandState()
    }
    function resetDragExpandState (): void {
      if (expandTimerId) {
        window.clearTimeout(expandTimerId)
        expandTimerId = null
      }
      nodeKeyToBeExpanded = null
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

    function expandDragEnterNode (node: TmNode): void {
      if (expandTimerId) {
        window.clearTimeout(expandTimerId)
        expandTimerId = null
      }
      nodeKeyToBeExpanded = node.key
      const expand = (): void => {
        if (nodeKeyToBeExpanded !== node.key) return
        const { value: droppingMouseNode } = droppingMouseNodeRef
        if (
          droppingMouseNode &&
          droppingMouseNode.key === node.key &&
          !mergedExpandedKeysRef.value.includes(node.key)
        ) {
          doExpandedKeysChange(mergedExpandedKeysRef.value.concat(node.key))
        }
        expandTimerId = null
        nodeKeyToBeExpanded = null
      }
      if (!node.shallowLoaded) {
        expandTimerId = window.setTimeout(() => {
          const { onLoad } = props
          if (onLoad) {
            if (!loadingKeysRef.value.includes(node.key)) {
              loadingKeysRef.value.push(node.key)
              onLoad(node.rawNode)
                .then(() => {
                  loadingKeysRef.value.splice(
                    loadingKeysRef.value.findIndex((key) => key === node.key),
                    1
                  )
                  expand()
                })
                .catch((loadError) => {
                  console.error(loadError)
                  resetDragExpandState()
                })
            }
          } else if (__DEV__) {
            warn(
              'tree',
              'There is unloaded node in data but props.onLoad is not specified.'
            )
          }
        }, 1000)
      } else {
        expandTimerId = window.setTimeout(() => {
          expand()
        }, 1000)
      }
    }

    // Dnd
    function handleDragEnter ({ event, node }: InternalDragInfo): void {
      // node should be a tmNode
      if (!props.draggable || props.disabled || node.disabled) return
      handleDragOver({ event, node }, false)
      doDragEnter({ event, node: node.rawNode })
    }
    function handleDragLeave ({ event, node }: InternalDragInfo): void {
      if (!props.draggable || props.disabled || node.disabled) return
      doDragLeave({ event, node: node.rawNode })
    }
    function handleDragLeaveTree (e: DragEvent): void {
      if (e.target !== e.currentTarget) return
      resetDropState()
    }
    // Dragend is ok, we don't need to add global listener to reset drag status
    function handleDragEnd ({ event, node }: InternalDragInfo): void {
      resetDndState()
      if (!props.draggable || props.disabled || node.disabled) return
      doDragEnd({ event, node: node.rawNode })
    }
    function handleDragStart ({ event, node }: InternalDragInfo): void {
      if (!props.draggable || props.disabled || node.disabled) return
      // Most of time, the image will block user's view
      event.dataTransfer?.setDragImage(emptyImage, 0, 0)
      dragStartX = event.clientX
      draggingNodeRef.value = node
      doDragStart({ event, node: node.rawNode })
    }
    function handleDragOver (
      { event, node }: InternalDragInfo,
      emit: boolean = true
    ): void {
      if (!props.draggable || props.disabled || node.disabled) return
      const { value: draggingNode } = draggingNodeRef
      if (!draggingNode) return
      const { allowDrop, indent } = props
      if (emit) doDragOver({ event, node: node.rawNode })
      // Update dropping node
      const el = event.currentTarget as HTMLElement
      const {
        height: elOffsetHeight,
        top: elClientTop
      } = el.getBoundingClientRect()
      const eventOffsetY = event.clientY - elClientTop
      let mousePosition: DropPosition

      const allowDropInside = allowDrop({
        node: node.rawNode,
        dropPosition: 'inside',
        phase: 'drag'
      })

      if (allowDropInside) {
        if (eventOffsetY <= 8) {
          mousePosition = 'before'
        } else if (eventOffsetY >= elOffsetHeight - 8) {
          mousePosition = 'after'
        } else {
          mousePosition = 'inside'
        }
      } else {
        if (eventOffsetY <= elOffsetHeight / 2) {
          mousePosition = 'before'
        } else {
          mousePosition = 'after'
        }
      }

      const { value: getFindex } = getFIndexRef

      /** determine the drop position and drop node */
      /** the dropping node needn't to be the mouse hovering node! */
      /**
       * if there is something i've learned from implementing a complex
       * drag & drop. that is never write unit test before you really figure
       * out what behavior is exactly you want.
       */
      let finalDropNode: TmNode
      let finalDropPosition: DropPosition
      const hoverNodeFIndex = getFindex(node.key)
      if (hoverNodeFIndex === null) {
        resetDropState()
        return
      }

      let mouseAtExpandedNonLeafNode = false
      if (mousePosition === 'inside') {
        finalDropNode = node
        finalDropPosition = 'inside'
      } else {
        if (mousePosition === 'before') {
          if (node.isFirstChild) {
            finalDropNode = node
            finalDropPosition = 'before'
          } else {
            finalDropNode = fNodesRef.value[hoverNodeFIndex - 1]
            finalDropPosition = 'after'
          }
        } else {
          finalDropNode = node
          finalDropPosition = 'after'
        }
      }

      // If the node is non-leaf and it is expanded, we don't allow it to
      // drop after it and change it to drop before its next view sibling
      if (
        !finalDropNode.isLeaf &&
        mergedExpandedKeysRef.value.includes(finalDropNode.key)
      ) {
        mouseAtExpandedNonLeafNode = true
        if (finalDropPosition === 'after') {
          finalDropNode = fNodesRef.value[hoverNodeFIndex + 1]
          if (!finalDropNode) {
            // maybe there is no next view sibling when non-leaf node has no
            // children and it is the last node in the tree
            finalDropNode = node
            finalDropPosition = 'inside'
          } else {
            finalDropPosition = 'before'
          }
        }
      }

      const droppingMouseNode = finalDropNode

      droppingMouseNodeRef.value = droppingMouseNode

      // This is a speacial case, user is dragging a last child itself, so we
      // only view it as they are trying to drop after it.
      // There are some relevant codes in bailout 1's child branch.
      // Also, the expand bailout should have a high priority. If it's non-leaf
      // node and expanded, keep its origin drop position
      if (
        !mouseAtExpandedNonLeafNode &&
        draggingNode.isLastChild &&
        draggingNode.key === finalDropNode.key
      ) {
        finalDropPosition = 'after'
      }

      if (finalDropPosition === 'after') {
        let offset = dragStartX - event.clientX // drag left => > 0
        let offsetLevel = 0
        while (
          offset >= indent / 2 && // divide by 2 to make it easier to trigger
          finalDropNode.parent !== null &&
          finalDropNode.isLastChild &&
          offsetLevel < 1
        ) {
          offset -= indent
          offsetLevel += 1
          finalDropNode = finalDropNode.parent
        }
        droppingOffsetLevelRef.value = offsetLevel
      } else {
        droppingOffsetLevelRef.value = 0
      }

      // Bailout 1
      // Drag self into self
      // Drag it into direct parent
      if (
        draggingNode.contains(finalDropNode) ||
        (finalDropPosition === 'inside' &&
          draggingNode.parent?.key === finalDropNode.key)
      ) {
        if (
          draggingNode.key === droppingMouseNode.key &&
          draggingNode.key === finalDropNode.key
        ) {
          // This is special case that we want ui to show a mark to guide user
          // to start dragging. Nor they will think nothing happens.
          // However this is an invalid drop, we need to guard it inside
          // handleDrop
        } else {
          resetDropState()
          return
        }
      }

      // Bailout 3
      if (
        !allowDrop({
          node: finalDropNode.rawNode,
          dropPosition: finalDropPosition,
          phase: 'drag'
        })
      ) {
        resetDropState()
        return
      }

      if (draggingNode.key === finalDropNode.key) {
        // don't expand when drag on itself
        resetDragExpandState()
      } else {
        if (nodeKeyToBeExpanded !== finalDropNode.key) {
          if (finalDropPosition === 'inside') {
            if (props.expandOnDragenter) {
              expandDragEnterNode(finalDropNode)
              // Bailout 4
              // not try to loading
              if (
                !finalDropNode.shallowLoaded &&
                nodeKeyToBeExpanded !== finalDropNode.key
              ) {
                resetDndState()
                return
              }
            } else {
              // Bailout 5
              // never expands on drag
              if (!finalDropNode.shallowLoaded) {
                resetDndState()
                return
              }
            }
          } else {
            resetDragExpandState()
          }
        } else {
          if (finalDropPosition !== 'inside') {
            resetDragExpandState()
          }
        }
      }
      droppingPositionRef.value = finalDropPosition
      droppingNodeRef.value = finalDropNode
    }
    function handleDrop ({ event, node, dropPosition }: InternalDropInfo): void {
      if (!props.draggable || props.disabled || node.disabled) {
        return
      }
      const { value: draggingNode } = draggingNodeRef
      const { value: droppingNode } = droppingNodeRef
      const { value: droppingPosition } = droppingPositionRef
      if (!draggingNode || !droppingNode || !droppingPosition) {
        return
      }
      // Bailout 1
      if (
        !props.allowDrop({
          node: droppingNode.rawNode,
          dropPosition: droppingPosition,
          phase: 'drag'
        })
      ) {
        return
      }
      // Bailout 2
      // This is a special case to guard since we want ui to show the status
      // but not to emit a event
      if (draggingNode.key === droppingNode.key) {
        return
      }
      // Bailout 3
      // insert before its next node
      // insert after its prev node
      if (droppingPosition === 'before') {
        const nextNode = draggingNode.getNext({ includeDisabled: true })
        if (nextNode) {
          if (nextNode.key === droppingNode.key) {
            resetDropState()
            return
          }
        }
      }
      if (droppingPosition === 'after') {
        const prevNode = draggingNode.getPrev({ includeDisabled: true })
        if (prevNode) {
          if (prevNode.key === droppingNode.key) {
            resetDropState()
            return
          }
        }
      }

      doDrop({
        event,
        node: droppingNode.rawNode,
        dragNode: draggingNode.rawNode,
        dropPosition
      })
      resetDndState()
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
      blockLineRef: toRef(props, 'blockLine'),
      indentRef: toRef(props, 'indent'),
      droppingMouseNodeRef,
      droppingNodeParentRef,
      draggingNodeRef,
      droppingPositionRef,
      droppingOffsetLevelRef,
      fNodesRef,
      handleSwitcherClick,
      handleDragEnd,
      handleDragEnter,
      handleDragLeave,
      handleDragStart,
      handleDrop,
      handleDragOver,
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
      handleDragLeaveTree,
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
            nodeTextColorDisabled,
            dropMarkColor
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
          '--node-text-color-disabled': nodeTextColorDisabled,
          '--drop-mark-color': dropMarkColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix, blockNode, blockLine, draggable } = this
    const treeClass = [
      `${mergedClsPrefix}-tree`,
      (blockLine || blockNode) && `${mergedClsPrefix}-tree--block-node`,
      blockLine && `${mergedClsPrefix}-tree--block-line`
    ]
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
          onDragleave={draggable ? this.handleDragLeaveTree : undefined}
          container={this.getScrollContainer}
          content={this.getScrollContent}
          class={treeClass}
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
        class={treeClass}
        style={this.cssVars as CSSProperties}
        onDragleave={draggable ? this.handleDragLeaveTree : undefined}
        ref="selfElRef"
      >
        {this.fNodes.map(createNode)}
      </div>
    )
  }
})
