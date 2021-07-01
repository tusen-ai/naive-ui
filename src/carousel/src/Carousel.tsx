import {
  h,
  defineComponent,
  ref,
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
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ExtractPublicPropTypes } from '../../_utils'
import { carouselLight } from '../styles'
import type { CarouselTheme } from '../styles'
import style from './styles/index.cssr'

const carouselProps = {
  ...(useTheme.props as ThemeProps<CarouselTheme>),
  autoplay: Boolean,
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
    let dragStartTime = 0
    let memorizedContainerWidth = 0
    function handleTouchstart (e: TouchEvent): void {
      if (timerId !== null) {
        window.clearInterval(timerId)
      }
      e.preventDefault()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      memorizedContainerWidth = selfElRef.value!.offsetWidth
      touchingRef.value = true
      dragStartTime = Date.now()
      dragStartX = e.touches[0].clientX
      on('touchmove', document, handleTouchmove)
      on('touchend', document, handleTouchend)
      on('touchcancel', document, handleTouchend)
    }
    function handleTouchmove (e: TouchEvent): void {
      const dragOffset = e.touches[0].clientX - dragStartX
      dragOffsetRef.value =
        dragOffset > memorizedContainerWidth
          ? memorizedContainerWidth
          : dragOffset < -memorizedContainerWidth
            ? -memorizedContainerWidth
            : dragOffset
    }
    function handleTouchend (): void {
      if (props.autoplay) resetInterval()
      void nextTick(() => {
        touchingRef.value = false
      })
      const { value: selfEl } = selfElRef
      if (selfEl) {
        const { offsetWidth } = selfEl
        const { value: dragOffset } = dragOffsetRef
        const duration = Date.now() - dragStartTime
        // more than 50% width or faster than 0.4px per ms
        if (dragOffset > offsetWidth / 2 || dragOffset / duration > 0.4) {
          prev()
        } else if (
          dragOffset < -offsetWidth / 2 ||
          dragOffset / duration < -0.4
        ) {
          next()
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
          self: { dotColor, dotColorActive, dotSize }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--dot-color': dotColor,
          '--dot-color-active': dotColorActive,
          '--dot-size': dotSize
        }
      })
    }
  },
  render () {
    const {
      mergedClsPrefix,
      current,
      lengthRef,
      $slots: { default: defaultSlot }
    } = this
    const children = defaultSlot?.().filter((v) => v) || []
    const { length } = children
    lengthRef.value = length
    const leftOverflowVNode = length ? cloneVNode(children[length - 1]) : null
    const rightOverflowVNode = length ? cloneVNode(children[0]) : null
    const total = length + 2
    return (
      <div
        class={`${mergedClsPrefix}-carousel`}
        style={this.cssVars as CSSProperties}
        ref="selfElRef"
      >
        <div
          class={`${mergedClsPrefix}-carousel__slides`}
          onTouchstart={this.handleTouchstart}
          style={{
            width: `${total}00%`,
            transition: this.touching ? 'none' : '',
            transform:
              `translate3d(-${(100 / total) * (current % total)}%, 0, 0)` +
              (this.touching ? `translateX(${this.dragOffset}px)` : '')
          }}
          onTransitionend={this.handleTransitionEnd}
          role="listbox"
        >
          {[leftOverflowVNode, ...children, rightOverflowVNode].map(
            (vNode, i) => (
              <div
                data-index={i}
                style={{ width: `${100 / total}%` }}
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
                onKeydown={(e) => this.handleKeydown(e, i + 1)}
              />
            )
          })}
        </div>
      </div>
    )
  }
})
