import {
  defineComponent,
  h,
  computed,
  ref,
  toRef,
  PropType,
  watch,
  provide,
  reactive
} from 'vue'
import { RawNode, TreeMate } from 'treemate'
import {
  useMergedState,
  // useFalseUntilTruthy,
  useKeyboard,
  useMemo
} from 'vooks'
import { useTheme } from '../../_mixins'
import { NPopover, popoverProps } from '../../popover'
import { keep, call, createKey } from '../../_utils'
import { dropdownLight } from '../styles'
import type { DropdownThemeVars } from '../styles'
import NDropdownMenu from './DropdownMenu'
import style from './styles/index.cssr'

type Key = string | number
type OnSelect = (key: Key, rawNode: RawNode) => void

const treemateOptions = {
  getKey (node: RawNode) {
    return node.key as Key
  },
  getDisabled (node: RawNode) {
    if (node.type === 'divider') return true
    return node.disabled === true
  }
}

export interface DropdownInjection {
  hoverKey: Key | null
  keyboardKey: Key | null
  lastToggledSubmenuKey: Key | null
  pendingKeyPath: Key[]
  activeKeyPath: Key[]
  animated: boolean
  mergedShow: boolean
  doSelect: OnSelect
  doUpdateShow: (value: boolean) => void
}

const dropdownProps = {
  animated: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  submenuWidth: {
    type: Number,
    default: null
  },
  submenuMinWidth: {
    type: Number,
    default: null
  },
  onSelect: {
    type: [Function, Array] as PropType<OnSelect | OnSelect[]>,
    default: undefined
  },
  options: {
    type: Array as PropType<RawNode[]>,
    required: true
  },
  containerClass: {
    type: String,
    default: 'n-dropdown'
  },
  // for menu
  value: {
    type: String,
    default: undefined
  }
} as const

const popoverPropKeys = Object.keys(
  popoverProps
) as (keyof typeof popoverProps)[]

