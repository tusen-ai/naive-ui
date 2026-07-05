import type { CSSProperties, PropType, SlotsType, VNodeChild } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { ButtonProps } from '../../button'
import type { PopoverInst, PopoverPlacement } from '../../popover'
import type { GuideTheme } from '../styles'
import type {
  GuideInst,
  GuideSlots,
  GuideStep,
  GuideTargetRect
} from './interface'
import { zindexable } from 'vdirs'
import { useMergedState } from 'vooks'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  provide,
  ref,
  toRef,
  Transition,
  watch,
  withDirectives
} from 'vue'
import { VLazyTeleport } from 'vueuc'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { call, useAdjustedTo, useLockHtmlScroll, warnOnce } from '../../_utils'
import { NPopover } from '../../popover'
import { guideLight } from '../styles'
import GuidePanel from './GuidePanel'
import { guideInjectionKey } from './interface'
import style from './styles/index.cssr'

const emptyStep: GuideStep = {}
let guideId = 0

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function isHTMLElement(value: unknown): value is HTMLElement {
  return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement
}

function getPointFromRect(
  rect: GuideTargetRect,
  placement: PopoverPlacement
): { x: number, y: number } {
  const [side] = placement.split('-') as ['top' | 'right' | 'bottom' | 'left']
  switch (side) {
    case 'top':
      return { x: rect.left + rect.width / 2, y: rect.top }
    case 'right':
      return { x: rect.left + rect.width, y: rect.top + rect.height / 2 }
    case 'bottom':
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height }
    case 'left':
      return { x: rect.left, y: rect.top + rect.height / 2 }
  }
}

export const guideProps = {
  ...(useTheme.props as ThemeProps<GuideTheme>),
  steps: {
    type: Array as PropType<GuideStep[]>,
    default: () => []
  },
  current: Number,
  defaultCurrent: {
    type: Number,
    default: 1
  },
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultShow: Boolean,
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom'
  },
  showMask: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  blockScroll: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  targetGap: {
    type: Number,
    default: 0
  },
  targetPadding: Number,
  targetBorderRadius: {
    type: Number,
    default: 4
  },
  scrollIntoView: {
    type: Boolean,
    default: true
  },
  to: useAdjustedTo.propTo,
  zIndex: Number,
  prevText: String as PropType<string | null>,
  nextText: String as PropType<string | null>,
  finishText: String as PropType<string | null>,
  skipText: String as PropType<string | null>,
  prevButtonProps: Object as PropType<ButtonProps>,
  nextButtonProps: Object as PropType<ButtonProps>,
  finishButtonProps: Object as PropType<ButtonProps>,
  skipButtonProps: Object as PropType<ButtonProps>,
  'onUpdate:show': [Function, Array] as PropType<
    MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
    MaybeArray<(value: boolean) => void>
  >,
  'onUpdate:current': [Function, Array] as PropType<
    MaybeArray<(value: number) => void>
  >,
  onUpdateCurrent: [Function, Array] as PropType<
    MaybeArray<(value: number) => void>
  >,
  onNext: [Function, Array] as PropType<MaybeArray<(current: number) => void>>,
  onPrev: [Function, Array] as PropType<MaybeArray<(current: number) => void>>,
  onFinish: [Function, Array] as PropType<
    MaybeArray<(current: number) => void>
  >,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>
} as const

export type GuideProps = ExtractPublicPropTypes<typeof guideProps>

