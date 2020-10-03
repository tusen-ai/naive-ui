import { h, computed, ref, toRef } from 'vue'
import { TreeMate } from 'treemate'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import { KEY_CODE } from '../../_utils/event/keyCode'
import keyboardDelegate from '../../_utils/delegate/keyboardDelegate'
import NPopover from '../../popover'
import NDropdownMenu from './DropdownMenu.js'
import { useMergedState } from '../../_utils/composition'
import { keep, call } from '../../_utils/vue'
import styles from './styles'

const treemateOptions = {
  getKey ({ parentKey, index, node }) {
    if (node.type === 'divider') {
      if (parentKey === null) return `${index}`
      return `${parentKey}-${index}`
    }
    return node.key
  },
  getDisabled ({ node }) {
    if (node.type === 'divider') return true
    return node.disabled === true
  }
}

const dropdownProps = {
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
  }
}

const popoverPropKeys = Object.keys(NPopover.props)

export default {
  name: 'Dropdown',
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  provide () {
    return {
      NDropdown: this
    }
  },
  props: {
    ...NPopover.props,
    ...dropdownProps
  },
  setup (props) {
    const treemateRef = computed(() => TreeMate(props.options, treemateOptions))
    const tmNodesRef = computed(() => treemateRef.value.treeNodes)
    const tmNodeMap = computed(() => treemateRef.value.treeNodeMap)
    const getPathRef = computed(() => treemateRef.value.getPath)
    const getFirstAvailableNodeRef = computed(() => treemateRef.value.getFirstAvailableNode)

    const hoverKeyRef = ref(null)
    const keyboardKeyRef = ref(null)
    const lastToggledSubmenuKeyRef = ref(null)
    const pendingKeyRef = computed(() => {
      return hoverKeyRef.value ?? keyboardKeyRef.value ?? lastToggledSubmenuKeyRef.value ?? null
    })
    const activeKeyPathRef = computed(() => getPathRef.value(
      pendingKeyRef.value
    ).keyPath)

    const uncontrolledShowRef = ref(false)
    const mergedShow = useMergedState(toRef(props, 'show'), uncontrolledShowRef)

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
      mergedShow,
      // methods
      getPath: getPathRef,
      getFirstAvailableNode: getFirstAvailableNodeRef
    }
  },
  watch: {
    keyboard (value) {
      if (!value) {
        this.unregisterKeyboardOperations()
      } else if (this.mergedShow) {
        this.registerKeyboardOperations()
      }
    },
    mergedShow (value) {
      if (!value) this.clearPendingState()
      if (this.keyboard) {
        if (value) {
          this.registerKeyboardOperations()
        } else {
          this.unregisterKeyboardOperations()
        }
      }
    }
  },
  mounted () {
    if (this.keyboard && this.mergedShow) this.registerKeyboardOperations()
  },
  beforeUnmount () {
    if (this.keyboardHandlerRegistered) this.unregisterKeyboardOperations()
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
    registerKeyboardOperations () {
      if (this.keyboardHandlerRegistered) return
      this.keyboardHandlerRegistered = true
      keyboardDelegate.registerHandler(KEY_CODE.UP, 'keydown', this.handleKeyDownUp, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.RIGHT, 'keydown', this.handleKeyDownRight, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.DOWN, 'keydown', this.handleKeyDownDown, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.LEFT, 'keydown', this.handleKeyDownLeft, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.ENTER, 'keyup', this.handleKeyUpEnter)
      keyboardDelegate.registerHandler(KEY_CODE.ESC, 'keydown', this.handleKeyDownEsc)
    },
    unregisterKeyboardOperations () {
      if (!this.keyboardHandlerRegistered) return
      this.keyboardHandlerRegistered = false
      keyboardDelegate.unregisterHandler(this.handleKeyDownUp)
      keyboardDelegate.unregisterHandler(this.handleKeyDownDown)
      keyboardDelegate.unregisterHandler(this.handleKeyDownLeft)
      keyboardDelegate.unregisterHandler(this.handleKeyDownRight)
      keyboardDelegate.unregisterHandler(this.handleKeyUpEnter)
      keyboardDelegate.unregisterHandler(this.handleKeyDownEsc)
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
      if (
        pendingNode &&
        pendingNode.isLeaf
      ) {
        this.doSelect(pendingNode.key)
        this.doUpdateShow(false)
      }
    },
    getPendingNode () {
      const {
        pendingKey,
        tmNodeMap
      } = this
      return tmNodeMap.get(pendingKey) ?? null
    },
    handleKeyDown (direction) {
      const {
        pendingKey,
        getFirstAvailableNode
      } = this
      let nextKeyboardKey = null
      if (
        pendingKey === null
      ) {
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
    return h(NPopover,
      keep(
        this.$props,
        popoverPropKeys,
        {
          show: this.mergedShow,
          'onUpdate:show': this.doUpdateShow,
          showArrow: false,
          raw: true,
          shadow: false
        }
      ),
      {
        trigger: this.$slots.default,
        default: () => {
          return h(NDropdownMenu,
            {
              tmNodes: this.tmNodes
            }
          )
        }
      })
  }
}