export default defineComponent({
  name: 'Dropdown',
  props: {
    ...popoverProps,
    ...dropdownProps
  },
  setup (props) {
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    // const dataNeededRef = useFalseUntilTruthy(mergedShowRef)
    const treemateRef = computed(() => {
      return TreeMate(props.options, treemateOptions)
    })
    const tmNodesRef = computed(() => {
      return treemateRef.value.treeNodes
    })
    const tmNodeMapRef = computed(() => {
      return treemateRef.value.treeNodeMap
    })

    const hoverKeyRef = ref<Key | null>(null)
    const keyboardKeyRef = ref<Key | null>(null)
    const lastToggledSubmenuKeyRef = ref<Key | null>(null)
    const pendingKeyRef = computed(() => {
      return (
        hoverKeyRef.value ??
        keyboardKeyRef.value ??
        lastToggledSubmenuKeyRef.value ??
        null
      )
    })

    const pendingKeyPathRef = computed(
      () => treemateRef.value.getPath(pendingKeyRef.value).keyPath
    )

    const activeKeyPathRef = computed(
      () => treemateRef.value.getPath(props.value).keyPath
    )

    const keyboardEnabledRef = useMemo(() => {
      return props.keyboard && mergedShowRef.value
    })

    useKeyboard(
      {
        keydown: {
          ArrowUp: {
            prevent: true,
            handler: handleKeyDownUp
          },
          ArrowRight: {
            prevent: true,
            handler: handleKeyDownRight
          },
          ArrowDown: {
            prevent: true,
            handler: handleKeyDownDown
          },
          ArrowLeft: {
            prevent: true,
            handler: handleKeyDownLeft
          },
          Escape: handleKeyDownEsc
        },
        keyup: {
          Enter: handleKeyUpEnter
        }
      },
      keyboardEnabledRef
    )

    const themeRef = useTheme<DropdownThemeVars>(
      'Dropdown',
      'Dropdown',
      style,
      dropdownLight,
      props
    )

    provide<DropdownInjection>(
      'NDropdown',
      reactive({
        hoverKey: hoverKeyRef,
        keyboardKey: keyboardKeyRef,
        lastToggledSubmenuKey: lastToggledSubmenuKeyRef,
        pendingKeyPath: pendingKeyPathRef,
        activeKeyPath: activeKeyPathRef,
        animated: toRef(props, 'animated'),
        mergedShow: mergedShowRef,
        doSelect,
        doUpdateShow
      })
    )
    // watch
    watch(mergedShowRef, (value) => {
      if (!value) clearPendingState()
    })
    // methods
    function doSelect (key: Key, node: RawNode) {
      const { onSelect } = props
      if (onSelect) call(onSelect, key, node)
    }
    function doUpdateShow (value: boolean) {
      const { 'onUpdate:show': onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      uncontrolledShowRef.value = value
    }
    function clearPendingState () {
      hoverKeyRef.value = null
      keyboardKeyRef.value = null
      lastToggledSubmenuKeyRef.value = null
    }
    function handleKeyDownEsc () {
      doUpdateShow(false)
    }
    function handleKeyDownLeft () {
      handleKeyDown('left')
    }
    function handleKeyDownRight () {
      handleKeyDown('right')
    }
    function handleKeyDownUp () {
      handleKeyDown('up')
    }
    function handleKeyDownDown () {
      handleKeyDown('down')
    }
    function handleKeyUpEnter () {
      const pendingNode = getPendingNode()
      if (pendingNode && pendingNode.isLeaf) {
        doSelect(pendingNode.key, pendingNode.rawNode)
        doUpdateShow(false)
      }
    }
    function getPendingNode () {
      const { value: tmNodeMap } = tmNodeMapRef
      const { value: pendingKey } = pendingKeyRef
      if (!tmNodeMap || pendingKey === null) return null
      return tmNodeMap.get(pendingKey) ?? null
    }
    function handleKeyDown (direction: 'up' | 'right' | 'down' | 'left') {
      const { value: pendingKey } = pendingKeyRef
      const {
        value: { getFirstAvailableNode }
      } = treemateRef
      let nextKeyboardKey = null
      if (pendingKey === null) {
        const firstNode = getFirstAvailableNode()
        if (firstNode !== null) {
          nextKeyboardKey = firstNode.key
        }
      } else {
        const currentNode = getPendingNode()
        if (currentNode) {
          let nextNode
          switch (direction) {
            case 'down':
              nextNode = currentNode.getNext()
              break
            case 'up':
              nextNode = currentNode.getPrev()
              break
            case 'right':
              nextNode = currentNode.getChild()
              break
            case 'left':
              nextNode = currentNode.getParent()
              break
          }
          if (nextNode) nextKeyboardKey = nextNode.key
        }
      }
      if (nextKeyboardKey !== null) {
        hoverKeyRef.value = null
        keyboardKeyRef.value = nextKeyboardKey
      }
    }
    return {
      // data
      tmNodes: tmNodesRef,
      // show
      mergedShow: mergedShowRef,
      // methods
      doUpdateShow,
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            padding,
            color,
            dividerColor,
            borderRadius,
            boxShadow,
            suffixColor,
            prefixColor,
            optionColorHover,
            optionTextColor,
            optionTextColorActive,
            groupHeaderTextColor,
            [createKey('optionIconSuffixWidth', size)]: optionIconSuffixWidth,
            [createKey('optionSuffixWidth', size)]: optionSuffixWidth,
            [createKey('optionIconPrefixWidth', size)]: optionIconPrefixWidth,
            [createKey('optionPrefixWidth', size)]: optionPrefixWidth,
            [createKey('fontSize', size)]: fontSize,
            [createKey('optionHeight', size)]: optionHeight,
            [createKey('optionIconSize', size)]: optionIconSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--option-color-hover': optionColorHover,
          '--divider-color': dividerColor,
          '--color': color,
          '--padding': padding,
          '--border-radius': borderRadius,
          '--box-shadow': boxShadow,
          '--option-height': optionHeight,
          '--option-prefix-width': optionPrefixWidth,
          '--option-icon-prefix-width': optionIconPrefixWidth,
          '--option-suffix-width': optionSuffixWidth,
          '--option-icon-suffix-width': optionIconSuffixWidth,
          '--option-text-color': optionTextColor,
          '--option-text-color-active': optionTextColorActive,
          '--prefix-color': prefixColor,
          '--suffix-color': suffixColor,
          '--group-header-text-color': groupHeaderTextColor,
          '--option-icon-size': optionIconSize
        }
      })
    }
  },
  render () {
    return h(
      NPopover,
      keep(this.$props, popoverPropKeys, {
        show: this.mergedShow,
        'onUpdate:show': this.doUpdateShow,
        showArrow: false,
        raw: true,
        shadow: false
      }),
      {
        trigger: this.$slots.default,
        default: () => {
          return h(NDropdownMenu, {
            tmNodes: this.tmNodes,
            style: this.cssVars
          })
        }
      }
    )
  }
})
