import {
  h,
  defineComponent,
  ref,
  toRef,
  cloneVNode,
  nextTick,
  computed,
  CSSProperties,
  onMounted,
  watchEffect,
  onBeforeUnmount,
  PropType
} from 'vue'
import { indexMap } from 'seemly'
import { on, off } from 'evtd'
import { BackwardIcon, ForwardIcon } from '../../_internal/icons'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { flatten } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { carouselLight } from '../styles'
import type { CarouselTheme } from '../styles'
import style from './styles/index.cssr'

const carouselProps = {
  ...(useTheme.props as ThemeProps<CarouselTheme>),
  showArrow: Boolean,
  autoplay: Boolean,
  dotPlacement: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'bottom'
  },
  interval: {
    type: Number,
    default: 5000
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  }
}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

export default defineComponent({
  name: 'Carousel',
  props: carouselProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const currentRef = ref(1)
    const lengthRef = { value: 1 }
    const touchingRef = ref(false)
    const dragOffsetRef = ref(0)
    const selfElRef = ref<HTMLDivElement | null>(null)
    const dotPlacementRef = toRef(props, 'dotPlacement')
    let timerId: number | null = null
    let inTransition = false
    // current from 0 to length + 1
    function next (): void {
      if (lengthRef.value <= 1) return
      if (inTransition) return
      inTransition = true
      // no need for reset since transitionend handler will handle it
      currentRef.value++
    }
    function prev (): void {
      if (lengthRef.value <= 1) return
      if (inTransition) return
      inTransition = true
      // no need for reset since transitionend handler will handle it
      currentRef.value--
    }
    function setCurrent (value: number): void {
      if (lengthRef.value <= 1) return
      if (inTransition) return
      const { value: current } = currentRef
      if (value === current) return
      inTransition = true
      if (current === 1 && value === lengthRef.value && value - current > 1) {
        currentRef.value--
      } else if (
        value === 1 &&
        current === lengthRef.value &&
        current - value > 1
      ) {
        currentRef.value++
      } else {
        currentRef.value = value
      }
      if (props.autoplay) {
        resetInterval()
      }
    }
    // slot    [ 0 1 2 ]
    // index   0 1 2 3 4
    // display 2 0 1 2 0
    function handleTransitionEnd (e: TransitionEvent): void {
      const target = e.target as HTMLDivElement
      if (target !== e.currentTarget) return
      const { value: current } = currentRef
      const { value: length } = lengthRef
      const nextCurrent =
        current === 0 ? length : current === length + 1 ? 1 : null
      if (nextCurrent !== null) {
        currentRef.value = nextCurrent
        void nextTick(() => {
          target.style.transition = 'none'
          void target.offsetWidth
          target.style.transition = ''
          inTransition = false
        })
      } else {
        inTransition = false
      }
    }
    function handleKeydown (e: KeyboardEvent, current: number): void {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          setCurrent(current)
      }
    }
    let dragStartX = 0
    let dragStartY = 0
    let dragStartTime = 0
    let memorizedContainerWidth = 0
    let memorizedContainerHeight = 0
    function handleTouchstart (e: TouchEvent): void {
      if (timerId !== null) {
        window.clearInterval(timerId)
      }
      e.preventDefault()
      const { value: dotPlacement } = dotPlacementRef
      if (dotPlacement === 'left' || dotPlacement === 'right') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        memorizedContainerHeight = selfElRef.value!.offsetHeight
        touchingRef.value = true
        dragStartTime = Date.now()
        dragStartY = e.touches[0].clientY
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        memorizedContainerWidth = selfElRef.value!.offsetWidth
        touchingRef.value = true
        dragStartTime = Date.now()
        dragStartX = e.touches[0].clientX
      }
      on('touchmove', document, handleTouchmove)
      on('touchend', document, handleTouchend)
      on('touchcancel', document, handleTouchend)
    }
    function handleTouchmove (e: TouchEvent): void {
      const { value: dotPlacement } = dotPlacementRef
      if (dotPlacement === 'left' || dotPlacement === 'right') {
        const dragOffset = e.touches[0].clientY - dragStartY
        dragOffsetRef.value =
          dragOffset > memorizedContainerHeight
            ? memorizedContainerHeight
            : dragOffset < -memorizedContainerHeight
              ? -memorizedContainerHeight
              : dragOffset
      } else {
        const dragOffset = e.touches[0].clientX - dragStartX
        dragOffsetRef.value =
          dragOffset > memorizedContainerWidth
            ? memorizedContainerWidth
            : dragOffset < -memorizedContainerWidth
              ? -memorizedContainerWidth
              : dragOffset
      }
    }
    function handleTouchend (): void {
      if (props.autoplay) resetInterval()
      void nextTick(() => {
        touchingRef.value = false
      })
      const { value: selfEl } = selfElRef
      if (selfEl) {
        const { offsetWidth, offsetHeight } = selfEl
        const { value: dragOffset } = dragOffsetRef
        const duration = Date.now() - dragStartTime
        const { value: dotPlacement } = dotPlacementRef
        // more than 50% width or faster than 0.4px per ms
        if (dotPlacement === 'left' || dotPlacement === 'right') {
          if (dragOffset > offsetHeight / 2 || dragOffset / duration > 0.4) {
            prev()
          } else if (
            dragOffset < -offsetHeight / 2 ||
            dragOffset / duration < -0.4
          ) {
            next()
          }
        } else {
          if (dragOffset > offsetWidth / 2 || dragOffset / duration > 0.4) {
            prev()
          } else if (
            dragOffset < -offsetWidth / 2 ||
            dragOffset / duration < -0.4
          ) {
            next()
          }
        }
      }
      dragOffsetRef.value = 0
      off('touchmove', document, handleTouchmove)
      off('touchend', document, handleTouchend)
      off('touchcancel', document, handleTouchend)
    }
    function handleMouseenter (current: number): void {
      if (props.trigger === 'hover') {
        setCurrent(current)
      }
    }
    function resetInterval (): void {
      if (timerId !== null) {
        window.clearInterval(timerId)
      }
      timerId = window.setInterval(() => {
        next()
      }, props.interval)
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.autoplay) {
          resetInterval()
        } else {
          if (timerId !== null) {
            window.clearInterval(timerId)
          }
        }
      })
    })
    onBeforeUnmount(() => {
      if (timerId !== null) {
        window.clearInterval(timerId)
      }
    })
    const themeRef = useTheme(
      'Carousel',
      'Carousel',
      style,
      carouselLight,
      props
    )
    return {
      selfElRef,
      mergedClsPrefix: mergedClsPrefixRef,
      current: currentRef,
      lengthRef,
      touching: touchingRef,
      dragOffset: dragOffsetRef,
      prev,
      next,
      setCurrent,
      handleKeydown,
      handleTouchstart,
      handleTransitionEnd,
      handleMouseenter,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { dotColor, dotColorActive, dotSize, arrowColor }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-dot-color': dotColor,
          '--n-dot-color-active': dotColorActive,
          '--n-dot-size': dotSize,
          '--n-arrow-color': arrowColor
        }
      })
    }
  },
  render () {
    const {
      showArrow,
      dotPlacement,
      mergedClsPrefix,
      current,
      lengthRef,
      autoplay,
      $slots: { default: defaultSlot }
    } = this
    const children = flatten(defaultSlot?.() || [])
    const { length } = children
    lengthRef.value = length
    const leftOverflowVNode = length ? cloneVNode(children[length - 1]) : null
    const rightOverflowVNode = length ? cloneVNode(children[0]) : null
    const total = length + 2
    const vertical = dotPlacement === 'left' || dotPlacement === 'right'
    return (
      <div
        class={[
          `${mergedClsPrefix}-carousel`,
          `${mergedClsPrefix}-carousel--${this.dotPlacement}`
        ]}
        style={this.cssVars as CSSProperties}
        ref="selfElRef"
      >
        <div
          class={`${mergedClsPrefix}-carousel__slides`}
          onTouchstart={this.handleTouchstart}
          style={{
            [vertical ? 'height' : 'width']: `${total}00%`,
            [vertical ? 'width' : 'height']: '100%',
            transition: this.touching ? 'none' : '',
            transform: vertical
              ? `translate3d(0, -${(100 / total) * (current % total)}%, 0)` +
                (this.touching ? `translateY(${this.dragOffset}px)` : '')
              : `translate3d(-${(100 / total) * (current % total)}%, 0, 0)` +
                (this.touching ? `translateX(${this.dragOffset}px)` : '')
          }}
          onTransitionend={this.handleTransitionEnd}
          role="listbox"
        >
          {[leftOverflowVNode, ...children, rightOverflowVNode].map(
            (vNode, i) => (
              <div
                data-index={i}
                style={{ [vertical ? 'height' : 'width']: `${100 / total}%` }}
                key={i}
                role="option"
                aria-hidden={i !== current}
              >
                {vNode}
              </div>
            )
          )}
        </div>
        <div class={`${mergedClsPrefix}-carousel__dots`} role="tablist">
          {indexMap(length, (i) => {
            const selected = i + 1 === current
            return (
              <div
                aria-selected={selected}
                role="button"
                tabindex="0"
                class={[
                  `${mergedClsPrefix}-carousel__dot`,
                  selected && `${mergedClsPrefix}-carousel__dot--active`
                ]}
                onClick={() => this.setCurrent(i + 1)}
                onMouseenter={() => this.handleMouseenter(i + 1)}
                onMousedown={
                  autoplay
                    ? (e) => {
                        e.preventDefault()
                      }
                    : undefined
                }
                onKeydown={(e) => this.handleKeydown(e, i + 1)}
              />
            )
          })}
        </div>
        {showArrow && [
          <div
            class={[
              `${mergedClsPrefix}-carousel__arrow`,
              `${mergedClsPrefix}-carousel__arrow--${
                vertical ? 'bottom' : 'right'
              }`
            ]}
            role="button"
            onClick={() => {
              this.next()
            }}
          >
            <ForwardIcon />
          </div>,
          <div
            class={[
              `${mergedClsPrefix}-carousel__arrow`,
              `${mergedClsPrefix}-carousel__arrow--${vertical ? 'top' : 'left'}`
            ]}
            role="button"
            onClick={() => {
              this.prev()
            }}
          >
            <BackwardIcon />
          </div>
        ]}
      </div>
    )
  }
})
