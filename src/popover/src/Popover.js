import { h, ref, computed, watch, createTextVNode, defineComponent } from 'vue'
import { VBinder, VTarget } from 'vueuc'
import { useMergedState, useCompitable, useIsMounted, useMemo } from 'vooks'
import { call, keep, warn } from '../../_utils'
import { useTheme } from '../../_mixins'
import NPopoverBody from './PopoverBody'

const bodyPropKeys = Object.keys(NPopoverBody.props)

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
    warn('getFirstSlotVNode', `slot[${slotName}] is empty`)
  }
  slot = slot()
  // vue will normalize the slot, so slot must be an array
  if (slot.length === 1) {
    return slot[0]
  } else {
    warn('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`)
    return null
  }
}

const textVNodeType = createTextVNode('').type

export default defineComponent({
  name: 'Popover',
  provide () {
    return {
      NPopover: this
    }
  },
  inheritAttrs: false,
  props: {
    ...useTheme.props,
    show: {
      type: Boolean,
      default: undefined
    },
    defaultShow: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    trigger: {
      validator (value) {
        return ['hover', 'click'].includes(value)
      },
      default: undefined
    },
    delay: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 200
    },
    raw: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    x: {
      type: Number,
      default: undefined
    },
    y: {
      type: Number,
      default: undefined
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
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    },
    filp: {
      type: Boolean,
      default: true
    },
    animated: {
      type: Boolean,
      default: true
    },
    // private
    padded: {
      type: Boolean,
      default: true
    },
    shadow: {
      type: Boolean,
      default: true
    },
    // events
    'onUpdate:show': {
      type: Function,
      default: undefined
    },
    // deprecated
    onShow: {
      validator () {
        warn(
          'popover',
          '`on-show` is deprecated, please use `on-update:show` instead.'
        )
        return true
      },
      default: undefined
    },
    onHide: {
      validator () {
        warn(
          'popover',
          '`on-hide` is deprecated, please use `on-update:show` instead.'
        )
        return true
      },
      default: undefined
    },
    arrow: {
      type: Boolean,
      default: undefined
    }
  },
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
    const compatibleShowArrowRef = useCompitable(props, ['arrow', 'showArrow'])
    watch(mergedShowRef, (value) => {
      if (props.showWatcher) {
        props.showWatcher(value)
      }
    })
    return {
      isMounted: useIsMounted(),
      positionManually: useMemo(() => {
        return props.x !== undefined && props.y !== undefined
      }),
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
  methods: {
    doUpdateShow (value) {
      const { 'onUpdate:show': onUpdateShow, onShow, onHide } = this
      this.uncontrolledShow = value
      if (onUpdateShow) {
        call(onUpdateShow, value)
      }
      if (value && onShow) {
        call(onShow, true)
      }
      if (value && onHide) {
        call(onHide, false)
      }
    },
    syncPosition () {
      if (this.bodyInstance) {
        this.bodyInstance.syncPosition()
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
    handleMouseEnter () {
      if (this.trigger === 'hover' && !this.disabled) {
        this.clearTimer()
        if (this.mergedShow) return
        this.showTimerId = window.setTimeout(() => {
          this.doUpdateShow(true)
          this.showTimerId = null
        }, this.delay)
      }
    },
    handleMouseLeave () {
      if (this.trigger === 'hover' && !this.disabled) {
        this.clearTimer()
        if (!this.mergedShow) return
        this.hideTimerId = window.setTimeout(() => {
          this.doUpdateShow(false)
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
        this.doUpdateShow(false)
      }
    },
    handleClick () {
      if (this.trigger === 'click' && !this.disabled) {
        this.clearTimer()
        const nextShow = !this.mergedShow
        this.doUpdateShow(nextShow)
      }
    },
    setShow (value) {
      this.uncontrolledShow = value
    }
  },
  render () {
    const { positionManually } = this
    const slots = { ...this.$slots }
    let triggerVNode
    if (!positionManually) {
      if (slots.activator) {
        triggerVNode = getFirstSlotVNode(slots, 'activator')
      } else {
        triggerVNode = getFirstSlotVNode(slots, 'trigger')
      }
      triggerVNode =
        triggerVNode.type === textVNodeType
          ? h('span', [triggerVNode])
          : triggerVNode

      appendEvents(triggerVNode, {
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      })
      this.triggerVNode = triggerVNode
    }

    return h(VBinder, null, {
      default: () => {
        return [
          positionManually
            ? null
            : h(VTarget, null, {
              default: () => triggerVNode
            }),
          h(
            NPopoverBody,
            keep(this.$props, bodyPropKeys, {
              ...this.$attrs,
              show: this.mergedShow
            }),
            slots
          )
        ]
      }
    })
  }
})
