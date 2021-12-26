import {
  h,
  defineComponent,
  ref,
  provide,
  cloneVNode,
  computed,
  CSSProperties,
  onBeforeUnmount,
  PropType,
  VNode,
  watch,
  withDirectives,
  vShow,
  Transition,
  toRef,
  nextTick
} from 'vue'
import { on, off } from 'evtd'
import { useConfig, useTheme, ThemeProps } from '../../_mixins'
import { flatten, ExtractPublicPropTypes } from '../../_utils'
import { carouselLight, CarouselTheme } from '../styles'
import { VResizeObserver } from 'vueuc'
import { Direction, carouselSlideInjectionKey } from './interface'
import { calculateSize, isTouchEvent } from './utils'
import { extend } from 'lodash'
import style from './styles/index.cssr'
import NCarouselDots from './CarouselDots'
import NCarouselArrow from './CarouselArrow'
import NCarouselItem from './CarouselItem'

const carouselProps = {
  ...(useTheme.props as ThemeProps<CarouselTheme>),
  defaultIndex: {
    type: Number,
    default: 0
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  showArrow: Boolean,
  effect: {
    type: String as PropType<'slide' | 'fade' | 'card'>,
    default: 'slide'
  },
  centeredSlides: {
    type: Boolean
  },
  slidesPerView: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'horizontal'
  },
  autoplay: Boolean,
  loop: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  speed: {
    type: Number,
    default: 300
  },
  transitionName: String,
  transitionTimingFunction: String,
  mousewheel: Boolean,
  keyboard: Boolean,
  draggable: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  dotStyle: {
    type: String as PropType<'dot' | 'line' | 'progress' | 'never'>,
    default: 'dot'
  },
  dotPlacement: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'bottom'
  }
}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

// only one carousel is allowed to trigger touch globally
let globalTounching = false

