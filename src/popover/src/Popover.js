import {
  h,
  ref,
  computed,
  Fragment,
  createTextVNode
} from 'vue'
import {
  useMergedState,
  useCompitable,
  useIsMounted
} from '../../_utils/composition'
import NLazyTeleport from '../../_base/lazy-teleport'
import NPopoverBody from './PopoverBody'

function appendEvents (vNode, events) {
  Object.entries(events).forEach(([key, handler]) => {
    if (!vNode.props) vNode.props = {}
    const originalHandler = vNode.props[key]
    if (!originalHandler) vNode.props[key] = handler
    else {
      vNode.props[key] = (...args) => {
        originalHandler(...args)
        handler()
      }
    }
  })
}

function getFirstSlotVNode (slots, slotName = 'default') {
  let slot = slots[slotName]
  if (!slot) {
    console.error(`[naive-ui/getFirstSlotVNode]: slot[${slotName}] is empty`)
  }
  slot = slot()
  // vue will normalize the slot, so slot must be an array
  if (slot.length === 1) {
    return slot[0]
  } else {
    console.error(`[naive-ui/getFirstSlotVNode]: slot[${slotName}] should have exactly one child`)
    return null
  }
}

function omit (object, keys = [], rest = {}) {
  const omitedObject = { ...object }
  for (const key of keys) {
    delete omitedObject[key]
  }
  return { ...omitedObject, ...rest }
}

const textVNodeType = createTextVNode('').type

export default {
  name: 'Popover',
  provide () {
    return {
      NPopover: this
    }
  },
  emits: [
    'update:show',
    // legacy
    'show',
    'hide'
  ],
  setup (props) {
    // setup show
    const controlledShowRef = computed(() => props.show)
    const uncontrolledShowRef = ref(props.defaultShow)
    const mergedShowWithoutDisabledRef = useMergedState(
      controlledShowRef,
      uncontrolledShowRef
    )
    const mergedShowRef = computed(() => {
      return props.disabled ? false : mergedShowWithoutDisabledRef.value
    })
    // setup show-arrow
    const compatibleShowArrowRef = useCompitable(props, [
      'showArrow',
      'arrow'
    ])
    return {
      isMounted: useIsMounted(),
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      compatibleShowArrow: compatibleShowArrowRef
    }
  },
  data () {
    return {
      showTimerId: null,
      hideTimerId: null,
      triggerVNode: null,
      bodyInstance: null
    }
  },
  props: {
    show: {
      type: Boolean,
      default: undefined
    },
    defaultShow: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    trigger: {
      validator (value) {
        return ['hover', 'click'].includes(value)
      },
      default: 'hover'
    },
    delay: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 300
    },
    raw: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
    },
    minWidth: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    bodyClass: {
      type: String,
      default: null
    },
    bodyStyle: {
      type: Object,
      default: null
    },
    manuallyPositioned: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: null
    },
    y: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    displayDirective: {
      type: String,
      default: 'if'
    },
    arrowStyle: {
      type: Object,
      default: null
    },
    theme: {
      type: String,
      default: null
    },
    filp: {
      type: Boolean,
      default: true
    },
    // private
    zIndex: {
      type: String,
      default: undefined
    },
    containerClass: {
      type: String,
      default: undefined
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    syncPosition () {
      if (this.bodyInstance) {
        this.bodyInstance.placeableSyncPosition()
      }
    },
    getTriggerElement () {
      return this.triggerVNode.el
    },
    clearTimer () {
      const { showTimerId, hideTimerId } = this
      if (showTimerId) {
        window.clearTimeout(showTimerId)
        this.showTimerId = null
      }
      if (hideTimerId) {
        window.clearTimeout(hideTimerId)
        this.hideTimerId = null
      }
    },
    handleMouseEnter (e) {
      if (this.trigger === 'hover') {
        this.clearTimer()
        if (this.mergedShow) return
        if (
          e.target !== e.currentTarget
        ) return
        this.showTimerId = window.setTimeout(() => {
          this.$emit('update:show', true)
          this.uncontrolledShow = true
          this.showTimerId = null
        }, this.delay)
      }
    },
    handleMouseLeave (e) {
      if (this.trigger === 'hover') {
        this.clearTimer()
        if (!this.mergedShow) return
        if (
          e.target !== e.currentTarget
        ) return
        this.hideTimerId = window.setTimeout(() => {
          this.$emit('update:show', false)
          this.uncontrolledShow = false
          this.hideTimerId = null
        }, this.duration)
      }
    },
    // will be called in popover-content
    handleMouseMoveOutside (e) {
      this.handleMouseLeave(e)
    },
    // will be called in popover-content
    handleClickOutside () {
      if (!this.mergedShow) return
      if (this.trigger === 'click') {
        this.clearTimer()
        this.uncontrolledShow = false
        this.$emit('update:show', false)
      }
    },
    handleClick () {
      if (this.trigger === 'click') {
        this.clearTimer()
        const nextShow = !this.mergedShow
        this.uncontrolledShow = nextShow
        this.$emit('update:show', nextShow)
      }
    }
  },
  render () {
    const slots = this.$slots
    const {
      manuallyPositioned
    } = this
    let triggerVNode
    if (!manuallyPositioned) {
      if (slots.activator) {
        triggerVNode = getFirstSlotVNode(slots, 'activator')
      } else {
        triggerVNode = getFirstSlotVNode(slots, 'trigger')
      }
      triggerVNode = triggerVNode.type === textVNodeType ? h('span', [
        triggerVNode
      ]) : triggerVNode

      appendEvents(triggerVNode, {
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      })
      this.triggerVNode = triggerVNode
    }

    return h(Fragment, [
      manuallyPositioned ? null : triggerVNode,
      h(NLazyTeleport, {
        to: 'body',
        show: this.mergedShow
      }, {
        default: () => {
          return [
            h(NPopoverBody, omit(this.$props, [
              'defaultShow',
              'showArrow',
              'disabled'
            ], {
              show: this.mergedShow
            }), slots)
          ]
        }
      })
    ])
  }
}
