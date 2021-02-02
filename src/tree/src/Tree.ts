import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  provide,
  PropType,
  watch,
  reactive
} from 'vue'
import { createTreeMate } from 'treemate'
import { useMergedState } from 'vooks'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, MaybeArray, warn } from '../../_utils'
import { treeLight } from '../styles'
import type { TreeTheme } from '../styles'
import NTreeOption from './TreeNode'
import { keysWithFilter } from './utils'
import style from './styles/index.cssr'
import type {
  DragInfo,
  DropInfo,
  TreeInjection,
  TreeOptions,
  Key,
  TreeOption,
  TmNode,
  InternalDragInfo,
  InternalDropInfo
} from './interface'

export default defineComponent({
  name: 'Tree',
  props: {
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
      type: Function as PropType<
      (pattern: string, node: TreeOption) => boolean
      >,
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
    onDragEnter: [Function, Array] as PropType<
    MaybeArray<(e: DragInfo) => void>
    >,
    onDragLeave: [Function, Array] as PropType<
    MaybeArray<(e: DragInfo) => void>
    >,
    onDragEnd: [Function, Array] as PropType<MaybeArray<(e: DragInfo) => void>>,
    onDragStart: [Function, Array] as PropType<
    MaybeArray<(e: DragInfo) => void>
    >,
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
  },
  setup (props) {
    const themeRef = useTheme('Tree', 'Tree', style, treeLight, props)
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
      const { onDragEnter } = props
      if (onDragEnter) call(onDragEnter, info)
    }
    function doDragLeave (info: DragInfo): void {
      const { onDragLeave } = props
      if (onDragLeave) call(onDragLeave, info)
    }
    function doDragEnd (info: DragInfo): void {
      const { onDragEnd } = props
      if (onDragEnd) call(onDragEnd, info)
    }
    function doDragStart (info: DragInfo): void {
      const { onDragStart } = props
      if (onDragStart) call(onDragStart, info)
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
      if (props.disabled || node.disabled) return
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
    provide<TreeInjection>(
      'NTree',
      reactive({
        loadingKeys: loadingKeysRef,
        highlightKeys: highlightKeysRef,
        displayedCheckedKeys: displayedCheckedKeysRef,
        displayedIndeterminateKeys: displayedIndeterminateKeysRef,
        mergedSelectedKeys: mergedSelectedKeysRef,
        mergedExpandedKeys: mergedExpandedKeysRef,
        remote: toRef(props, 'remote'),
        onLoad: toRef(props, 'onLoad'),
        draggable: toRef(props, 'draggable'),
        checkable: toRef(props, 'checkable'),
        blockNode: toRef(props, 'blockNode'),
        handleSwitcherClick,
        handleDragEnd,
        handleDragEnter,
        handleDragLeave,
        handleDragStart,
        handleDrop,
        handleSelect,
        handleCheck,
        mergedTheme: themeRef
      })
    )
    return {
      tmNodes: computed(() => treeMateRef.value.treeNodes),
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
    return h(
      'div',
      {
        class: 'n-tree',
        style: this.cssVars
      },
      this.tmNodes.map((tmNode) =>
        h(NTreeOption, {
          tmNode,
          key: tmNode.key
        })
      )
    )
  }
})
