import {
  h,
  ref,
  computed,
  defineComponent,
  type PropType,
  type VNode,
  provide,
  type CSSProperties,
  type ComputedRef,
  type Ref,
  toRef,
  cloneVNode,
  watchEffect,
  withDirectives,
  Text
} from 'vue'
import {
  VBinder,
  VTarget,
  type FollowerPlacement,
  type BinderInst
} from 'vueuc'
import { useMergedState, useCompitable, useIsMounted, useMemo } from 'vooks'
import { zindexable } from 'vdirs'
import {
  call,
  keep,
  getFirstSlotVNode,
  warnOnce,
  useAdjustedTo
} from '../../_utils'
import type {
  ExtractPublicPropTypes,
  ExtractInternalPropTypes,
  MaybeArray
} from '../../_utils'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { PopoverTheme } from '../styles'
import NPopoverBody, { popoverBodyProps } from './PopoverBody'
import type {
  PopoverTrigger,
  InternalRenderBody,
  InternalPopoverInst
} from './interface'

const bodyPropKeys = Object.keys(popoverBodyProps) as Array<
keyof typeof popoverBodyProps
>

const triggerEventMap = {
  focus: ['onFocus', 'onBlur'],
  click: ['onClick'],
  hover: ['onMouseenter', 'onMouseleave'],
  manual: [],
  nested: ['onFocus', 'onBlur', 'onMouseenter', 'onMouseleave', 'onClick']
} as const

export interface TriggerEventHandlers {
  onClick: (e: MouseEvent) => void
  onMouseenter: (e: MouseEvent) => void
  onMouseleave: (e: MouseEvent) => void
  onFocus: (e: FocusEvent) => void
  onBlur: (e: FocusEvent) => void
}

function appendEvents (
  vNode: VNode,
  trigger: PopoverTrigger | 'nested',
  events: TriggerEventHandlers
): void {
  triggerEventMap[trigger].forEach((eventName) => {
    if (!vNode.props) vNode.props = {}
    else {
      vNode.props = Object.assign({}, vNode.props)
    }
    const originalHandler = vNode.props[eventName]
    const handler = events[eventName]
    if (!originalHandler) vNode.props[eventName] = handler
    else {
      vNode.props[eventName] = (...args: unknown[]) => {
        originalHandler(...args)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(handler as any)(...args)
      }
    }
  })
}

interface BodyInstance {
  syncPosition: () => void
  [key: string]: unknown
}

export interface PopoverInjection {
  handleMouseLeave: (e: MouseEvent) => void
  handleMouseEnter: (e: MouseEvent) => void
  handleMouseMoveOutside: (e: MouseEvent) => void
  handleClickOutside: (e: MouseEvent) => void
  handleKeydown: (e: KeyboardEvent) => void
  getTriggerElement: () => HTMLElement
  setBodyInstance: (value: BodyInstance | null) => void
  zIndexRef: Ref<number | undefined>
  internalRenderBodyRef: Ref<InternalRenderBody | undefined>
  positionManuallyRef: ComputedRef<boolean>
  isMountedRef: Ref<boolean>
  extraClassRef: Ref<string[]>
}

export const popoverBaseProps = {
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultShow: Boolean,
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
  raw: Boolean,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'top'
  },
  x: Number,
  y: Number,
  arrowPointToCenter: Boolean,
  disabled: Boolean,
  getDisabled: Function as PropType<() => boolean>,
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  arrowClass: String,
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  arrowWrapperClass: String,
  arrowWrapperStyle: [String, Object] as PropType<string | CSSProperties>,
  flip: {
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
  overlap: Boolean,
  keepAliveOnHover: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  to: useAdjustedTo.propTo,
  scrollable: Boolean,
  contentClass: String,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  headerClass: String,
  headerStyle: [Object, String] as PropType<CSSProperties | string>,
  footerClass: String,
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
  // events
  onClickoutside: Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  // internal
  internalDeactivateImmediately: Boolean,
  internalSyncTargetWithParent: Boolean,
  internalInheritedEventHandlers: {
    type: Array as PropType<TriggerEventHandlers[]>,
    default: () => []
  },
  internalTrapFocus: Boolean,
  internalExtraClass: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  // deprecated
  onShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void> | undefined
  >,
  onHide: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void> | undefined
  >,
  arrow: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  minWidth: Number,
  maxWidth: Number
}

