import {
  h,
  ref,
  reactive,
  computed,
  createTextVNode,
  defineComponent,
  PropType,
  VNode,
  Slots,
  provide
} from 'vue'
import { VBinder, VTarget, FollowerPlacement } from 'vueuc'
import { useMergedState, useCompitable, useIsMounted, useMemo } from 'vooks'
import { call, keep, warn } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import NPopoverBody, { popoverBodyProps } from './PopoverBody'
import type { PopoverTheme } from '../styles'
import { PopoverTrigger } from './interface'

const bodyPropKeys = Object.keys(popoverBodyProps) as Array<
keyof typeof popoverBodyProps
>

function appendEvents (
  vNode: VNode,
  events: {
    onClick: (e: MouseEvent) => void
    onMouseEnter: (e: MouseEvent) => void
    onMouseLeave: (e: MouseEvent) => void
  }
): void {
  Object.entries(events).forEach(([key, handler]) => {
    if (!vNode.props) vNode.props = {}
    const originalHandler = vNode.props[key]
    if (!originalHandler) vNode.props[key] = handler
    else {
      vNode.props[key] = (...args: unknown[]) => {
        originalHandler(...args)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(handler as any)(...args)
      }
    }
  })
}

function getFirstSlotVNode (slots: Slots, slotName = 'default'): VNode | null {
  const slot = slots[slotName]
  if (!slot) {
    warn('getFirstSlotVNode', `slot[${slotName}] is empty`)
    return null
  }
  const slotContent = slot()
  // vue will normalize the slot, so slot must be an array
  if (slotContent.length === 1) {
    return slotContent[0]
  } else {
    warn('getFirstSlotVNode', `slot[${slotName}] should have exactly one child`)
    return null
  }
}

const textVNodeType = createTextVNode('').type

interface BodyInstance {
  syncPosition: () => void
  [key: string]: unknown
}

export interface PopoverInjection {
  handleMouseLeave: (e: MouseEvent) => void
  handleMouseEnter: (e: MouseEvent) => void
  handleMouseMoveOutside: (e: MouseEvent) => void
  handleClickOutside: (e: MouseEvent) => void
  getTriggerElement: () => HTMLElement
  setBodyInstance: (value: BodyInstance | null) => void
  isMounted: boolean
}

export const popoverProps = {
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
    type: String as PropType<PopoverTrigger>,
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
    type: String as PropType<FollowerPlacement>,
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
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:show': Function as PropType<
  MaybeArray<(value: boolean) => void> | undefined
  >,
  // deprecated
  onShow: {
    type: Function as PropType<
    MaybeArray<(value: boolean) => void> | undefined
    >,
    validator: (): boolean => {
      warn(
        'popover',
        '`on-show` is deprecated, please use `on-update:show` instead.'
      )
      return true
    },
    default: undefined
  },
  onHide: {
    type: Function as PropType<
    MaybeArray<(value: boolean) => void> | undefined
    >,
    validator: (): boolean => {
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
  },
  width: {
    type: Number,
    default: undefined
  },
  minWidth: {
    type: Number,
    default: undefined
  },
  maxWidth: {
    type: Number,
    default: undefined
  }
}

export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: {
    ...(useTheme.props as ThemeProps<PopoverTheme>),
    ...popoverProps
  },
  setup (props) {
    const isMountedRef = useIsMounted()
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
    // trigger
    let triggerVNode = null as VNode | null
    // bodyInstance
    let bodyInstance = null as BodyInstance | null
    const showTimerIdRef = ref<number | null>(null)
    const hideTimerIdRef = ref<number | null>(null)
    // methods
    function doUpdateShow (value: boolean): void {
      const { 'onUpdate:show': onUpdateShow, onShow, onHide } = props
      uncontrolledShowRef.value = value
      if (onUpdateShow) {
        call(onUpdateShow, value)
      }
      if (value && onShow) {
        call(onShow, true)
      }
      if (value && onHide) {
        call(onHide, false)
      }
    }
    function syncPosition (): void {
      if (bodyInstance) {
        bodyInstance.syncPosition()
      }
    }
    function clearTimer (): void {
      const { value: showTimerId } = showTimerIdRef
      const { value: hideTimerId } = hideTimerIdRef
      if (showTimerId) {
        window.clearTimeout(showTimerId)
        showTimerIdRef.value = null
      }
      if (hideTimerId) {
        window.clearTimeout(hideTimerId)
        hideTimerIdRef.value = null
      }
    }
    function handleMouseEnter (): void {
      if (props.trigger === 'hover' && !props.disabled) {
        clearTimer()
        if (mergedShowRef.value) return
        showTimerIdRef.value = window.setTimeout(() => {
          doUpdateShow(true)
          showTimerIdRef.value = null
        }, props.delay)
      }
    }
    function handleMouseLeave (): void {
      if (props.trigger === 'hover' && !props.disabled) {
        clearTimer()
        if (!mergedShowRef.value) return
        hideTimerIdRef.value = window.setTimeout(() => {
          doUpdateShow(false)
          hideTimerIdRef.value = null
        }, props.duration)
      }
    }
    // will be called in popover-content
    function handleMouseMoveOutside (): void {
      handleMouseLeave()
    }
    // will be called in popover-content
    function handleClickOutside (): void {
      if (!mergedShowRef.value) return
      if (props.trigger === 'click') {
        clearTimer()
        doUpdateShow(false)
      }
    }
    function handleClick (): void {
      if (props.trigger === 'click' && !props.disabled) {
        clearTimer()
        const nextShow = !mergedShowRef.value
        doUpdateShow(nextShow)
      }
    }
    function setShow (value: boolean): void {
      uncontrolledShowRef.value = value
    }
    function getTriggerElement (): HTMLElement {
      return triggerVNode?.el as HTMLElement
    }
    function setBodyInstance (value: BodyInstance | null): void {
      bodyInstance = value
    }
    provide<PopoverInjection>(
      'NPopover',
      reactive({
        getTriggerElement,
        handleMouseEnter,
        handleMouseLeave,
        handleClickOutside,
        handleMouseMoveOutside,
        setBodyInstance,
        isMounted: isMountedRef
      })
    )
    return {
      positionManually: useMemo(() => {
        return props.x !== undefined && props.y !== undefined
      }),
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      compatibleShowArrow: compatibleShowArrowRef,
      setShow,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      setTriggerVNode (v: VNode | null) {
        triggerVNode = v
      },
      syncPosition
    }
  },
  render () {
    const { positionManually } = this
    const slots = { ...this.$slots }
    let triggerVNode: VNode | null
    if (!positionManually) {
      if (slots.activator) {
        triggerVNode = getFirstSlotVNode(slots, 'activator')
      } else {
        triggerVNode = getFirstSlotVNode(slots, 'trigger')
      }
      if (triggerVNode) {
        triggerVNode =
          triggerVNode.type === textVNodeType
            ? h('span', [triggerVNode])
            : triggerVNode

        appendEvents(triggerVNode, {
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        })
      }
      this.setTriggerVNode(triggerVNode)
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
