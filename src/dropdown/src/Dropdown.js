import {
  defineComponent,
  h,
  computed,
  ref,
  toRef,
  getCurrentInstance
} from 'vue'
import { TreeMate } from 'treemate'
import {
  useMergedState,
  useFalseUntilTruthy,
  useKeyboard,
  useMemo
} from 'vooks'
import { useTheme } from '../../_mixins'
import { NPopover } from '../../popover'
import { keep, call, createKey } from '../../_utils'
import { dropdownLight } from '../styles'
import NDropdownMenu from './DropdownMenu.js'
import style from './styles/index.cssr.js'

const treemateOptions = {
  getKey (node) {
    return node.key
  },
  getDisabled (node) {
    if (node.type === 'divider') return true
    return node.disabled === true
  }
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
    validator (value) {
      return ['small', 'medium', 'large', 'huge'].includes(value)
    },
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
    type: [Function, Array],
    default: undefined
  },
  options: {
    type: Array,
    required: true
  },
  containerClass: {
    type: String,
    default: 'n-dropdown'
  }
}

const popoverPropKeys = Object.keys(NPopover.props)

export default defineComponent({
  name: 'Dropdown',
  provide () {
    return {
      NDropdown: this
    }
  },
  props: {
    ...useTheme.props,
    ...NPopover.props,
    ...dropdownProps
  },
  setup (props) {
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    const dataNeededRef = useFalseUntilTruthy(mergedShowRef)

    const treemateRef = computed(() => {
      if (dataNeededRef.value) return TreeMate(props.options, treemateOptions)
      return null
    })
    const tmNodesRef = computed(() => {
      if (dataNeededRef.value) return treemateRef.value.treeNodes
      return null
    })
    const tmNodeMap = computed(() => {
      if (dataNeededRef.value) return treemateRef.value.treeNodeMap
      return null
    })
    const getPathRef = computed(() => {
      if (dataNeededRef.value) return treemateRef.value.getPath
      return null
    })
    const getFirstAvailableNodeRef = computed(() => {
      if (dataNeededRef.value) return treemateRef.value.getFirstAvailableNode
      return null
    })

    const hoverKeyRef = ref(null)
    const keyboardKeyRef = ref(null)
    const lastToggledSubmenuKeyRef = ref(null)
    const pendingKeyRef = computed(() => {
      return (
        hoverKeyRef.value ??
        keyboardKeyRef.value ??
        lastToggledSubmenuKeyRef.value ??
        null
      )
    })
    const activeKeyPathRef = computed(
      () => getPathRef.value(pendingKeyRef.value).keyPath
    )

    const keyboardEnabledRef = useMemo(() => {
      return props.keyboard && mergedShowRef.value
    })

    const vm = getCurrentInstance().proxy
    useKeyboard(
      {
        keydown: {
          ArrowUp: {
            prevent: true,
            handler: () => vm.handleKeyDownUp()
          },
          ArrowRight: {
            prevent: true,
            handler: () => vm.handleKeyDownRight()
          },
          ArrowDown: {
            prevent: true,
            handler: () => vm.handleKeyDownDown()
          },
          ArrowLeft: {
            prevent: true,
            handler: () => vm.handleKeyDownLeft()
          },
          Escape: () => vm.handleKeyDownEsc()
        },
        keyup: {
          Enter: () => vm.handleKeyUpEnter()
        }
      },
      keyboardEnabledRef
    )

    const themeRef = useTheme(
      'Dropdown',
      'Dropdown',
      style,
      dropdownLight,
      props
    )
    return {
      // data
      tm: treemateRef,
      tmNodes: tmNodesRef,
      tmNodeMap: tmNodeMap,
      // pending state
      activeKeyPath: activeKeyPathRef,
      hoverKey: hoverKeyRef,
      keyboardKey: keyboardKeyRef,
      lastToggledSubmenuKey: lastToggledSubmenuKeyRef,
      pendingKey: pendingKeyRef,
      keyboardHandlerRegistered: ref(false),
      // show
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      // methods
      getPath: getPathRef,
      getFirstAvailableNode: getFirstAvailableNodeRef,
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
            groupHeaderTextColor,
            [createKey('optionIconSuffixWidth', size)]: optionIconSuffixWidth,
            [createKey('optionSuffixWidth', size)]: optionSuffixWidth,
            [createKey('optionIconPrefixWidth', size)]: optionIconPrefixWidth,
            [createKey('optionPrefixWidth', size)]: optionPrefixWidth,
            [createKey('fontSize', size)]: fontSize,
            [createKey('optionHeight', size)]: optionHeight,
            [createKey('optionIconSize', size)]: optionIconSize,
            [createKey('groupHeaderFontSize', size)]: groupHeaderFontSize
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
          '--prefix-color': prefixColor,
          '--suffix-color': suffixColor,
          '--group-header-text-color': groupHeaderTextColor,
          '--group-header-font-size': groupHeaderFontSize,
          '--option-icon-size': optionIconSize
        }
      })
    }
  },
  watch: {
    mergedShow (value) {
      if (!value) this.clearPendingState()
    }
  },
  methods: {
    doSelect (...args) {
      const { onSelect } = this
      if (onSelect) call(onSelect, ...args)
    },
    doUpdateShow (value) {
      const { onUpdateShow } = this
      if (onUpdateShow) call(onUpdateShow, value)
      this.uncontrolledShow = value
    },
    clearPendingState () {
      this.hoverKey = null
      this.keyboardKey = null
      this.lastToggledSubmenuKey = null
    },
    handleKeyDownEsc () {
      this.doUpdateShow(false)
    },
    handleKeyDownLeft () {
      this.handleKeyDown('left')
    },
    handleKeyDownRight () {
      this.handleKeyDown('right')
    },
    handleKeyDownUp () {
      this.handleKeyDown('up')
    },
    handleKeyDownDown () {
      this.handleKeyDown('down')
    },
    handleKeyUpEnter () {
      const pendingNode = this.getPendingNode()
      if (pendingNode && pendingNode.isLeaf) {
        this.doSelect(pendingNode.key)
        this.doUpdateShow(false)
      }
    },
    getPendingNode () {
      const { pendingKey, tmNodeMap } = this
      return tmNodeMap.get(pendingKey) ?? null
    },
    handleKeyDown (direction) {
      const { pendingKey, getFirstAvailableNode } = this
      let nextKeyboardKey = null
      if (pendingKey === null) {
        const firstNode = getFirstAvailableNode()
        if (firstNode !== null) {
          nextKeyboardKey = firstNode.key
        }
      } else {
        const currentNode = this.getPendingNode()
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
        this.hoverKey = null
        this.keyboardKey = nextKeyboardKey
      }
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