function clampValue (value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

export default defineComponent({
  name: 'Carousel',
  props: carouselProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    // dom
    const selfElRef = ref<HTMLDivElement | null>(null)
    const slidesRef = ref<HTMLElement[]>([])

    const userWantControlRef = computed(
      () => typeof props.transitionName === 'string'
    )
    const translateableRef = computed(
      () => !userWantControlRef.value && props.effect === 'slide'
    )

    // Because of the nature of the loop slide work,
    // we need to add duplicates to the left and right of the carousel
    // slot    [ 0 1 2 ]
    // index   0 1 2 3 4
    // display 2 0 1 2 0
    const duplicatedableRef = computed(
      // only duplicate the copy operation in `slide` mode,
      // because other effects have special process
      () => !userWantControlRef.value && props.loop && props.effect === 'slide'
    )
    const initializeIndex =
      props.defaultIndex + (duplicatedableRef.value ? 1 : 0)
    const displayIndexRef = ref(0)
    const virtualIndexRef = ref(initializeIndex)
    const realityIndexRef = ref(initializeIndex)

    const wrapperSizeRef = ref({ width: 0, height: 0 })
    const slideSizesRef = computed(() => {
      const { value: slides } = slidesRef
      const { value: wrapperSize } = wrapperSizeRef
      const { length } = slides
      if (!length) return []
      const { direction, slidesPerView } = props
      const axis = direction === 'vertical' ? 'height' : 'width'
      const unevent = slidesPerView === 'auto' && !userWantControlRef.value
      let perViewSize = wrapperSize[axis]
      if (!unevent && slidesPerView !== 'auto') {
        perViewSize -= (slidesPerView - 1) * props.spaceBetween
      }
      const slidesPerRatio =
        slidesPerView !== 'auto' ? 1 / Math.max(1, slidesPerView) : 1
      const slideSizes = []
      for (let i = 0; i < slides.length; i++) {
        if (unevent) {
          slideSizes[i] = calculateSize(slides[i])
        } else {
          slideSizes[i] = {
            ...wrapperSize,
            [axis]: perViewSize * slidesPerRatio
          }
        }
      }
      return slideSizes
    })
    const slideTranlatesRef = computed(() => {
      const translates: number[] = []
      const { value: slideSizes } = slideSizesRef
      if (!slideSizes.length) return translates
      const { direction, centeredSlides, spaceBetween } = props
      const axis = direction === 'vertical' ? 'height' : 'width'
      const wrapperSize = wrapperSizeRef.value[axis]
      let previousTranslate = 0
      for (let i = 0; i < slideSizes.length; i++) {
        let translate = previousTranslate
        const slideSize = slideSizes[i][axis]
        if (centeredSlides) {
          translate += (slideSize - wrapperSize) / 2
        }
        translates.push(translate)
        previousTranslate += slideSize + spaceBetween
      }
      return translates
    })
    const slideStylesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      if (!slideSizes.length) return []
      const { direction, effect, spaceBetween } = props
      const isVertical = direction === 'vertical'
      const axis = isVertical ? 'height' : 'width'
      const directionAxis = isVertical ? 'top' : 'left'
      const spaceAxis = isVertical ? 'bottom' : 'right'
      const { value: slideTranlates } = slideTranlatesRef
      const { value: userWantControl } = userWantControlRef
      // reduce the impact of reactivity effects
      const _isActive = makeUniqueTrulyFunction(isActive)
      const _isPrev = makeUniqueTrulyFunction(isPrev)
      const _isNext = makeUniqueTrulyFunction(isNext)
      return slideSizes.map((size, i) => {
        if (userWantControl) {
          return {
            [axis]: `${size[axis]}px`
          }
        }
        const offset = slideTranlates[i]
        const style: Record<string, any> = {
          [axis]: `${size[axis]}px`,
          [`margin-${spaceAxis}`]: `${spaceBetween}px`,
          transitionDuration: `${props.speed}ms`,
          transitionTimingFunction: props.transitionTimingFunction
        }
        if (effect === 'fade') {
          const active = _isActive(i)
          extend(style, {
            opacity: active ? 1 : 0,
            [directionAxis]: `${-offset}px`
          })
        } else if (effect === 'card') {
          const active = _isActive(i)
          let opacity = active ? 1 : 0
          let translate = 0
          let translateZ = active ? 0 : -400
          if (_isPrev(i)) {
            opacity = 0.4
            translate = -size[axis] * 0.5
            translateZ = -200
          } else if (_isNext(i)) {
            opacity = 0.4
            translate = size[axis] * 0.5
            translateZ = -200
          }
          extend(style, {
            opacity,
            [directionAxis]: `${-offset}px`,
            transform: `${
              isVertical
                ? `translateY(${translate}px)`
                : `translateX(${translate}px)`
            } translateZ(${translateZ}px)`,
            zIndex: active ? 1 : 0
          })
        }
        return style
      })
    })

    // provide
    function isPrev (slide: HTMLElement | number): boolean {
      return getPrevIndex(virtualIndexRef.value) === getSlideIndex(slide)
    }
    function isNext (slide: HTMLElement | number): boolean {
      return getNextIndex(virtualIndexRef.value) === getSlideIndex(slide)
    }
    function isActive (slide: HTMLElement | number): boolean {
      return virtualIndexRef.value === getSlideIndex(slide)
    }
    function getSlideIndex (slide: HTMLElement | number): number {
      return typeof slide === 'number' ? slide : slidesRef.value.indexOf(slide)
    }
    function getPrevIndex (index: number): number | null {
      return index === 0
        ? props.loop
          ? slidesRef.value.length - 1
          : null
        : index - 1
    }
    function getNextIndex (index: number): number | null {
      return index === slidesRef.value.length - 1
        ? props.loop
          ? 0
          : null
        : index + 1
    }
    function getSlideStyle (slide: HTMLElement | number): any {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        return slideStylesRef.value[index]
      }
    }
    function getDisplayIndex (slide: HTMLElement | number): number {
      const index = getSlideIndex(slide)
      const length = slidesRef.value.length
      return !duplicatedableRef.value
        ? index
        : index === 0
          ? length - 3
          : index === length - 1
            ? 0
            : index - 1
    }
    function addSlide (slide: HTMLElement): void {
      slidesRef.value.push(slide)
    }
    function removeSlide (slide: HTMLElement): void {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        slidesRef.value.splice(index, 1)
      }
    }

    provide(carouselSlideInjectionKey, {
      slideTo,
      slidePrev,
      slideNext,
      isPrev,
      isNext,
      isActive,
      getSlideIndex,
      getDisplayIndex,
      addSlide,
      removeSlide,
      getSlideStyle
    })

    // record the translate of each slide, so that it can be restored at touch
    let previousTranslate = 0

    // slide
    function internalSlideTo (index: number, duration = props.speed): void {
      const length = slidesRef.value.length
      if (index === -1) index = length - 1
      if (index === length) index = 0
      if (index < 0) {
        index = 0
      } else if (index > length - 1) {
        index = length - 1
      }
      if (index !== virtualIndexRef.value) {
        const displayIndex = (displayIndexRef.value = getDisplayIndex(index))
        virtualIndexRef.value = index
        realityIndexRef.value = duplicatedableRef.value
          ? displayIndex + 1
          : displayIndex
        if (translateableRef.value) {
          translateTo(index, duration)
        }
      }
    }
    function slideTo (index: number): void {
      const { value: duplicatedable } = duplicatedableRef
      const { length } = slidesRef.value
      if (duplicatedable) {
        index = clampValue(index + 1, 1, length - 2)
      } else {
        index = clampValue(index, 0, length - 1)
      }
      internalSlideTo(index)
    }
    function slidePrev (): void {
      const prevIndex = getPrevIndex(realityIndexRef.value)
      if (prevIndex !== null) {
        internalSlideTo(prevIndex)
      }
    }
    function slideNext (): void {
      const nextIndex = getNextIndex(realityIndexRef.value)
      if (nextIndex !== null) {
        internalSlideTo(nextIndex)
      }
    }
    function translateTo (index: number, duration = props.speed): void {
      inTransition = true
      updateTranslate(
        (previousTranslate = slideTranlatesRef.value[index] || 0),
        duration
      )
    }

    // autoplay
    let autoplayTimer: NodeJS.Timeout | null = null
    function resetAutoplay (cleanOnly?: boolean): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
      const { autoplay, interval } = props
      if (autoplay && interval && !cleanOnly) {
        autoplayTimer = setInterval(slideNext, interval)
      }
    }
    function mesureAutoplay (): void {
      const { autoplay } = props
      if (!autoplayTimer && autoplay) {
        resetAutoplay()
      } else if (!autoplay || !slidesRef.value.length) {
        resetAutoplay(true)
      }
    }

    // translate
    const translateStyleRef = ref({
      transform: '',
      transitionDuration: '',
      transitionTimingFunction: ''
    })
    let inTransition = false
    function updateTranslate (translate: number, duration = 0): void {
      const isVersical = props.direction === 'vertical'
      translateStyleRef.value = {
        transform: isVersical
          ? `translateY(${-translate}px)`
          : `translateX(${-translate}px)`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: props.transitionTimingFunction || ''
      }
    }
    function handleTransitionEnd (): void {
      const { value: virtualIndex } = virtualIndexRef
      const { value: realityIndex } = realityIndexRef
      if (inTransition && virtualIndex !== realityIndex) {
        internalSlideTo(realityIndex, 0)
      } else {
        resetAutoplay()
      }
      inTransition = false
    }
    function fixTranslate (): void {
      const translate = slideTranlatesRef.value[realityIndexRef.value]
      if (translate !== previousTranslate && translateableRef.value) {
        updateTranslate((previousTranslate = translate))
      }
    }

    // event handle
    let dragStartX = 0
    let dragStartY = 0
    let dragOffset = 0
    let dragStartTime = 0
    function handleTouchstart (event: MouseEvent | TouchEvent): void {
      if (globalTounching) return
      globalTounching = true
      dragStartTime = Date.now()
      // stop autoplay
      resetAutoplay(true)
      const isTouch = isTouchEvent(event)
      if (!isTouch && !(event.target as HTMLElement).isContentEditable) {
        event.preventDefault()
      }
      const touchEvent = isTouch ? event.touches[0] : event
      if (props.direction === 'vertical') {
        dragStartY = touchEvent.clientY
      } else {
        dragStartX = touchEvent.clientX
      }
      on('touchmove', document, handleTouchmove)
      on('touchend', document, handleTouchend)
      on('touchcancel', document, handleTouchend)
      on('mousemove', document, handleTouchmove)
      on('mouseup', document, handleTouchend)
    }
    function handleTouchmove (event: MouseEvent | TouchEvent): void {
      const isVertical = props.direction === 'vertical'
      const axis = isVertical ? 'height' : 'width'
      const perViewSize = wrapperSizeRef.value[axis]
      if (!perViewSize) return
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      const offset = isVertical
        ? touchEvent.clientY - dragStartY
        : touchEvent.clientX - dragStartX
      dragOffset = clampValue(offset, -perViewSize, perViewSize)
      if (translateableRef.value) {
        updateTranslate(previousTranslate - dragOffset, 0)
      }
    }
    function handleTouchend (): void {
      const duration = Date.now() - dragStartTime
      const { value: virtualIndex } = virtualIndexRef
      const { value: translateable } = translateableRef
      let currentIndex: number | null = virtualIndex
      // slide drag
      if (translateable && dragOffset !== 0) {
        const currentTranslate = previousTranslate - dragOffset
        const { value: slideTranlates } = slideTranlatesRef
        let prevOffset = null
        for (let i = 0; i < slideTranlates.length; i++) {
          const offset = Math.abs(slideTranlates[i] - currentTranslate)
          if (prevOffset !== null && prevOffset < offset) {
            break
          }
          prevOffset = offset
          currentIndex = i
        }
      }
      if (currentIndex === virtualIndex) {
        const axis = props.direction === 'vertical' ? 'height' : 'width'
        const wrapperSize = wrapperSizeRef.value[axis]
        // more than 50% width or faster than 0.4px per ms
        if (dragOffset > wrapperSize / 2 || dragOffset / duration > 0.4) {
          currentIndex = getPrevIndex(virtualIndex)
        } else if (
          dragOffset < -wrapperSize / 2 ||
          dragOffset / duration < -0.4
        ) {
          currentIndex = getNextIndex(virtualIndex)
        }
      }
      if (currentIndex !== null && currentIndex !== virtualIndex) {
        internalSlideTo(currentIndex)
      } else if (translateable) {
        updateTranslate(previousTranslate, props.speed)
      }
      dragOffset = 0
      globalTounching = false
      mesureAutoplay()
      off('touchmove', document, handleTouchmove)
      off('touchend', document, handleTouchend)
      off('touchcancel', document, handleTouchend)
      off('mousemove', document, handleTouchmove)
      off('mouseup', document, handleTouchend)
    }
    function handleMousewheel (event: WheelEvent): void {
      event.preventDefault()
      if (inTransition) return
      if (props.mousewheel && props.direction === 'vertical') {
        const deltaY = event.deltaY
        if (deltaY >= 100) {
          slideNext()
        } else if (deltaY <= -100) {
          slidePrev()
        }
      }
    }
    function handleResize (): void {
      wrapperSizeRef.value = calculateSize(selfElRef.value as HTMLElement, true)
    }
    onBeforeUnmount(() => {
      resetAutoplay(true)
      off('touchmove', document, handleTouchmove)
      off('touchend', document, handleTouchend)
      off('touchcancel', document, handleTouchend)
      off('mousemove', document, handleTouchmove)
      off('mouseup', document, handleTouchend)
    })
    watch(slideSizesRef, () => {
      if (translateableRef.value) {
        fixTranslate()
      }
      resetAutoplay()
    })
    watch(translateableRef, value => {
      if (!value) {
        translateTo((previousTranslate = 0))
      } else {
        fixTranslate()
      }
    })
    watch(
      duplicatedableRef,
      () => void nextTick(() => slideTo(displayIndexRef.value))
    )
    watch(toRef(props, 'activeIndex'), index => slideTo(index))
    const themeRef = useTheme(
      'Carousel',
      'Carousel',
      style,
      carouselLight,
      props
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      duplicatedable: duplicatedableRef,
      userWantControl: userWantControlRef,
      displayIndex: displayIndexRef,
      realityIndex: realityIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      handleTouchstart,
      handleTransitionEnd,
      handleResize,
      handleMousewheel,
      // public
      slideTo,
      slidePrev,
      slideNext,
      isPrev,
      isNext,
      isActive,
      getPrevIndex,
      getNextIndex,
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
      mergedClsPrefix,
      showArrow,
      userWantControl,
      displayIndex,
      slideStyles,
      dotStyle,
      dotPlacement,
      draggable,
      mousewheel,
      $slots: { default: defaultSlots, dots: dotsSlot, arrow: arrowSlot }
    } = this
    const children = (defaultSlots && flatten(defaultSlots())) || []
    let slides = filterCarouselItem(children)
    if (!slides.length) {
      slides = children.map((children, i) => (
        <NCarouselItem>
          {{
            default: () => cloneVNode(children)
          }}
        </NCarouselItem>
      ))
    }
    const { length: realityLength } = slides
    if (realityLength > 1 && this.duplicatedable) {
      slides.push(duplicateSlide(slides[0], 0, 'append'))
      slides.unshift(
        duplicateSlide(slides[realityLength - 1], realityLength - 1, 'prepend')
      )
    }
    return (
      <div
        ref='selfElRef'
        class={[
          `${mergedClsPrefix}-carousel`,
          `${mergedClsPrefix}-carousel--${dotPlacement}`,
          `${mergedClsPrefix}-carousel--${this.direction}`,
          {
            [`${mergedClsPrefix}-carousel--usercontrol`]: userWantControl
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <VResizeObserver onResize={this.handleResize}>
          {{
            default: () => (
              <div
                class={`${mergedClsPrefix}-carousel__slides`}
                role='listbox'
                style={this.translateStyle}
                onMousedown={draggable ? this.handleTouchstart : undefined}
                onTouchstart={draggable ? this.handleTouchstart : undefined}
                onWheel={mousewheel ? this.handleMousewheel : undefined}
                onTransitionend={this.handleTransitionEnd}
              >
                {userWantControl
                  ? slides.map((slide, i) => (
                    <div style={slideStyles[i]}>
                      {withDirectives(
                        <Transition name={this.transitionName}>
                          {{
                            default: () => slide
                          }}
                        </Transition>,
                        [[vShow, this.isActive(i)]]
                      )}
                    </div>
                  ))
                  : slides}
              </div>
            )
          }}
        </VResizeObserver>
        {dotStyle !== 'never' && (
          <div
            class={[
              `${mergedClsPrefix}-carousel__dots`,
              `${mergedClsPrefix}-carousel__dots--${dotStyle}`
            ]}
            role='tablist'
          >
            {dotsSlot ? (
              dotsSlot({
                total: realityLength,
                current: displayIndex + 1,
                placement: dotPlacement,
                slideTo: this.slideTo
              })
            ) : (
              <NCarouselDots
                trigger={this.trigger}
                total={realityLength}
                current={displayIndex}
                dotStyle={dotStyle}
                dotPlacement={dotPlacement}
              />
            )}
          </div>
        )}
        {showArrow &&
          (arrowSlot ? (
            arrowSlot({
              total: realityLength,
              current: displayIndex + 1,
              slideTo: this.slideTo,
              slidePrev: this.slidePrev,
              slideNext: this.slideNext,
              getPrevIndex: this.getPrevIndex,
              getNextIndex: this.getNextIndex,
              disabledPrev: this.getPrevIndex(this.realityIndex) === null,
              disabledNext: this.getNextIndex(this.realityIndex) === null
            })
          ) : (
            <NCarouselArrow
              direction={this.direction}
              keyboard={this.keyboard}
            />
          ))}
      </div>
    )
  }
})

function filterCarouselItem (
  vnodes: VNode[],
  carouselItems: VNode[] = []
): VNode[] {
  if (Array.isArray(vnodes)) {
    vnodes.forEach(vnode => {
      if (vnode.type && (vnode.type as any).name === 'CarouselItem') {
        carouselItems.push(vnode)
      }
    })
  }
  return carouselItems
}

function duplicateSlide (
  child: VNode,
  index: number,
  position: 'prepend' | 'append'
): VNode {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index}-${position}`
  })
}

function makeUniqueTrulyFunction<T extends (...args: any[]) => boolean> (
  func: T
): T {
  let neverTruly = false
  return ((...args) => {
    if (neverTruly) return false
    const result = func(...args)
    if (result) {
      neverTruly = true
    }
    return result
  }) as T
}
