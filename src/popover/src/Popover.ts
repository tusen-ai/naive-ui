import {
  h,
  ref,
  computed,
  createTextVNode,
  defineComponent,
  PropType,
  VNode,
  provide,
  CSSProperties,
  ComputedRef,
  Ref,
  toRef
} from 'vue'
import { VBinder, VTarget, FollowerPlacement } from 'vueuc'
import { useMergedState, useCompitable, useIsMounted, useMemo } from 'vooks'
import { call, keep, warn, getFirstSlotVNode } from '../../_utils'
import type {
  ExtractPublicPropTypes,
  ExtractInternalPropTypes,
  MaybeArray
} from '../../_utils'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import NPopoverBody, { popoverBodyProps } from './PopoverBody'
import type { PopoverTheme } from '../styles'
import type { PopoverTrigger, InternalRenderBody } from './interface'

const bodyPropKeys = Object.keys(popoverBodyProps) as Array<
keyof typeof popoverBodyProps
>

function appendEvents (
  vNode: VNode,
  events: {
    onClick: (e: MouseEvent) => void
    onMouseenter: (e: MouseEvent) => void
    onMouseleave: (e: MouseEvent) => void
  }
): void {
  Object.entries(events).forEach(([key, handler]) => {
    if (!vNode.props) vNode.props = {}
    else {
      vNode.props = Object.assign({}, vNode.props)
    }
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
  internalRenderBodyRef: Ref<InternalRenderBody | undefined>
  positionManuallyRef: ComputedRef<boolean>
  isMountedRef: Ref<boolean>
  extraClassRef: Ref<string | undefined>
}

export const popoverBaseProps = {
  show: {
    type: Boolean as PropType<boolean | undefined>,
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
    default: 'hover'
  },
  delay: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 100
  },
  raw: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'top'
  },
  x: Number,
  y: Number,
  disabled: {
    type: Boolean,
    default: false
  },
  getDisabled: Function as PropType<() => boolean>,
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  filp: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String] as PropType<number | 'trigger'>,
    default: undefined
  },
  overlap: {
    type: Boolean,
    default: false
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
  internalExtraClass: String,
  // events
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  /** @deprecated */
  onShow: {
    type: [Function, Array] as PropType<
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
  /** @deprecated */
  onHide: {
    type: [Function, Array] as PropType<
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
  onClickoutside: Function as PropType<(value: boolean) => void>,
  /** @deprecated */
  arrow: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  /** @deprecated */
  minWidth: Number,
  /** @deprecated */
  maxWidth: Number
}

const popoverProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  ...popoverBaseProps,
  internalRenderBody: Function as PropType<InternalRenderBody>
}

export type PopoverProps = ExtractPublicPropTypes<typeof popoverBaseProps>
export type PopoverInternalProps = ExtractInternalPropTypes<typeof popoverProps>

export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: popoverProps,
  setup (props) {
    const isMountedRef = useIsMounted()
    // setup show
    const controlledShowRef = computed(() => props.show)
    const uncontrolledShowRef = ref(props.defaultShow)
    const mergedShowWithoutDisabledRef = useMergedState(
      controlledShowRef,
      uncontrolledShowRef
    )
    const getMergedDisabled = (): boolean => {
      if (props.disabled) return true
      const { getDisabled } = props
      if (getDisabled?.()) return true
      return false
    }
    const getMergedShow = (): boolean => {
      if (getMergedDisabled()) return false
      return mergedShowWithoutDisabledRef.value
    }
    // setup show-arrow
    const compatibleShowArrowRef = useCompitable(props, ['arrow', 'showArrow'])
    const mergedShowArrowRef = computed(() => {
      if (props.overlap) return false
      return compatibleShowArrowRef.value
    })
    // trigger
    let triggerVNode: VNode | null = null
    // bodyInstance
    let bodyInstance: BodyInstance | null = null
    const showTimerIdRef = ref<number | null>(null)
    const hideTimerIdRef = ref<number | null>(null)
    const positionManuallyRef = useMemo(() => {
      return props.x !== undefined && props.y !== undefined
    })
    // methods
    function doUpdateShow (value: boolean): void {
      const {
        'onUpdate:show': _onUpdateShow,
        onUpdateShow,
        onShow,
        onHide
      } = props
      uncontrolledShowRef.value = value
      if (_onUpdateShow) {
        call(_onUpdateShow, value)
      }
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
    function clearShowTimer (): void {
      const { value: showTimerId } = showTimerIdRef
      if (showTimerId) {
        window.clearTimeout(showTimerId)
        showTimerIdRef.value = null
      }
    }
    function clearHideTimer (): void {
      const { value: hideTimerId } = hideTimerIdRef
      if (hideTimerId) {
        window.clearTimeout(hideTimerId)
        hideTimerIdRef.value = null
      }
    }
    function handleMouseEnter (): void {
      const mergedDisabled = getMergedDisabled()
      if (props.trigger === 'hover' && !mergedDisabled) {
        clearHideTimer()
        if (showTimerIdRef.value !== null) return
        if (getMergedShow()) return
        const delayCallback = (): void => {
          doUpdateShow(true)
          showTimerIdRef.value = null
        }
        const { delay } = props
        if (delay === 0) {
          delayCallback()
        } else {
          showTimerIdRef.value = window.setTimeout(delayCallback, delay)
        }
      }
    }
    function handleMouseLeave (): void {
      const mergedDisabled = getMergedDisabled()
      if (props.trigger === 'hover' && !mergedDisabled) {
        clearShowTimer()
        if (hideTimerIdRef.value !== null) return
        if (!getMergedShow()) return
        const delayedCallback = (): void => {
          doUpdateShow(false)
          hideTimerIdRef.value = null
        }
        const { duration } = props
        if (duration === 0) {
          delayedCallback()
        } else {
          hideTimerIdRef.value = window.setTimeout(delayedCallback, duration)
        }
      }
    }
    // will be called in popover-content
    function handleMouseMoveOutside (): void {
      handleMouseLeave()
    }
    // will be called in popover-content
    function handleClickOutside (): void {
      const { onClickoutside } = props
      if (!getMergedShow()) return
      if (props.trigger === 'click') {
        clearShowTimer()
        clearHideTimer()
        doUpdateShow(false)
      }
      onClickoutside?.(false)
    }
    function handleClick (): void {
      if (props.trigger === 'click' && !getMergedDisabled()) {
        clearShowTimer()
        clearHideTimer()
        const nextShow = !getMergedShow()
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
    provide<PopoverInjection>('NPopover', {
      getTriggerElement,
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleMouseMoveOutside,
      setBodyInstance,
      positionManuallyRef: positionManuallyRef,
      isMountedRef: isMountedRef,
      extraClassRef: toRef(props, 'internalExtraClass'),
      internalRenderBodyRef: toRef(props, 'internalRenderBody')
    })
    return {
      positionManually: positionManuallyRef,
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShowArrow: mergedShowArrowRef,
      getMergedShow,
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
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave
        })
      }
      this.setTriggerVNode(triggerVNode)
    }

    return h(VBinder, null, {
      default: () => {
        const mergedShow = this.getMergedShow()
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
              showArrow: this.mergedShowArrow,
              show: mergedShow
            }),
            slots
          )
        ]
      }
    })
  }
})