export default defineComponent({
  name: 'Guide',
  props: guideProps,
  slots: Object as SlotsType<GuideSlots>,
  setup(props) {
    const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled }
      = useConfig(props)
    const themeRef = useTheme(
      'Guide',
      '-guide',
      style,
      guideLight,
      props,
      mergedClsPrefixRef
    )
    const popoverRef = ref<PopoverInst | null>(null)
    const targetRectRef = ref<GuideTargetRect | null>(null)
    const popoverXRef = ref(0)
    const popoverYRef = ref(0)
    const maskId = `n-guide-mask-${guideId++}`
    const controlledShowRef = computed(() => props.show)
    const uncontrolledShowRef = ref(props.defaultShow)
    const mergedShowWithoutStepsRef = useMergedState(
      controlledShowRef,
      uncontrolledShowRef
    )
    const controlledCurrentRef = computed(() => props.current)
    const uncontrolledCurrentRef = ref(props.defaultCurrent)
    const mergedCurrentRef = useMergedState(
      controlledCurrentRef,
      uncontrolledCurrentRef
    )
    const totalRef = computed(() => props.steps.length)
    const boundedCurrentRef = computed(() => {
      const total = totalRef.value
      if (!total)
        return 1
      return clamp(mergedCurrentRef.value || 1, 1, total)
    })
    const mergedShowRef = computed(() => {
      return totalRef.value > 0 && mergedShowWithoutStepsRef.value
    })
    const activeStepRef = computed(() => {
      return props.steps[boundedCurrentRef.value - 1] ?? emptyStep
    })
    const mergedPlacementRef = computed(() => {
      return activeStepRef.value.placement ?? props.placement
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { maskColor }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-mask-color': maskColor
      }
    })
    const popoverThemeOverridesRef = computed(() => {
      const {
        self: {
          borderRadius,
          boxShadow,
          color,
          fontSize,
          textColor,
          popoverPadding
        }
      } = themeRef.value
      return {
        borderRadius,
        boxShadow,
        color,
        fontSize,
        textColor,
        padding: popoverPadding
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('guide', undefined, cssVarsRef, props)
      : undefined

    function doUpdateShow(value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      uncontrolledShowRef.value = value
      if (onUpdateShow)
        call(onUpdateShow, value)
      if (_onUpdateShow)
        call(_onUpdateShow, value)
    }

    function doUpdateCurrent(value: number): void {
      const total = totalRef.value
      const nextCurrent = total ? clamp(value, 1, total) : 1
      const { onUpdateCurrent, 'onUpdate:current': _onUpdateCurrent } = props
      uncontrolledCurrentRef.value = nextCurrent
      if (onUpdateCurrent)
        call(onUpdateCurrent, nextCurrent)
      if (_onUpdateCurrent)
        call(_onUpdateCurrent, nextCurrent)
    }

    function resolveTarget(step: GuideStep): HTMLElement | null {
      const { target } = step
      if (!target)
        return null
      if (typeof target === 'string') {
        if (typeof document === 'undefined')
          return null
        const element = document.querySelector(target)
        if (!element) {
          if (__DEV__) {
            warnOnce('guide', `target selector \`${target}\` is not found.`)
          }
          return null
        }
        return element as HTMLElement
      }
      if (typeof target === 'function')
        return target()
      if (isHTMLElement(target))
        return target
      return null
    }

    function updateTargetRect(target: HTMLElement | null): void {
      if (typeof window === 'undefined') {
        targetRectRef.value = null
        return
      }
      if (!target) {
        targetRectRef.value = null
        popoverXRef.value = window.innerWidth / 2
        popoverYRef.value = window.innerHeight / 2
        return
      }
      const rect = target.getBoundingClientRect()
      const padding = props.targetPadding ?? props.targetGap
      const guideRect = {
        top: Math.max(rect.top - padding, 0),
        left: Math.max(rect.left - padding, 0),
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
        borderRadius: props.targetBorderRadius
      }
      const point = getPointFromRect(guideRect, mergedPlacementRef.value)
      targetRectRef.value = guideRect
      popoverXRef.value = point.x
      popoverYRef.value = point.y
    }

    function syncPosition(options: { scroll?: boolean } = {}): void {
      if (typeof window === 'undefined')
        return
      const step = activeStepRef.value
      const target = resolveTarget(step)
      if (options.scroll && target && props.scrollIntoView) {
        target.scrollIntoView?.({
          block: 'center',
          inline: 'center',
          behavior: 'smooth'
        })
        window.requestAnimationFrame(() => {
          updateTargetRect(resolveTarget(step))
          popoverRef.value?.syncPosition()
        })
      }
      else {
        updateTargetRect(target)
        popoverRef.value?.syncPosition()
      }
    }

    function next(): void {
      const current = boundedCurrentRef.value
      if (current >= totalRef.value) {
        finish()
        return
      }
      const nextCurrent = current + 1
      doUpdateCurrent(nextCurrent)
      if (props.onNext)
        call(props.onNext, nextCurrent)
    }

    function prev(): void {
      const current = boundedCurrentRef.value
      if (current <= 1)
        return
      const nextCurrent = current - 1
      doUpdateCurrent(nextCurrent)
      if (props.onPrev)
        call(props.onPrev, nextCurrent)
    }

    function close(): void {
      doUpdateShow(false)
      if (props.onClose)
        call(props.onClose)
    }

    function finish(): void {
      const current = boundedCurrentRef.value
      if (props.onFinish)
        call(props.onFinish, current)
      doUpdateShow(false)
    }

    function handleMaskClick(): void {
      if (props.maskClosable)
        close()
    }

    function handleDocumentKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape' && props.closeOnEsc && mergedShowRef.value) {
        close()
      }
    }

    let cleanupEvents: (() => void) | undefined
    function bindEvents(): void {
      if (typeof window === 'undefined' || cleanupEvents)
        return
      const sync = (): void => {
        syncPosition()
      }
      window.addEventListener('resize', sync)
      window.addEventListener('scroll', sync, true)
      document.addEventListener('fullscreenchange', sync)
      document.addEventListener('keydown', handleDocumentKeydown)
      cleanupEvents = () => {
        window.removeEventListener('resize', sync)
        window.removeEventListener('scroll', sync, true)
        document.removeEventListener('fullscreenchange', sync)
        document.removeEventListener('keydown', handleDocumentKeydown)
        cleanupEvents = undefined
      }
    }

    function unbindEvents(): void {
      cleanupEvents?.()
    }

    watch(
      mergedShowRef,
      (show) => {
        if (show) {
          bindEvents()
        }
        else {
          unbindEvents()
        }
      },
      { immediate: true }
    )

    watch(
      [mergedShowRef, boundedCurrentRef, toRef(props, 'steps')],
      ([show]) => {
        if (show) {
          void nextTick(() => {
            syncPosition({ scroll: props.scrollIntoView })
          })
        }
      },
      {
        immediate: true,
        flush: 'post'
      }
    )

    useLockHtmlScroll(computed(() => props.blockScroll && mergedShowRef.value))
    onBeforeUnmount(unbindEvents)

    provide(guideInjectionKey, {
      mergedClsPrefixRef,
      mergedThemeRef: themeRef
    })

    const exposedMethods: GuideInst = {
      next,
      prev,
      finish,
      close,
      syncPosition
    }

    return {
      ...exposedMethods,
      namespace: namespaceRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      mergedShow: mergedShowRef,
      boundedCurrent: boundedCurrentRef,
      total: totalRef,
      activeStep: activeStepRef,
      targetRect: targetRectRef,
      popoverX: popoverXRef,
      popoverY: popoverYRef,
      mergedPlacement: mergedPlacementRef,
      maskId,
      popoverRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      popoverThemeOverrides: popoverThemeOverridesRef,
      handleMaskClick
    }
  },
  render() {
    const { mergedClsPrefix, targetRect } = this
    this.onRender?.()
    const maskNode = this.showMask ? (
      <svg
        class={`${mergedClsPrefix}-guide-mask`}
        onClick={this.handleMaskClick}
      >
        <defs>
          <mask id={this.maskId}>
            <rect width="100%" height="100%" fill="#fff" />
            {targetRect ? (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx={targetRect.borderRadius}
                ry={targetRect.borderRadius}
                fill="#000"
              />
            ) : null}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="var(--n-mask-color)"
          mask={`url(#${this.maskId})`}
        />
      </svg>
    ) : null
    const mergedShow = this.mergedShow
    const teleportDisabled = this.to === false
    const teleportTo = teleportDisabled
      ? undefined
      : this.to === true
        ? 'body'
        : this.to
    return (
      <VLazyTeleport
        show={mergedShow}
        to={teleportTo}
        disabled={teleportDisabled}
      >
        {{
          default: () =>
            mergedShow
              ? withDirectives(
                  <div
                    class={[
                      `${mergedClsPrefix}-guide`,
                      this.themeClass,
                      this.namespace
                    ]}
                    style={this.cssVars as CSSProperties}
                  >
                    {this.animated ? (
                      <Transition name="fade-in-transition">
                        {{ default: () => maskNode }}
                      </Transition>
                    ) : (
                      maskNode
                    )}
                    <NPopover
                      ref="popoverRef"
                      show
                      trigger="manual"
                      x={this.popoverX}
                      y={this.popoverY}
                      placement={this.mergedPlacement}
                      to={false}
                      animated={this.animated}
                      showArrow={this.activeStep.showArrow ?? true}
                      internalExtraClass={['guide-popover']}
                      theme={this.mergedTheme.peers.Popover}
                      themeOverrides={this.mergedTheme.peerOverrides.Popover}
                      builtinThemeOverrides={this.popoverThemeOverrides}
                    >
                      {{
                        default: (): VNodeChild => (
                          <GuidePanel
                            step={this.activeStep}
                            current={this.boundedCurrent}
                            total={this.total}
                            prevText={this.prevText}
                            nextText={this.nextText}
                            finishText={this.finishText}
                            skipText={this.skipText}
                            prevButtonProps={this.prevButtonProps}
                            nextButtonProps={this.nextButtonProps}
                            finishButtonProps={this.finishButtonProps}
                            skipButtonProps={this.skipButtonProps}
                            onPrev={this.prev}
                            onNext={this.next}
                            onFinish={this.finish}
                            onClose={this.close}
                          >
                            {this.$slots}
                          </GuidePanel>
                        )
                      }}
                    </NPopover>
                  </div>,
                  [[zindexable, { zIndex: this.zIndex, enabled: mergedShow }]]
                )
              : null
        }}
      </VLazyTeleport>
    )
  }
})
