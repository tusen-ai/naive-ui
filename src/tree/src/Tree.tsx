import {
  type CSSProperties,
  type PropType,
  type VNode,
  type VNodeChild,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  provide,
  ref,
  toRef,
  watch,
  watchEffect
} from 'vue'
import {
  type CheckStrategy,
  type TreeMateOptions,
  createIndexGetter,
  createTreeMate,
  flatten
} from 'treemate'
import { useMergedState } from 'vooks'
import {
  VVirtualList,
  type VirtualListInst,
  type VirtualListScrollToOptions
} from 'vueuc'
import { depx, getPadding, pxfy } from 'seemly'
import { treeSelectInjectionKey } from '../../tree-select/src/interface'
import { useConfig, useRtl, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createDataKey, resolveSlot, warn, warnOnce } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { NxScrollbar } from '../../_internal'
import type { ScrollbarInst } from '../../_internal'
import { treeLight } from '../styles'
import type { TreeTheme } from '../styles'
import { NEmpty } from '../../empty'
import type { ScrollbarProps } from '../../scrollbar/src/Scrollbar'
import NTreeNode from './TreeNode'
import {
  emptyImage,
  filterTree,
  isNodeDisabled,
  keysWithFilter,
  useMergedCheckStrategy
} from './utils'
import { useKeyboard } from './keyboard'
import type {
  AllowDrop,
  CheckOnClick,
  DropPosition,
  GetChildren,
  InternalDragInfo,
  InternalDropInfo,
  InternalTreeInst,
  Key,
  MotionData,
  OnLoad,
  RenderLabel,
  RenderPrefix,
  RenderSuffix,
  RenderSwitcherIcon,
  TmNode,
  TreeDragInfo,
  TreeDropInfo,
  TreeInst,
  TreeNodeProps,
  TreeOption,
  TreeOptions,
  TreeOverrideNodeClickBehavior
} from './interface'
import { treeInjectionKey } from './interface'
import MotionWrapper from './MotionWrapper'
import { defaultAllowDrop } from './dnd'
import style from './styles/index.cssr'

export function createTreeMateOptions<T>(
  keyField: string,
  childrenField: string,
  disabledField: string,
  getChildren: GetChildren | undefined
): TreeMateOptions<T, T, T> {
  const settledGetChildren: GetChildren
    = getChildren
    || ((node: T) => {
      return (node as any)[childrenField]
    })
  return {
    getIsGroup() {
      return false
    },
    getKey(node: T) {
      return (node as any)[keyField]
    },
    getChildren: settledGetChildren,
    getDisabled(node: T) {
      return !!((node as any)[disabledField] || (node as any).checkboxDisabled)
    }
  }
}

export type OnUpdateCheckedKeys = (
  value: Array<string & number>,
  option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'check' | 'uncheck'
  }
) => void
export type OnUpdateCheckedKeysImpl = (
  value: Key[],
  option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'check' | 'uncheck'
  }
) => void
export type OnUpdateIndeterminateKeys = (
  value: Array<string & number>,
  option: Array<TreeOption | null>
) => void
export type OnUpdateIndeterminateKeysImpl = (
  value: Key[],
  option: Array<TreeOption | null>
) => void
export type OnUpdateSelectedKeys = (
  value: Array<string & number>,
  option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'select' | 'unselect'
  }
) => void
export type OnUpdateSelectedKeysImpl = (
  value: Key[],
  option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'select' | 'unselect'
  }
) => void
export type onUpdateExpandedKeys = (
  value: Array<string & number>,
  option: Array<TreeOption | null>,
  meta:
    | {
      node: TreeOption
      action: 'expand' | 'collapse'
    }
    | {
      node: null
      action: 'filter'
    }
) => void
export type OnUpdateExpandedKeysImpl = (
  value: Key[],
  option: Array<TreeOption | null>,
  meta:
    | {
      node: TreeOption
      action: 'expand' | 'collapse'
    }
    | {
      node: null
      action: 'filter'
    }
) => void