export const popoverProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  ...popoverBaseProps,
  internalOnAfterLeave: Function as PropType<() => void>,
  internalRenderBody: Function as PropType<InternalRenderBody>
}

export type PopoverProps = ExtractPublicPropTypes<typeof popoverBaseProps>
export type PopoverInternalProps = ExtractInternalPropTypes<typeof popoverProps>

export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: popoverProps,
  __popover__: true,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.maxWidth !== undefined) {
          warnOnce(
            'popover',
            '`max-width` is deprecated, please use `style` instead.'
          )
        }
        if (props.minWidth !== undefined) {
          warnOnce(
            'popover',
            '`min-width` is deprecated, please use `style` instead.'
          )
        }
        if (props.arrow !== undefined) {
          warnOnce(
            'popover',
            '`arrow` is deprecated, please use `showArrow` instead.'
          )
        }
        if (props.onHide !== undefined) {
          warnOnce(
            'popover',
            '`on-hide` is deprecated, please use `on-update:show` instead.'
          )
        }
        if (props.onShow !== undefined) {
          warnOnce(
            'popover',
            '`on-show` is deprecated, please use `on-update:show` instead.'
          )
        }
      })
    }
    const isMountedRef = useIsMounted()
    const binderInstRef = ref<BinderInst | null>(null)
    // setup show
    const controlledShowRef = computed(() => props.show)
    const uncontrolledShowRef = ref(props.defaultShow)
    const mergedShowWithoutDisabledRef = useMergedState(
      controlledShowRef,
      uncontrolledShowRef
    )
    const mergedShowConsideringDisabledPropRef = useMemo(() => {
      if (props.disabled) return false
      return mergedShowWithoutDisabledRef.value
    })
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
    function handleFocus (): void {
      const mergedDisabled = getMergedDisabled()
      if (props.trigger === 'focus' && !mergedDisabled) {
        if (getMergedShow()) return
        doUpdateShow(true)
      }
    }
    function handleBlur (): void {
      const mergedDisabled = getMergedDisabled()
      if (props.trigger === 'focus' && !mergedDisabled) {
        if (!getMergedShow()) return
        doUpdateShow(false)
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
    function handleClickOutside (e: MouseEvent): void {
      if (!getMergedShow()) return
      if (props.trigger === 'click') {
        clearShowTimer()
        clearHideTimer()
        doUpdateShow(false)
      }
      props.onClickoutside?.(e)
    }
    function handleClick (): void {
      if (props.trigger === 'click' && !getMergedDisabled()) {
        clearShowTimer()
        clearHideTimer()
        const nextShow = !getMergedShow()
        doUpdateShow(nextShow)
      }
    }
    function handleKeydown (e: KeyboardEvent): void {
      if (!props.internalTrapFocus) return
      if (e.key === 'Escape') {
        clearShowTimer()
        clearHideTimer()
        doUpdateShow(false)
      }
    }
    function setShow (value: boolean): void {
      uncontrolledShowRef.value = value
    }
    function getTriggerElement (): HTMLElement {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      return binderInstRef.value?.targetRef as HTMLElement
    }
    function setBodyInstance (value: BodyInstance | null): void {
      bodyInstance = value
    }
    provide<PopoverInjection>('NPopover', {
      getTriggerElement,
      handleKeydown,
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleMouseMoveOutside,
      setBodyInstance,
      positionManuallyRef,
      isMountedRef,
      zIndexRef: toRef(props, 'zIndex'),
      extraClassRef: toRef(props, 'internalExtraClass'),
      internalRenderBodyRef: toRef(props, 'internalRenderBody')
    })
    watchEffect(() => {
      if (mergedShowWithoutDisabledRef.value && getMergedDisabled()) {
        doUpdateShow(false)
      }
    })
    const returned = {
      binderInstRef,
      positionManually: positionManuallyRef,
      mergedShowConsideringDisabledProp: mergedShowConsideringDisabledPropRef,
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShowArrow: mergedShowArrowRef,
      getMergedShow,
      setShow,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      syncPosition
    }
    return returned satisfies InternalPopoverInst
  },
  render () {
    const { positionManually, $slots: slots } = this
    let triggerVNode: VNode | null
    let popoverInside = false
    if (!positionManually) {
      if (slots.activator) {
        triggerVNode = getFirstSlotVNode(slots, 'activator')
      } else {
        triggerVNode = getFirstSlotVNode(slots, 'trigger')
      }
      if (triggerVNode) {
        triggerVNode = cloneVNode(triggerVNode)
        triggerVNode =
          triggerVNode.type === Text ? h('span', [triggerVNode]) : triggerVNode
        const handlers = {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        }
        if ((triggerVNode.type as any)?.__popover__) {
          popoverInside = true
          // We assume that there's no DOM event handlers on popover element
          if (!triggerVNode.props) {
            triggerVNode.props = {
              internalSyncTargetWithParent: true,
              internalInheritedEventHandlers: []
            }
          }
          triggerVNode.props.internalSyncTargetWithParent = true
          if (!triggerVNode.props.internalInheritedEventHandlers) {
            triggerVNode.props.internalInheritedEventHandlers = [handlers]
          } else {
            triggerVNode.props.internalInheritedEventHandlers = [
              handlers,
              ...triggerVNode.props.internalInheritedEventHandlers
            ]
          }
        } else {
          const { internalInheritedEventHandlers } = this
          const ascendantAndCurrentHandlers: TriggerEventHandlers[] = [
            handlers,
            ...internalInheritedEventHandlers
          ]
          const mergedHandlers: TriggerEventHandlers = {
            onBlur: (e: FocusEvent) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onBlur(e)
              })
            },
            onFocus: (e: FocusEvent) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onFocus(e)
              })
            },
            onClick: (e: MouseEvent) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onClick(e)
              })
            },
            onMouseenter: (e: MouseEvent) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onMouseenter(e)
              })
            },
            onMouseleave: (e: MouseEvent) => {
              ascendantAndCurrentHandlers.forEach((_handlers) => {
                _handlers.onMouseleave(e)
              })
            }
          }
          appendEvents(
            triggerVNode,
            internalInheritedEventHandlers
              ? 'nested'
              : positionManually
                ? 'manual'
                : this.trigger,
            mergedHandlers
          )
        }
      }
    }
    return (
      <VBinder
        ref="binderInstRef"
        syncTarget={!popoverInside}
        syncTargetWithParent={this.internalSyncTargetWithParent}
      >
        {{
          default: () => {
            // We need to subscribe it. Sometimes rerender won't ge triggered.
            // `mergedShowConsideringDisabledProp` is not the final disabled status.
            // In ellpisis it's dynamic.
            void this.mergedShowConsideringDisabledProp
            const mergedShow = this.getMergedShow()
            return [
              this.internalTrapFocus && mergedShow
                ? withDirectives(
                    <div style={{ position: 'fixed', inset: 0 }} />,
                    [
                      [
                        zindexable,
                        {
                          enabled: mergedShow,
                          zIndex: this.zIndex
                        }
                      ]
                    ]
                )
                : null,
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
                {
                  default: () => this.$slots.default?.(),
                  header: () => this.$slots.header?.(),
                  footer: () => this.$slots.footer?.()
                }
              )
            ]
          }
        }}
      </VBinder>
    )
  }
})