export const treeSharedProps = {
  allowCheckingNotLoaded: Boolean,
  filter: Function as PropType<(pattern: string, node: TreeOption) => boolean>,
  defaultExpandAll: Boolean,
  expandedKeys: Array as PropType<Key[]>,
  keyField: {
    type: String,
    default: 'key'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  disabledField: {
    type: String,
    default: 'disabled'
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  indeterminateKeys: Array as PropType<Key[]>,
  renderSwitcherIcon: Function as PropType<RenderSwitcherIcon>,
  onUpdateIndeterminateKeys: [Function, Array] as PropType<
    MaybeArray<OnUpdateIndeterminateKeys>
  >,
  'onUpdate:indeterminateKeys': [Function, Array] as PropType<
    MaybeArray<OnUpdateIndeterminateKeys>
  >,
  onUpdateExpandedKeys: [Function, Array] as PropType<
    MaybeArray<onUpdateExpandedKeys>
  >,
  'onUpdate:expandedKeys': [Function, Array] as PropType<
    MaybeArray<onUpdateExpandedKeys>
  >,
  overrideDefaultNodeClickBehavior:
    Function as PropType<TreeOverrideNodeClickBehavior>
} as const

export const treeProps = {
  ...(useTheme.props as ThemeProps<TreeTheme>),
  accordion: Boolean,
  showIrrelevantNodes: { type: Boolean, default: true },
  data: {
    type: Array as PropType<TreeOptions>,
    default: () => []
  },
  expandOnDragenter: {
    type: Boolean,
    default: true
  },
  expandOnClick: Boolean,
  checkOnClick: {
    type: [Boolean, Function] as PropType<boolean | CheckOnClick>,
    default: false
  },
  cancelable: {
    type: Boolean,
    default: true
  },
  checkable: Boolean,
  draggable: Boolean,
  blockNode: Boolean,
  blockLine: Boolean,
  showLine: Boolean,
  disabled: Boolean,
  checkedKeys: Array as PropType<Key[]>,
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  selectedKeys: Array as PropType<Key[]>,
  defaultSelectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  multiple: Boolean,
  pattern: {
    type: String,
    default: ''
  },
  onLoad: Function as PropType<OnLoad>,
  cascade: Boolean,
  selectable: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  indent: {
    type: Number,
    default: 24
  },
  allowDrop: {
    type: Function as PropType<AllowDrop>,
    default: defaultAllowDrop
  },
  animated: {
    type: Boolean,
    default: true
  },
  checkboxPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  virtualScroll: Boolean,
  watchProps: Array as PropType<
    Array<'defaultCheckedKeys' | 'defaultSelectedKeys' | 'defaultExpandedKeys'>
  >,
  renderLabel: Function as PropType<RenderLabel>,
  renderPrefix: Function as PropType<RenderPrefix>,
  renderSuffix: Function as PropType<RenderSuffix>,
  nodeProps: Function as PropType<TreeNodeProps>,
  keyboard: {
    type: Boolean,
    default: true
  },
  getChildren: Function as PropType<GetChildren>,
  onDragenter: [Function, Array] as PropType<
    MaybeArray<(e: TreeDragInfo) => void>
  >,
  onDragleave: [Function, Array] as PropType<
    MaybeArray<(e: TreeDragInfo) => void>
  >,
  onDragend: [Function, Array] as PropType<
    MaybeArray<(e: TreeDragInfo) => void>
  >,
  onDragstart: [Function, Array] as PropType<
    MaybeArray<(e: TreeDragInfo) => void>
  >,
  onDragover: [Function, Array] as PropType<
    MaybeArray<(e: TreeDragInfo) => void>
  >,
  onDrop: [Function, Array] as PropType<MaybeArray<(e: TreeDropInfo) => void>>,
  onUpdateCheckedKeys: [Function, Array] as PropType<
    MaybeArray<OnUpdateCheckedKeys>
  >,
  'onUpdate:checkedKeys': [Function, Array] as PropType<
    MaybeArray<OnUpdateCheckedKeys>
  >,
  onUpdateSelectedKeys: [Function, Array] as PropType<
    MaybeArray<OnUpdateSelectedKeys>
  >,
  'onUpdate:selectedKeys': [Function, Array] as PropType<
    MaybeArray<OnUpdateSelectedKeys>
  >,
  ...treeSharedProps,
  // internal props for tree-select
  internalTreeSelect: Boolean,
  internalScrollable: Boolean,
  internalScrollablePadding: String,
  // use it to display
  internalRenderEmpty: Function as PropType<() => VNodeChild>,
  internalHighlightKeySet: Object as PropType<Set<Key> | null>,
  internalUnifySelectCheck: Boolean,
  internalCheckboxFocusable: {
    type: Boolean,
    default: true
  },
  internalFocusable: {
    // Make tree-select take over keyboard operations
    type: Boolean,
    default: true
  },
  checkStrategy: {
    type: String as PropType<CheckStrategy>,
    default: 'all'
  },
  /**
   * @deprecated
   */
  leafOnly: Boolean
} as const

export type TreeProps = ExtractPublicPropTypes<typeof treeProps>

export default defineComponent({
  name: 'Tree',
  props: treeProps,
  setup(props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.leafOnly) {
          warnOnce(
            'tree',
            '`leaf-only` is deprecated, please use `check-strategy="child"` instead'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef }
      = useConfig(props)
    const rtlEnabledRef = useRtl('Tree', mergedRtlRef, mergedClsPrefixRef)
    const themeRef = useTheme(
      'Tree',
      '-tree',
      style,
      treeLight,
      props,
      mergedClsPrefixRef
    )
    const selfElRef = ref<HTMLDivElement | null>(null)
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
    const virtualListInstRef = ref<VirtualListInst | null>(null)
    function getScrollContainer(): HTMLElement | null | undefined {
      return virtualListInstRef.value?.listElRef
    }
    function getScrollContent(): HTMLElement | null | undefined {
      return virtualListInstRef.value?.itemsElRef
    }

    const mergedFilterRef = computed(() => {
      const { filter } = props
      if (filter)
        return filter
      const { labelField } = props
      return (pattern: string, node: TreeOption): boolean => {
        if (!pattern.length)
          return true
        const label = node[labelField]
        if (typeof label === 'string') {
          return label.toLowerCase().includes(pattern.toLowerCase())
        }
        return false
      }
    })

    const filteredTreeInfoRef = computed<{
      filteredTree: TreeOption[]
      highlightKeySet: Set<Key> | null
      expandedKeys: Key[] | undefined
    }>(() => {
      const { pattern } = props
      if (!pattern) {
        return {
          filteredTree: props.data,
          highlightKeySet: null,
          expandedKeys: undefined
        }
      }
      if (!pattern.length || !mergedFilterRef.value) {
        return {
          filteredTree: props.data,
          highlightKeySet: null,
          expandedKeys: undefined
        }
      }
      return filterTree(
        props.data,
        mergedFilterRef.value,
        pattern,
        props.keyField,
        props.childrenField
      )
    })

    // We don't expect data source to change so we just determine it once
    const displayTreeMateRef = computed(() =>
      createTreeMate<TreeOption>(
        props.showIrrelevantNodes
          ? props.data
          : filteredTreeInfoRef.value.filteredTree,
        createTreeMateOptions(
          props.keyField,
          props.childrenField,
          props.disabledField,
          props.getChildren
        )
      )
    )
    const treeSelectInjection = inject(treeSelectInjectionKey, null)
    const dataTreeMateRef = props.internalTreeSelect
      ? treeSelectInjection!.dataTreeMate
      : computed(() =>
        props.showIrrelevantNodes
          ? displayTreeMateRef.value
          : createTreeMate(
            props.data,
            createTreeMateOptions(
              props.keyField,
              props.childrenField,
              props.disabledField,
              props.getChildren
            )
          )
      )
    const { watchProps } = props
    const uncontrolledCheckedKeysRef = ref<Key[]>([])
    if (watchProps?.includes('defaultCheckedKeys')) {
      watchEffect(() => {
        uncontrolledCheckedKeysRef.value = props.defaultCheckedKeys
      })
    }
    else {
      uncontrolledCheckedKeysRef.value = props.defaultCheckedKeys
    }
    const controlledCheckedKeysRef = toRef(props, 'checkedKeys')
    const mergedCheckedKeysRef = useMergedState(
      controlledCheckedKeysRef,
      uncontrolledCheckedKeysRef
    )
    const checkedStatusRef = computed(() => {
      const value = dataTreeMateRef.value.getCheckedKeys(
        mergedCheckedKeysRef.value,
        {
          cascade: props.cascade,
          allowNotLoaded: props.allowCheckingNotLoaded
        }
      )
      return value
    })
    const mergedCheckStrategyRef = useMergedCheckStrategy(props)
    const displayedCheckedKeysRef = computed(() => {
      return checkedStatusRef.value.checkedKeys
    })
    const displayedIndeterminateKeysRef = computed(() => {
      const { indeterminateKeys } = props
      if (indeterminateKeys !== undefined)
        return indeterminateKeys
      return checkedStatusRef.value.indeterminateKeys
    })
    const uncontrolledSelectedKeysRef = ref<Key[]>([])
    if (watchProps?.includes('defaultSelectedKeys')) {
      watchEffect(() => {
        uncontrolledSelectedKeysRef.value = props.defaultSelectedKeys
      })
    }
    else {
      uncontrolledSelectedKeysRef.value = props.defaultSelectedKeys
    }
    const controlledSelectedKeysRef = toRef(props, 'selectedKeys')
    const mergedSelectedKeysRef = useMergedState(
      controlledSelectedKeysRef,
      uncontrolledSelectedKeysRef
    )
    const uncontrolledExpandedKeysRef = ref<Key[]>([])

    const initUncontrolledExpandedKeys = (keys: undefined | Key[]): void => {
      uncontrolledExpandedKeysRef.value = props.defaultExpandAll
        ? dataTreeMateRef.value.getNonLeafKeys()
        : keys === undefined
          ? props.defaultExpandedKeys
          : keys
    }
    if (watchProps?.includes('defaultExpandedKeys')) {
      // if watching defaultExpandedKeys, we use access props.defaultExpandedKeys inside initiator
      watchEffect(() => {
        initUncontrolledExpandedKeys(undefined)
      })
    }
    else {
      // We by default watchEffect since if defaultExpandAll is true, we should remain tree expand if data changes
      watchEffect(() => {
        initUncontrolledExpandedKeys(props.defaultExpandedKeys)
      })
    }

    const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )

    const fNodesRef = computed(() =>
      displayTreeMateRef.value.getFlattenedNodes(mergedExpandedKeysRef.value)
    )

    const { pendingNodeKeyRef, handleKeydown } = useKeyboard({
      props,
      mergedCheckedKeysRef,
      mergedSelectedKeysRef,
      fNodesRef,
      mergedExpandedKeysRef,
      handleCheck,
      handleSelect,
      handleSwitcherClick
    })

    let expandTimerId: number | null = null
    let nodeKeyToBeExpanded: Key | null = null
    const uncontrolledHighlightKeySetRef = ref(new Set<Key>())
    const controlledHighlightKeySetRef = computed(() => {
      return (
        props.internalHighlightKeySet
        || filteredTreeInfoRef.value.highlightKeySet
      )
    })
    const mergedHighlightKeySetRef = useMergedState(
      controlledHighlightKeySetRef,
      uncontrolledHighlightKeySetRef
    )
    const loadingKeysRef = ref(new Set<Key>())
    const expandedNonLoadingKeysRef = computed(() => {
      return mergedExpandedKeysRef.value.filter(
        key => !loadingKeysRef.value.has(key)
      )
    })

    let dragStartX: number = 0
    const draggingNodeRef = ref<TmNode | null>(null)
    const droppingNodeRef = ref<TmNode | null>(null)
    const droppingMouseNodeRef = ref<TmNode | null>(null)
    const droppingPositionRef = ref<'before' | 'inside' | 'after' | null>(null)
    const droppingOffsetLevelRef = ref<number>(0)
    const droppingNodeParentRef = computed(() => {
      const { value: droppingNode } = droppingNodeRef
      if (!droppingNode)
        return null
      // May avoid overlap between line mark of first child & rect mark of parent
      // if (droppingNode.isFirstChild && droppingPositionRef.value === 'before') {
      //   return null
      // }
      return droppingNode.parent
    })

    // shallow watch data
    let isDataReset = false
    watch(
      toRef(props, 'data'),
      () => {
        isDataReset = true
        void nextTick(() => {
          isDataReset = false
        })
        loadingKeysRef.value.clear()
        pendingNodeKeyRef.value = null
        resetDndState()
      },
      {
        deep: false
      }
    )
    let expandAnimationDisabled = false
    const disableExpandAnimationForOneTick = (): void => {
      expandAnimationDisabled = true
      void nextTick(() => {
        expandAnimationDisabled = false
      })
    }
    let memoizedExpandedKeys: Key[] | undefined
    watch(toRef(props, 'pattern'), (value, oldValue) => {
      if (props.showIrrelevantNodes) {
        memoizedExpandedKeys = undefined
        if (value) {
          const { expandedKeys: expandedKeysAfterChange, highlightKeySet }
            = keysWithFilter(
              props.data,
              props.pattern,
              props.keyField,
              props.childrenField,
              mergedFilterRef.value
            )
          uncontrolledHighlightKeySetRef.value = highlightKeySet
          disableExpandAnimationForOneTick()
          doUpdateExpandedKeys(
            expandedKeysAfterChange,
            getOptionsByKeys(expandedKeysAfterChange),
            { node: null, action: 'filter' }
          )
        }
        else {
          uncontrolledHighlightKeySetRef.value = new Set()
        }
      }
      else {
        if (!value.length) {
          if (memoizedExpandedKeys !== undefined) {
            disableExpandAnimationForOneTick()
            doUpdateExpandedKeys(
              memoizedExpandedKeys,
              getOptionsByKeys(memoizedExpandedKeys),
              { node: null, action: 'filter' }
            )
          }
        }
        else {
          if (!oldValue.length) {
            memoizedExpandedKeys = mergedExpandedKeysRef.value
          }
          const { expandedKeys } = filteredTreeInfoRef.value
          if (expandedKeys !== undefined) {
            disableExpandAnimationForOneTick()
            doUpdateExpandedKeys(expandedKeys, getOptionsByKeys(expandedKeys), {
              node: null,
              action: 'filter'
            })
          }
        }
      }
    })
    async function triggerLoading(node: TmNode): Promise<void> {
      const { onLoad } = props
      if (!onLoad) {
        if (__DEV__) {
          warn(
            'tree',
            'There is unloaded node in data but props.onLoad is not specified.'
          )
        }
        await Promise.resolve()
        return
      }
      const { value: loadingKeys } = loadingKeysRef
      if (!loadingKeys.has(node.key)) {
        loadingKeys.add(node.key)
        try {
          const loadResult = await onLoad(node.rawNode)
          if (loadResult === false) {
            resetDragExpandState()
          }
        }
        catch (loadError) {
          console.error(loadError)
          resetDragExpandState()
        }
        loadingKeys.delete(node.key)
      }
    }
    watchEffect(() => {
      const { value: displayTreeMate } = displayTreeMateRef
      if (!displayTreeMate)
        return
      const { getNode } = displayTreeMate
      mergedExpandedKeysRef.value?.forEach((key) => {
        const node = getNode(key)
        if (node && !node.shallowLoaded) {
          void triggerLoading(node)
        }
      })
    })
    // animation in progress
    const aipRef = ref(false)
    // animation flattened nodes
    const afNodesRef = ref<Array<TmNode | MotionData>>([])
    // Note: Since the virtual list depends on min height, if there's a node
    // whose height starts from 0, the virtual list will have a wrong height
    // during animation. This will seldom cause wired scrollbar status. It is
    // fixable and need some changes in vueuc, I've no time so I just leave it
    // here. Maybe the bug won't be fixed during the life time of the project.
    watch(expandedNonLoadingKeysRef, (value, prevValue) => {
      if (!props.animated || expandAnimationDisabled) {
        void nextTick(syncScrollbar)
        return
      }
      if (isDataReset) {
        return
      }
      const nodeHeight = depx(themeRef.value.self.nodeHeight)
      const prevVSet = new Set(prevValue)
      let addedKey: Key | null = null
      let removedKey: Key | null = null
      for (const expandedKey of value) {
        if (!prevVSet.has(expandedKey)) {
          if (addedKey !== null)
            return // multi expand, not triggered by click
          addedKey = expandedKey
        }
      }
      const currentVSet = new Set(value)
      for (const expandedKey of prevValue) {
        if (!currentVSet.has(expandedKey)) {
          if (removedKey !== null)
            return // multi collapse, not triggered by click
          removedKey = expandedKey
        }
      }
      if (addedKey === null && removedKey === null) {
        // 1. multi action, not triggered by click
        // 2. no action, don't know what happened
        return
      }
      const { virtualScroll } = props
      const viewportHeight = (
        virtualScroll ? virtualListInstRef.value!.listElRef : selfElRef.value!
      ).offsetHeight
      const viewportItemCount = Math.ceil(viewportHeight / nodeHeight) + 1
      // play add animation
      let baseExpandedKeys: Key[] | undefined
      if (addedKey !== null) {
        baseExpandedKeys = prevValue
      }
      if (removedKey !== null) {
        if (baseExpandedKeys === undefined) {
          baseExpandedKeys = value
        }
        else {
          baseExpandedKeys = baseExpandedKeys.filter(
            key => key !== removedKey
          )
        }
      }
      aipRef.value = true
      afNodesRef.value
        = displayTreeMateRef.value.getFlattenedNodes(baseExpandedKeys)
      if (addedKey !== null) {
        const expandedNodeIndex = afNodesRef.value.findIndex(
          node => (node as any).key === addedKey
        )
        if (~expandedNodeIndex) {
          const children = (afNodesRef.value[expandedNodeIndex] as TmNode)
            .children
          // sometimes user will pass leaf keys in
          if (children) {
            const expandedChildren = flatten(children, value)
            afNodesRef.value.splice(expandedNodeIndex + 1, 0, {
              __motion: true,
              mode: 'expand',
              height: virtualScroll
                ? expandedChildren.length * nodeHeight
                : undefined,
              nodes: virtualScroll
                ? expandedChildren.slice(0, viewportItemCount)
                : expandedChildren
            })
          }
        }
      }
      if (removedKey !== null) {
        const collapsedNodeIndex = afNodesRef.value.findIndex(
          node => (node as any).key === removedKey
        )
        if (~collapsedNodeIndex) {
          const collapsedNodeChildren = (
            afNodesRef.value[collapsedNodeIndex] as TmNode
          ).children
          // Sometime the whole tree is change, remove a key doesn't mean it is collapsed,
          // but maybe children removed
          if (!collapsedNodeChildren)
            return
          // play remove animation
          aipRef.value = true
          const collapsedChildren = flatten(collapsedNodeChildren, value)
          afNodesRef.value.splice(collapsedNodeIndex + 1, 0, {
            __motion: true,
            mode: 'collapse',
            height: virtualScroll
              ? collapsedChildren.length * nodeHeight
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
      if (aipRef.value)
        return afNodesRef.value
      else return fNodesRef.value
    })

    function syncScrollbar(): void {
      const { value: scrollbarInst } = scrollbarInstRef
      if (scrollbarInst)
        scrollbarInst.sync()
    }

    function handleAfterEnter(): void {
      aipRef.value = false
      if (props.virtualScroll) {
        // If virtual scroll, we won't listen to resize during animation, so
        // resize callback of virtual list won't be called and as a result
        // scrollbar won't sync. We need to sync scrollbar manually.
        void nextTick(syncScrollbar)
      }
    }

    function getOptionsByKeys(keys: Key[]): Array<TreeOption | null> {
      const { getNode } = dataTreeMateRef.value
      return keys.map(key => getNode(key)?.rawNode || null)
    }

    function doUpdateExpandedKeys(
      value: Key[],
      option: Array<TreeOption | null>,
      meta:
        | {
          node: TreeOption
          action: 'expand' | 'collapse'
        }
        | {
          node: null
          action: 'filter'
        }
    ): void {
      const {
        'onUpdate:expandedKeys': _onUpdateExpandedKeys,
        onUpdateExpandedKeys
      } = props
      uncontrolledExpandedKeysRef.value = value
      if (_onUpdateExpandedKeys) {
        call(
          _onUpdateExpandedKeys as OnUpdateExpandedKeysImpl,
          value,
          option,
          meta
        )
      }
      if (onUpdateExpandedKeys) {
        call(
          onUpdateExpandedKeys as OnUpdateExpandedKeysImpl,
          value,
          option,
          meta
        )
      }
    }
    function doUpdateCheckedKeys(
      value: Key[],
      option: Array<TreeOption | null>,
      meta: {
        node: TreeOption | null
        action: 'check' | 'uncheck'
      }
    ): void {
      const {
        'onUpdate:checkedKeys': _onUpdateCheckedKeys,
        onUpdateCheckedKeys
      } = props
      uncontrolledCheckedKeysRef.value = value
      if (onUpdateCheckedKeys) {
        call(
          onUpdateCheckedKeys as OnUpdateCheckedKeysImpl,
          value,
          option,
          meta
        )
      }
      if (_onUpdateCheckedKeys) {
        call(
          _onUpdateCheckedKeys as OnUpdateCheckedKeysImpl,
          value,
          option,
          meta
        )
      }
    }
    function doUpdateIndeterminateKeys(
      value: Key[],
      option: Array<TreeOption | null>
    ): void {
      const {
        'onUpdate:indeterminateKeys': _onUpdateIndeterminateKeys,
        onUpdateIndeterminateKeys
      } = props
      if (_onUpdateIndeterminateKeys) {
        call(
          _onUpdateIndeterminateKeys as OnUpdateIndeterminateKeysImpl,
          value,
          option
        )
      }
      if (onUpdateIndeterminateKeys) {
        call(
          onUpdateIndeterminateKeys as OnUpdateIndeterminateKeysImpl,
          value,
          option
        )
      }
    }
    function doUpdateSelectedKeys(
      value: Key[],
      option: Array<TreeOption | null>,
      meta: {
        node: TreeOption
        action: 'select' | 'unselect'
      }
    ): void {
      const {
        'onUpdate:selectedKeys': _onUpdateSelectedKeys,
        onUpdateSelectedKeys
      } = props
      uncontrolledSelectedKeysRef.value = value
      if (onUpdateSelectedKeys) {
        call(
          onUpdateSelectedKeys as OnUpdateSelectedKeysImpl,
          value,
          option,
          meta
        )
      }
      if (_onUpdateSelectedKeys) {
        call(
          _onUpdateSelectedKeys as OnUpdateSelectedKeysImpl,
          value,
          option,
          meta
        )
      }
    }
    // Drag & Drop
    function doDragEnter(info: TreeDragInfo): void {
      const { onDragenter } = props
      if (onDragenter)
        call(onDragenter, info)
    }
    function doDragLeave(info: TreeDragInfo): void {
      const { onDragleave } = props
      if (onDragleave)
        call(onDragleave, info)
    }
    function doDragEnd(info: TreeDragInfo): void {
      const { onDragend } = props
      if (onDragend)
        call(onDragend, info)
    }
    function doDragStart(info: TreeDragInfo): void {
      const { onDragstart } = props
      if (onDragstart)
        call(onDragstart, info)
    }
    function doDragOver(info: TreeDragInfo): void {
      const { onDragover } = props
      if (onDragover)
        call(onDragover, info)
    }
    function doDrop(info: TreeDropInfo): void {
      const { onDrop } = props
      if (onDrop)
        call(onDrop, info)
    }
    function resetDndState(): void {
      resetDragState()
      resetDropState()
    }
    function resetDragState(): void {
      draggingNodeRef.value = null
    }
    function resetDropState(): void {
      droppingOffsetLevelRef.value = 0
      droppingNodeRef.value = null
      droppingMouseNodeRef.value = null
      droppingPositionRef.value = null
      resetDragExpandState()
    }
    function resetDragExpandState(): void {
      if (expandTimerId) {
        window.clearTimeout(expandTimerId)
        expandTimerId = null
      }
      nodeKeyToBeExpanded = null
    }
    function handleCheck(node: TmNode, checked: boolean): void {
      // We don't guard for leaf only since we have done it in view layer
      if (props.disabled || isNodeDisabled(node, props.disabledField)) {
        return
      }
      if (props.internalUnifySelectCheck && !props.multiple) {
        handleSelect(node)
        return
      }
      const checkedAction = checked ? 'check' : 'uncheck'
      const { checkedKeys, indeterminateKeys } = dataTreeMateRef.value[
        checkedAction
      ](node.key, displayedCheckedKeysRef.value, {
        cascade: props.cascade,
        checkStrategy: mergedCheckStrategyRef.value,
        allowNotLoaded: props.allowCheckingNotLoaded
      })
      doUpdateCheckedKeys(checkedKeys, getOptionsByKeys(checkedKeys), {
        node: node.rawNode,
        action: checkedAction
      })
      doUpdateIndeterminateKeys(
        indeterminateKeys,
        getOptionsByKeys(indeterminateKeys)
      )
    }
    function toggleExpand(node: TmNode): void {
      if (props.disabled)
        return
      const { key } = node
      const { value: mergedExpandedKeys } = mergedExpandedKeysRef
      const index = mergedExpandedKeys.findIndex(
        expandNodeId => expandNodeId === key
      )
      if (~index) {
        const expandedKeysAfterChange = Array.from(mergedExpandedKeys)
        expandedKeysAfterChange.splice(index, 1)
        doUpdateExpandedKeys(
          expandedKeysAfterChange,
          getOptionsByKeys(expandedKeysAfterChange),
          {
            node: node.rawNode,
            action: 'collapse'
          }
        )
      }
      else {
        const nodeToBeExpanded = displayTreeMateRef.value.getNode(key)
        if (!nodeToBeExpanded || nodeToBeExpanded.isLeaf) {
          return
        }
        let nextKeys: Key[]
        if (props.accordion) {
          const siblingKeySet = new Set<Key>(
            node.siblings.map(({ key }) => key)
          )
          nextKeys = mergedExpandedKeys.filter((expandedKey) => {
            return !siblingKeySet.has(expandedKey)
          })
          nextKeys.push(key)
        }
        else {
          nextKeys = mergedExpandedKeys.concat(key)
        }
        doUpdateExpandedKeys(nextKeys, getOptionsByKeys(nextKeys), {
          node: node.rawNode,
          action: 'expand'
        })
      }
    }
    function handleSwitcherClick(node: TmNode): void {
      if (props.disabled || aipRef.value)
        return
      toggleExpand(node)
    }
    function handleSelect(node: TmNode): void {
      if (props.disabled || !props.selectable) {
        return
      }
      pendingNodeKeyRef.value = node.key
      if (props.internalUnifySelectCheck) {
        const {
          value: { checkedKeys, indeterminateKeys }
        } = checkedStatusRef
        if (props.multiple) {
          handleCheck(
            node,
            !(
              checkedKeys.includes(node.key)
              || indeterminateKeys.includes(node.key)
            )
          )
        }
        else {
          doUpdateCheckedKeys([node.key], getOptionsByKeys([node.key]), {
            node: node.rawNode,
            action: 'check'
          })
        }
      }
      if (props.multiple) {
        const selectedKeys = Array.from(mergedSelectedKeysRef.value)
        const index = selectedKeys.findIndex(key => key === node.key)
        if (~index) {
          if (props.cancelable) {
            selectedKeys.splice(index, 1)
          }
        }
        else if (!~index) {
          selectedKeys.push(node.key)
        }
        doUpdateSelectedKeys(selectedKeys, getOptionsByKeys(selectedKeys), {
          node: node.rawNode,
          action: ~index ? 'unselect' : 'select'
        })
      }
      else {
        const selectedKeys = mergedSelectedKeysRef.value
        if (selectedKeys.includes(node.key)) {
          if (props.cancelable) {
            doUpdateSelectedKeys([], [], {
              node: node.rawNode,
              action: 'unselect'
            })
          }
        }
        else {
          doUpdateSelectedKeys([node.key], getOptionsByKeys([node.key]), {
            node: node.rawNode,
            action: 'select'
          })
        }
      }
    }

    function expandDragEnterNode(node: TmNode): void {
      if (expandTimerId) {
        window.clearTimeout(expandTimerId)
        expandTimerId = null
      }
      // Don't expand leaf node.
      if (node.isLeaf)
        return
      nodeKeyToBeExpanded = node.key
      const expand = (): void => {
        if (nodeKeyToBeExpanded !== node.key)
          return
        const { value: droppingMouseNode } = droppingMouseNodeRef
        if (
          droppingMouseNode
          && droppingMouseNode.key === node.key
          && !mergedExpandedKeysRef.value.includes(node.key)
        ) {
          const nextKeys = mergedExpandedKeysRef.value.concat(node.key)
          doUpdateExpandedKeys(nextKeys, getOptionsByKeys(nextKeys), {
            node: node.rawNode,
            action: 'expand'
          })
        }
        expandTimerId = null
        nodeKeyToBeExpanded = null
      }
      if (!node.shallowLoaded) {
        expandTimerId = window.setTimeout(() => {
          void triggerLoading(node).then(() => {
            expand()
          })
        }, 1000)
      }
      else {
        expandTimerId = window.setTimeout(() => {
          expand()
        }, 1000)
      }
    }

    // Dnd
    function handleDragEnter({ event, node }: InternalDragInfo): void {
      // node should be a tmNode
      if (
        !props.draggable
        || props.disabled
        || isNodeDisabled(node, props.disabledField)
      ) {
        return
      }
      handleDragOver({ event, node }, false)
      doDragEnter({ event, node: node.rawNode })
    }
    function handleDragLeave({ event, node }: InternalDragInfo): void {
      if (
        !props.draggable
        || props.disabled
        || isNodeDisabled(node, props.disabledField)
      ) {
        return
      }
      doDragLeave({ event, node: node.rawNode })
    }
    function handleDragLeaveTree(e: DragEvent): void {
      if (e.target !== e.currentTarget)
        return
      resetDropState()
    }
    // Dragend is ok, we don't need to add global listener to reset drag status
    function handleDragEnd({ event, node }: InternalDragInfo): void {
      resetDndState()
      if (
        !props.draggable
        || props.disabled
        || isNodeDisabled(node, props.disabledField)
      ) {
        return
      }
      doDragEnd({ event, node: node.rawNode })
    }
    function handleDragStart({ event, node }: InternalDragInfo): void {
      if (
        !props.draggable
        || props.disabled
        || isNodeDisabled(node, props.disabledField)
      ) {
        return
      }
      // Most of time, the image will block user's view
      if (emptyImage) {
        event.dataTransfer?.setDragImage(emptyImage, 0, 0)
      }
      dragStartX = event.clientX
      draggingNodeRef.value = node
      doDragStart({ event, node: node.rawNode })
    }
    function handleDragOver(
      { event, node }: InternalDragInfo,
      emit: boolean = true
    ): void {
      if (
        !props.draggable
        || props.disabled
        || isNodeDisabled(node, props.disabledField)
      ) {
        return
      }
      const { value: draggingNode } = draggingNodeRef
      if (!draggingNode)
        return
      const { allowDrop, indent } = props
      if (emit)
        doDragOver({ event, node: node.rawNode })
      // Update dropping node
      const el = event.currentTarget as HTMLElement
      const { height: elOffsetHeight, top: elClientTop }
        = el.getBoundingClientRect()
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
        }
        else if (eventOffsetY >= elOffsetHeight - 8) {
          mousePosition = 'after'
        }
        else {
          mousePosition = 'inside'
        }
      }
      else {
        if (eventOffsetY <= elOffsetHeight / 2) {
          mousePosition = 'before'
        }
        else {
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
      }
      else {
        if (mousePosition === 'before') {
          if (node.isFirstChild) {
            finalDropNode = node
            finalDropPosition = 'before'
          }
          else {
            finalDropNode = fNodesRef.value[hoverNodeFIndex - 1]
            finalDropPosition = 'after'
          }
        }
        else {
          finalDropNode = node
          finalDropPosition = 'after'
        }
      }

      // If the node is non-leaf and it is expanded, we don't allow it to
      // drop after it and change it to drop before its next view sibling
      if (
        !finalDropNode.isLeaf
        && mergedExpandedKeysRef.value.includes(finalDropNode.key)
      ) {
        mouseAtExpandedNonLeafNode = true
        if (finalDropPosition === 'after') {
          finalDropNode = fNodesRef.value[hoverNodeFIndex + 1]
          if (!finalDropNode) {
            // maybe there is no next view sibling when non-leaf node has no
            // children and it is the last node in the tree
            finalDropNode = node
            finalDropPosition = 'inside'
          }
          else {
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
        !mouseAtExpandedNonLeafNode
        && draggingNode.isLastChild
        && draggingNode.key === finalDropNode.key
      ) {
        finalDropPosition = 'after'
      }

      if (finalDropPosition === 'after') {
        let offset = dragStartX - event.clientX // drag left => > 0
        let offsetLevel = 0
        while (
          offset >= indent / 2 // divide by 2 to make it easier to trigger
          && finalDropNode.parent !== null
          && finalDropNode.isLastChild
          && offsetLevel < 1
        ) {
          offset -= indent
          offsetLevel += 1
          finalDropNode = finalDropNode.parent
        }
        droppingOffsetLevelRef.value = offsetLevel
      }
      else {
        droppingOffsetLevelRef.value = 0
      }

      // Bailout 1
      // Drag self into self
      // Drag it into direct parent
      if (
        draggingNode.contains(finalDropNode)
        || (finalDropPosition === 'inside'
          && draggingNode.parent?.key === finalDropNode.key)
      ) {
        if (
          draggingNode.key === droppingMouseNode.key
          && draggingNode.key === finalDropNode.key
        ) {
          // This is special case that we want ui to show a mark to guide user
          // to start dragging. Nor they will think nothing happens.
          // However this is an invalid drop, we need to guard it inside
          // handleDrop
        }
        else {
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
      }
      else {
        if (nodeKeyToBeExpanded !== finalDropNode.key) {
          if (finalDropPosition === 'inside') {
            if (props.expandOnDragenter) {
              expandDragEnterNode(finalDropNode)
              // Bailout 4
              // not try to loading
              if (
                !finalDropNode.shallowLoaded
                && nodeKeyToBeExpanded !== finalDropNode.key
              ) {
                resetDndState()
                return
              }
            }
            else {
              // Bailout 5
              // never expands on drag
              if (!finalDropNode.shallowLoaded) {
                resetDndState()
                return
              }
            }
          }
          else {
            resetDragExpandState()
          }
        }
        else {
          if (finalDropPosition !== 'inside') {
            resetDragExpandState()
          }
        }
      }
      droppingPositionRef.value = finalDropPosition
      droppingNodeRef.value = finalDropNode
    }
    function handleDrop({ event, node, dropPosition }: InternalDropInfo): void {
      if (
        !props.draggable
        || props.disabled
        || isNodeDisabled(node, props.disabledField)
      ) {
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
    function handleScroll(): void {
      syncScrollbar()
    }
    function handleResize(): void {
      syncScrollbar()
    }
    function handleFocusout(e: FocusEvent): void {
      if (props.virtualScroll || props.internalScrollable) {
        const { value: scrollbarInst } = scrollbarInstRef
        if (scrollbarInst?.containerRef?.contains(e.relatedTarget as Element)) {
          return
        }
        pendingNodeKeyRef.value = null
      }
      else {
        const { value: selfEl } = selfElRef
        if (selfEl?.contains(e.relatedTarget as Element))
          return
        pendingNodeKeyRef.value = null
      }
    }
    watch(pendingNodeKeyRef, (value) => {
      if (value === null)
        return
      if (props.virtualScroll) {
        virtualListInstRef.value?.scrollTo({ key: value })
      }
      else if (props.internalScrollable) {
        const { value: scrollbarInst } = scrollbarInstRef
        if (scrollbarInst === null)
          return
        const targetEl = scrollbarInst.contentRef?.querySelector(
          `[data-key="${createDataKey(value)}"]`
        )
        if (!targetEl)
          return
        scrollbarInst.scrollTo({
          el: targetEl as any
        })
      }
    })
    provide(treeInjectionKey, {
      loadingKeysRef,
      highlightKeySetRef: mergedHighlightKeySetRef,
      displayedCheckedKeysRef,
      displayedIndeterminateKeysRef,
      mergedSelectedKeysRef,
      mergedExpandedKeysRef,
      mergedThemeRef: themeRef,
      mergedCheckStrategyRef,
      nodePropsRef: toRef(props, 'nodeProps'),
      disabledRef: toRef(props, 'disabled'),
      checkableRef: toRef(props, 'checkable'),
      selectableRef: toRef(props, 'selectable'),
      expandOnClickRef: toRef(props, 'expandOnClick'),
      onLoadRef: toRef(props, 'onLoad'),
      draggableRef: toRef(props, 'draggable'),
      blockLineRef: toRef(props, 'blockLine'),
      indentRef: toRef(props, 'indent'),
      cascadeRef: toRef(props, 'cascade'),
      checkOnClickRef: toRef(props, 'checkOnClick'),
      checkboxPlacementRef: props.checkboxPlacement,
      droppingMouseNodeRef,
      droppingNodeParentRef,
      draggingNodeRef,
      droppingPositionRef,
      droppingOffsetLevelRef,
      fNodesRef,
      pendingNodeKeyRef,
      showLineRef: toRef(props, 'showLine'),
      disabledFieldRef: toRef(props, 'disabledField'),
      internalScrollableRef: toRef(props, 'internalScrollable'),
      internalCheckboxFocusableRef: toRef(props, 'internalCheckboxFocusable'),
      internalTreeSelect: props.internalTreeSelect,
      renderLabelRef: toRef(props, 'renderLabel'),
      renderPrefixRef: toRef(props, 'renderPrefix'),
      renderSuffixRef: toRef(props, 'renderSuffix'),
      renderSwitcherIconRef: toRef(props, 'renderSwitcherIcon'),
      labelFieldRef: toRef(props, 'labelField'),
      multipleRef: toRef(props, 'multiple'),
      overrideDefaultNodeClickBehaviorRef: toRef(
        props,
        'overrideDefaultNodeClickBehavior'
      ),
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
    function scrollTo(
      options: VirtualListScrollToOptions | number,
      y?: number
    ): void {
      if (typeof options === 'number') {
        virtualListInstRef.value?.scrollTo(options, y || 0)
      }
      else {
        virtualListInstRef.value?.scrollTo(options)
      }
    }
    const exposedMethods: InternalTreeInst & TreeInst = {
      handleKeydown,
      scrollTo,
      getCheckedData: () => {
        if (!props.checkable)
          return { keys: [], options: [] }
        const { checkedKeys } = checkedStatusRef.value
        return {
          keys: checkedKeys,
          options: getOptionsByKeys(checkedKeys)
        }
      },
      getIndeterminateData: () => {
        if (!props.checkable)
          return { keys: [], options: [] }
        const { indeterminateKeys } = checkedStatusRef.value
        return {
          keys: indeterminateKeys,
          options: getOptionsByKeys(indeterminateKeys)
        }
      }
    }
    const cssVarsRef = computed(() => {
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
          dropMarkColor,
          nodeWrapperPadding,
          nodeHeight,
          lineHeight,
          lineColor
        }
      } = themeRef.value
      const lineOffsetTop = getPadding(nodeWrapperPadding, 'top')
      const lineOffsetBottom = getPadding(nodeWrapperPadding, 'bottom')
      const nodeContentHeight = pxfy(
        depx(nodeHeight) - depx(lineOffsetTop) - depx(lineOffsetBottom)
      )
      return {
        '--n-arrow-color': arrowColor,
        '--n-loading-color': loadingColor,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-node-border-radius': nodeBorderRadius,
        '--n-node-color-active': nodeColorActive,
        '--n-node-color-hover': nodeColorHover,
        '--n-node-color-pressed': nodeColorPressed,
        '--n-node-text-color': nodeTextColor,
        '--n-node-text-color-disabled': nodeTextColorDisabled,
        '--n-drop-mark-color': dropMarkColor,
        '--n-node-wrapper-padding': nodeWrapperPadding,
        '--n-line-offset-top': `-${lineOffsetTop}`,
        '--n-line-offset-bottom': `-${lineOffsetBottom}`,
        '--n-node-content-height': nodeContentHeight,
        '--n-line-height': lineHeight,
        '--n-line-color': lineColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('tree', undefined, cssVarsRef, props)
      : undefined
    return {
      ...exposedMethods,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      rtlEnabled: rtlEnabledRef,
      fNodes: mergedFNodesRef,
      aip: aipRef,
      selfElRef,
      virtualListInstRef,
      scrollbarInstRef,
      handleFocusout,
      handleDragLeaveTree,
      handleScroll,
      getScrollContainer,
      getScrollContent,
      handleAfterEnter,
      handleResize,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { fNodes, internalRenderEmpty } = this
    if (!fNodes.length && internalRenderEmpty) {
      return internalRenderEmpty()
    }
    const {
      mergedClsPrefix,
      blockNode,
      blockLine,
      draggable,
      disabled,
      internalFocusable,
      checkable,
      handleKeydown,
      rtlEnabled,
      handleFocusout,
      scrollbarProps
    } = this
    const mergedFocusable = internalFocusable && !disabled
    const tabindex = mergedFocusable ? '0' : undefined
    const treeClass: Array<string | boolean | undefined> = [
      `${mergedClsPrefix}-tree`,
      rtlEnabled && `${mergedClsPrefix}-tree--rtl`,
      checkable && `${mergedClsPrefix}-tree--checkable`,
      (blockLine || blockNode) && `${mergedClsPrefix}-tree--block-node`,
      blockLine && `${mergedClsPrefix}-tree--block-line`
    ]
    const createNode = (tmNode: TmNode | MotionData): VNode => {
      return '__motion' in tmNode ? (
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
    }
    if (this.virtualScroll) {
      const { mergedTheme, internalScrollablePadding } = this
      const padding = getPadding(internalScrollablePadding || '0')
      return (
        <NxScrollbar
          {...scrollbarProps}
          ref="scrollbarInstRef"
          onDragleave={draggable ? this.handleDragLeaveTree : undefined}
          container={this.getScrollContainer}
          content={this.getScrollContent}
          class={treeClass}
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
          tabindex={tabindex}
          onKeydown={mergedFocusable ? handleKeydown : undefined}
          onFocusout={mergedFocusable ? handleFocusout : undefined}
        >
          {{
            default: () => {
              this.onRender?.()
              return !fNodes.length ? (
                resolveSlot(this.$slots.empty, () => [
                  <NEmpty
                    class={`${mergedClsPrefix}-tree__empty`}
                    theme={this.mergedTheme.peers.Empty}
                    themeOverrides={this.mergedTheme.peerOverrides.Empty}
                  />
                ])
              ) : (
                <VVirtualList
                  ref="virtualListInstRef"
                  items={this.fNodes}
                  itemSize={depx(mergedTheme.self.nodeHeight)}
                  ignoreItemResize={this.aip}
                  paddingTop={padding.top}
                  paddingBottom={padding.bottom}
                  class={this.themeClass}
                  style={[
                    this.cssVars as CSSProperties,
                    {
                      paddingLeft: padding.left,
                      paddingRight: padding.right
                    }
                  ]}
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
            }
          }}
        </NxScrollbar>
      )
    }
    const { internalScrollable } = this
    treeClass.push(this.themeClass)
    this.onRender?.()
    if (internalScrollable) {
      return (
        <NxScrollbar
          {...scrollbarProps}
          class={treeClass}
          tabindex={tabindex}
          onKeydown={mergedFocusable ? handleKeydown : undefined}
          onFocusout={mergedFocusable ? handleFocusout : undefined}
          style={this.cssVars as CSSProperties}
          contentStyle={{ padding: this.internalScrollablePadding }}
        >
          {{
            default: () => (
              <div
                onDragleave={draggable ? this.handleDragLeaveTree : undefined}
                ref="selfElRef"
              >
                {this.fNodes.map(createNode)}
              </div>
            )
          }}
        </NxScrollbar>
      )
    }
    else {
      return (
        <div
          class={treeClass}
          tabindex={tabindex}
          ref="selfElRef"
          style={this.cssVars as CSSProperties}
          onKeydown={mergedFocusable ? handleKeydown : undefined}
          onFocusout={mergedFocusable ? handleFocusout : undefined}
          onDragleave={draggable ? this.handleDragLeaveTree : undefined}
        >
          {!fNodes.length
            ? resolveSlot(this.$slots.empty, () => [
              <NEmpty
                class={`${mergedClsPrefix}-tree__empty`}
                theme={this.mergedTheme.peers.Empty}
                themeOverrides={this.mergedTheme.peerOverrides.Empty}
              />
            ])
            : fNodes.map(createNode)}
        </div>
      )
    }
  }
})
