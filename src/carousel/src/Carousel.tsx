/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  h,
  defineComponent,
  ref,
  cloneVNode,
  computed,
  onBeforeUnmount,
  watch,
  withDirectives,
  vShow,
  Transition,
  toRef,
  nextTick,
  onMounted,
  watchEffect,
  normalizeStyle,
  onUpdated
} from 'vue'
import type { CSSProperties, PropType, Ref, TransitionProps, VNode } from 'vue'
import { VResizeObserver } from 'vueuc'
import { useMergedState } from 'vooks'
import { on, off } from 'evtd'
import { getPreciseEventTarget } from 'seemly'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { flatten, keep, resolveSlotWithProps } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { carouselLight } from '../styles'
import type { CarouselTheme } from '../styles'
import {
  calculateSize,
  clampValue,
  resolveSpeed,
  isTouchEvent,
  getNextIndex,
  getPrevIndex,
  getDisplayIndex,
  getRealIndex,
  getDisplayTotalView,
  addDuplicateSlides
} from './utils'
import {
  provideCarouselContext,
  type CarouselContextValue
} from './CarouselContext'
import NCarouselDots from './CarouselDots'
import NCarouselArrow from './CarouselArrow'
import NCarouselItem, { isCarouselItem } from './CarouselItem'
import type {
  ArrowScopedSlotProps,
  CarouselInst,
  DotScopedSlotProps,
  Size
} from './interface'
import style from './styles/index.cssr'

const transitionProperties = [
  'transitionDuration',
  'transitionTimingFunction'
] as const

type TransitionStyle = Partial<
Pick<CSSProperties, (typeof transitionProperties)[number]>
>

export const carouselProps = {
  ...(useTheme.props as ThemeProps<CarouselTheme>),
  defaultIndex: {
    type: Number,
    default: 0
  },
  currentIndex: Number,
  showArrow: Boolean,
  dotType: {
    type: String as PropType<'dot' | 'line'>,
    default: 'dot'
  },
  dotPlacement: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'bottom'
  },
  slidesPerView: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 1
  },
  spaceBetween: {
    type: Number,
    default: 0
  },
  centeredSlides: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  autoplay: Boolean,
  interval: {
    type: Number,
    default: 5000
  },
  loop: {
    type: Boolean,
    default: true
  },
  effect: {
    type: String as PropType<'slide' | 'fade' | 'card' | 'custom'>,
    default: 'slide'
  },
  showDots: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  transitionStyle: {
    type: Object as PropType<TransitionStyle>,
    default: (): TransitionStyle => ({
      transitionDuration: '300ms'
    })
  },
  transitionProps: Object as PropType<TransitionProps>,
  draggable: Boolean,
  prevSlideStyle: [Object, String] as PropType<CSSProperties | string>,
  nextSlideStyle: [Object, String] as PropType<CSSProperties | string>,
  touchable: {
    type: Boolean,
    default: true
  },
  mousewheel: Boolean,
  keyboard: Boolean,
  'onUpdate:currentIndex': Function as PropType<
  (currentIndex: number, lastIndex: number) => void
  >,
  onUpdateCurrentIndex: Function as PropType<
  (currentIndex: number, lastIndex: number) => void
  >
}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

// only one carousel is allowed to trigger touch globally
let globalDragging = false

export default defineComponent({
  name: 'Carousel',
  props: carouselProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    // Dom
    const selfElRef = ref<HTMLDivElement | null>(null)
    const slidesElRef = ref<HTMLDivElement | null>(null)
    const slideElsRef = ref<HTMLElement[]>([])
    const slideVNodesRef = { value: [] as VNode[] }

    // Computed states
    const verticalRef = computed(() => props.direction === 'vertical')
    const sizeAxisRef = computed(() => (verticalRef.value ? 'height' : 'width'))
    const spaceAxisRef = computed(() =>
      verticalRef.value ? 'bottom' : 'right'
    )
    const sequenceLayoutRef = computed(() => props.effect === 'slide')
    const duplicatedableRef = computed(
      // duplicate the copy operation in `slide` mode,
      // because only its DOM is sequence layout
      () =>
        props.loop &&
        props.slidesPerView === 1 &&
        sequenceLayoutRef.value &&
        totalViewRef.value > 1
    )
    // user wants to control the transition animation
    const userWantsControlRef = computed(() => props.effect === 'custom')

    // used to calculate total views
    const displaySlidesPerViewRef = computed(() =>
      !sequenceLayoutRef.value || props.centeredSlides ? 1 : props.slidesPerView
    )
    // used to calculate the size of each slide
    const realSlidesPerViewRef = computed(() =>
      userWantsControlRef.value ? 1 : props.slidesPerView
    )
    // we automatically calculate total view for special slides per view
    const autoSlideSizeRef = computed(
      () =>
        displaySlidesPerViewRef.value === 'auto' ||
        (props.slidesPerView === 'auto' && props.centeredSlides)
    )

    // Carousel size
    const perViewSizeRef = ref({ width: 0, height: 0 })
    const slideSizesRef = computed(() => {
      const { value: slidesEls } = slideElsRef
      if (!slidesEls.length) return []
      const { value: autoSlideSize } = autoSlideSizeRef
      if (autoSlideSize) {
        return slidesEls.map((slide) => calculateSize(slide))
      }
      const { value: slidesPerView } = realSlidesPerViewRef
      const { value: perViewSize } = perViewSizeRef
      const { value: axis } = sizeAxisRef
      let axisSize = perViewSize[axis]
      if (slidesPerView !== 'auto') {
        const { spaceBetween } = props
        const remaining = axisSize - (slidesPerView - 1) * spaceBetween
        const percentage = 1 / Math.max(1, slidesPerView)
        axisSize = remaining * percentage
      }
      const slideSize = { ...perViewSize, [axis]: axisSize }
      return slidesEls.map(() => slideSize)
    })

    // The translate required to reach each slide
    const slideTranlatesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      if (!slideSizes.length) return []
      const { centeredSlides, spaceBetween } = props
      const { value: axis } = sizeAxisRef
      const { [axis]: perViewSize } = perViewSizeRef.value
      let previousTranslate = 0
      return slideSizes.map(({ [axis]: slideSize }) => {
        let translate = previousTranslate
        if (centeredSlides) {
          translate += (slideSize - perViewSize) / 2
        }
        previousTranslate += slideSize + spaceBetween
        return translate
      })
    })

    // Styles
    const isMountedRef = ref(false)
    const transitionStyleRef = computed(() => {
      const { transitionStyle } = props
      return transitionStyle
        ? keep(transitionStyle, transitionProperties as any)
        : {}
    })
    const speedRef = computed(() =>
      userWantsControlRef.value
        ? 0
        : resolveSpeed(transitionStyleRef.value.transitionDuration)
    )
    const slideStylesRef = computed(() => {
      const { value: slidesEls } = slideElsRef
      if (!slidesEls.length) return []
      const useComputedSize = !(
        autoSlideSizeRef.value || realSlidesPerViewRef.value === 1
      )
      const getSlideSize = (index: number): Partial<Size> | undefined => {
        if (useComputedSize) {
          const { value: axis } = sizeAxisRef
          return {
            [axis]: `${slideSizesRef.value[index][axis]}px`
          }
        }
      }
      if (userWantsControlRef.value) {
        // We center each slide when user wants to control the transition animation,
        // so there is no need to calculate the offset
        return slidesEls.map((_, i) => getSlideSize(i))
      }
      const { effect, spaceBetween } = props
      const { value: spaceAxis } = spaceAxisRef
      return slidesEls.reduce<CSSProperties[]>((styles, _, i) => {
        const style = {
          ...getSlideSize(i),
          [`margin-${spaceAxis}`]: `${spaceBetween}px`
        }
        styles.push(style)
        if (isMountedRef.value && (effect === 'fade' || effect === 'card')) {
          Object.assign(style, transitionStyleRef.value)
        }
        return styles
      }, [])
    })

    // Total
    const totalViewRef = computed(() => {
      const { value: slidesPerView } = displaySlidesPerViewRef
      const { length: totalSlides } = slideElsRef.value
      if (slidesPerView !== 'auto') {
        return Math.max(totalSlides - slidesPerView, 0) + 1
      } else {
        const { value: slideSizes } = slideSizesRef
        const { length } = slideSizes
        if (!length) return totalSlides
        const { value: translates } = slideTranlatesRef
        const { value: axis } = sizeAxisRef
        const perViewSize = perViewSizeRef.value[axis]
        let lastViewSize = slideSizes[slideSizes.length - 1][axis]
        let i = length
        while (i > 1 && lastViewSize < perViewSize) {
          i--
          lastViewSize += translates[i] - translates[i - 1]
        }
        return clampValue(i + 1, 1, length)
      }
    })
    const displayTotalViewRef = computed(() =>
      getDisplayTotalView(totalViewRef.value, duplicatedableRef.value)
    )

    // Index
    const defaultRealIndex = getRealIndex(
      props.defaultIndex,
      duplicatedableRef.value
    )
    const uncontrolledDisplayIndexRef = ref(
      getDisplayIndex(
        defaultRealIndex,
        totalViewRef.value,
        duplicatedableRef.value
      )
    )
    const mergedDisplayIndexRef = useMergedState(
      toRef(props, 'currentIndex'),
      uncontrolledDisplayIndexRef
    )
    const realIndexRef = computed(() =>
      getRealIndex(mergedDisplayIndexRef.value, duplicatedableRef.value)
    )

    // Reality methods
    function toRealIndex (index: number): void {
      index = clampValue(index, 0, totalViewRef.value - 1)
      const displayIndex = getDisplayIndex(
        index,
        totalViewRef.value,
        duplicatedableRef.value
      )
      const { value: lastDisplayIndex } = mergedDisplayIndexRef
      if (displayIndex !== mergedDisplayIndexRef.value) {
        uncontrolledDisplayIndexRef.value = displayIndex
        props['onUpdate:currentIndex']?.(displayIndex, lastDisplayIndex)
        props.onUpdateCurrentIndex?.(displayIndex, lastDisplayIndex)
      }
    }
    function getRealPrevIndex (
      index: number = realIndexRef.value
    ): number | null {
      return getPrevIndex(index, totalViewRef.value, props.loop)
    }
    function getRealNextIndex (
      index: number = realIndexRef.value
    ): number | null {
      return getNextIndex(index, totalViewRef.value, props.loop)
    }
    function isRealPrev (slideOrIndex: HTMLElement | number): boolean {
      const index = getSlideIndex(slideOrIndex)
      return index !== null && getRealPrevIndex() === index
    }
    function isRealNext (slideOrIndex: HTMLElement | number): boolean {
      const index = getSlideIndex(slideOrIndex)
      return index !== null && getRealNextIndex() === index
    }
    function isRealActive (slideOrIndex: HTMLElement | number): boolean {
      return realIndexRef.value === getSlideIndex(slideOrIndex)
    }

    // Display methods
    // They are used to deal with the actual values displayed on the UI
    function isDisplayActive (index: number): boolean {
      return mergedDisplayIndexRef.value === index
    }
    function isPrevDisabled (): boolean {
      return getRealPrevIndex() === null
    }
    function isNextDisabled (): boolean {
      return getRealNextIndex() === null
    }

    // To
    function to (index: number): void {
      const realIndex = clampValue(
        getRealIndex(index, duplicatedableRef.value),
        0,
        totalViewRef.value
      )
      if (
        index !== mergedDisplayIndexRef.value ||
        realIndex !== realIndexRef.value
      ) {
        toRealIndex(realIndex)
      }
    }
    function prev (): void {
      const prevIndex = getRealPrevIndex()
      if (prevIndex !== null) toRealIndex(prevIndex)
    }
    function next (): void {
      const nextIndex = getRealNextIndex()
      if (nextIndex !== null) toRealIndex(nextIndex)
    }
    function prevIfSlideTransitionEnd (): void {
      if (!inTransition || !duplicatedableRef.value) prev()
    }
    function nextIfSlideTransitionEnd (): void {
      if (!inTransition || !duplicatedableRef.value) next()
    }

    // Translate to
    let inTransition = false
    // record the translate of each slide, so that it can be restored at touch
    let previousTranslate = 0
    const translateStyleRef = ref({}) as Ref<CSSProperties>
    function updateTranslate (translate: number, speed = 0): void {
      translateStyleRef.value = Object.assign({}, transitionStyleRef.value, {
        transform: verticalRef.value
          ? `translateY(${-translate}px)`
          : `translateX(${-translate}px)`,
        transitionDuration: `${speed}ms`
      })
    }
    function fixTranslate (speed = 0): void {
      if (sequenceLayoutRef.value) {
        translateTo(realIndexRef.value, speed)
      } else if (previousTranslate !== 0) {
        if (!inTransition && speed > 0) {
          inTransition = true
        }
        updateTranslate((previousTranslate = 0), speed)
      }
    }
    function translateTo (index: number, speed: number): void {
      const translate = getTranslate(index)
      if (translate !== previousTranslate && speed > 0) {
        inTransition = true
      }
      previousTranslate = getTranslate(realIndexRef.value)
      updateTranslate(translate, speed)
    }
    function getTranslate (index: number): number {
      let translate
      // Deal with auto slides pre view
      if (index >= totalViewRef.value - 1) {
        translate = getLastViewTranslate()
      } else {
        translate = slideTranlatesRef.value[index] || 0
      }
      return translate
    }
    function getLastViewTranslate (): number {
      if (displaySlidesPerViewRef.value === 'auto') {
        const { value: axis } = sizeAxisRef
        const { [axis]: perViewSize } = perViewSizeRef.value
        const { value: translates } = slideTranlatesRef
        const lastTranslate = translates[translates.length - 1]
        let overallSize
        if (lastTranslate === undefined) {
          overallSize = perViewSize
        } else {
          const { value: slideSizes } = slideSizesRef
          overallSize = lastTranslate + slideSizes[slideSizes.length - 1][axis]
        }
        // Bring the last slide to the edge
        return overallSize - perViewSize
      } else {
        const { value: translates } = slideTranlatesRef
        return translates[totalViewRef.value - 1] || 0
      }
    }

    // Provide
    const carouselContext: CarouselContextValue = {
      currentIndexRef: mergedDisplayIndexRef,
      to,
      prev: prevIfSlideTransitionEnd,
      next: nextIfSlideTransitionEnd,
      isVertical: () => verticalRef.value,
      isHorizontal: () => !verticalRef.value,
      isPrev: isRealPrev,
      isNext: isRealNext,
      isActive: isRealActive,
      isPrevDisabled,
      isNextDisabled,
      getSlideIndex,
      getSlideStyle,
      addSlide,
      removeSlide,
      onCarouselItemClick
    }
    provideCarouselContext(carouselContext)
    function addSlide (slide?: HTMLElement): void {
      if (!slide) return
      slideElsRef.value.push(slide)
    }
    function removeSlide (slide?: HTMLElement): void {
      if (!slide) return
      const index = getSlideIndex(slide)
      if (index !== -1) {
        slideElsRef.value.splice(index, 1)
      }
    }
    function getSlideIndex (slideOrIndex?: HTMLElement | number): number {
      return typeof slideOrIndex === 'number'
        ? slideOrIndex
        : slideOrIndex
          ? slideElsRef.value.indexOf(slideOrIndex)
          : -1
    }
    function getSlideStyle (
      slide: HTMLElement | number
    ): string | Record<string, string | number> | undefined {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        const styles: any[] = [slideStylesRef.value[index]]
        const isPrev = carouselContext.isPrev(index)
        const isNext = carouselContext.isNext(index)
        if (isPrev) {
          styles.push(props.prevSlideStyle || '')
        }
        if (isNext) {
          styles.push(props.nextSlideStyle || '')
        }
        return normalizeStyle(styles)
      }
    }
    function onCarouselItemClick (index: number, event: MouseEvent): void {
      let allowClick = !inTransition && !dragging && !isEffectiveDrag
      if (props.effect === 'card' && allowClick && !isRealActive(index)) {
        to(index)
        allowClick = false
      }
      if (!allowClick) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    // Autoplay
    let autoplayTimer: number | null = null
    function stopAutoplay (): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
    }
    function resetAutoplay (): void {
      stopAutoplay()
      const disabled = !props.autoplay || displayTotalViewRef.value < 2
      if (!disabled) {
        autoplayTimer = window.setInterval(next, props.interval)
      }
    }

    // Drag
    let dragStartX = 0
    let dragStartY = 0
    let dragOffset = 0
    let dragStartTime = 0
    let dragging = false
    let isEffectiveDrag = false
    function handleTouchstart (event: MouseEvent | TouchEvent): void {
      if (globalDragging) return
      if (
        !slidesElRef.value?.contains(
          getPreciseEventTarget(event) as Node | null
        )
      ) {
        return
      }
      globalDragging = true
      dragging = true
      isEffectiveDrag = false
      dragStartTime = Date.now()
      stopAutoplay()
      if (
        event.type !== 'touchstart' &&
        !(event.target as HTMLElement).isContentEditable
      ) {
        event.preventDefault()
      }
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      if (verticalRef.value) {
        dragStartY = touchEvent.clientY
      } else {
        dragStartX = touchEvent.clientX
      }
      if (props.touchable) {
        on('touchmove', document, handleTouchmove)
        on('touchend', document, handleTouchend)
        on('touchcancel', document, handleTouchend)
      }
      if (props.draggable) {
        on('mousemove', document, handleTouchmove)
        on('mouseup', document, handleTouchend)
      }
    }
    function handleTouchmove (event: MouseEvent | TouchEvent): void {
      const { value: vertical } = verticalRef
      const { value: axis } = sizeAxisRef
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      const offset = vertical
        ? touchEvent.clientY - dragStartY
        : touchEvent.clientX - dragStartX
      const perViewSize = perViewSizeRef.value[axis]
      dragOffset = clampValue(offset, -perViewSize, perViewSize)
      if (event.cancelable) {
        event.preventDefault()
      }
      if (sequenceLayoutRef.value) {
        updateTranslate(previousTranslate - dragOffset, 0)
      }
    }
    function handleTouchend (): void {
      const { value: realIndex } = realIndexRef
      let currentIndex: number | null = realIndex
      if (!inTransition && dragOffset !== 0 && sequenceLayoutRef.value) {
        const currentTranslate = previousTranslate - dragOffset
        const translates = [
          ...slideTranlatesRef.value.slice(0, totalViewRef.value - 1),
          getLastViewTranslate()
        ]
        let prevOffset: number | null = null
        for (let i = 0; i < translates.length; i++) {
          const offset = Math.abs(translates[i] - currentTranslate)
          if (prevOffset !== null && prevOffset < offset) {
            break
          }
          prevOffset = offset
          currentIndex = i
        }
      }
      if (currentIndex === realIndex) {
        const timeElapsed = Date.now() - dragStartTime
        const { value: axis } = sizeAxisRef
        const perViewSize = perViewSizeRef.value[axis]
        // more than 50% width or faster than 0.4px per ms
        if (dragOffset > perViewSize / 2 || dragOffset / timeElapsed > 0.4) {
          currentIndex = getRealPrevIndex(realIndex)
        } else if (
          dragOffset < -perViewSize / 2 ||
          dragOffset / timeElapsed < -0.4
        ) {
          currentIndex = getRealNextIndex(realIndex)
        }
      }
      if (currentIndex !== null && currentIndex !== realIndex) {
        isEffectiveDrag = true
        toRealIndex(currentIndex)
        void nextTick(() => {
          if (
            !duplicatedableRef.value ||
            uncontrolledDisplayIndexRef.value !== mergedDisplayIndexRef.value
          ) {
            fixTranslate(speedRef.value)
          }
        })
      } else {
        fixTranslate(speedRef.value)
      }
      resetDragStatus()
      resetAutoplay()
    }
    function resetDragStatus (): void {
      if (dragging) {
        globalDragging = false
      }
      dragging = false
      dragStartX = 0
      dragStartY = 0
      dragOffset = 0
      dragStartTime = 0
      off('touchmove', document, handleTouchmove)
      off('touchend', document, handleTouchend)
      off('touchcancel', document, handleTouchend)
      off('mousemove', document, handleTouchmove)
      off('mouseup', document, handleTouchend)
    }

    function handleTransitionEnd (): void {
      if (sequenceLayoutRef.value && inTransition) {
        const { value: realIndex } = realIndexRef
        translateTo(realIndex, 0)
      } else {
        resetAutoplay()
      }
      if (sequenceLayoutRef.value) {
        translateStyleRef.value.transitionDuration = '0ms'
      }
      inTransition = false
    }
    function handleMousewheel (event: WheelEvent): void {
      event.preventDefault()
      if (inTransition) return
      let { deltaX, deltaY } = event
      if (event.shiftKey && !deltaX) {
        deltaX = deltaY
      }
      const prevMultiplier = -1
      const nextMultiplier = 1
      const m = (deltaX || deltaY) > 0 ? nextMultiplier : prevMultiplier
      let rx = 0
      let ry = 0
      if (verticalRef.value) {
        ry = m
      } else {
        rx = m
      }
      const responseStep = 10
      if (ry * deltaY >= responseStep || rx * deltaX >= responseStep) {
        if (m === nextMultiplier && !isNextDisabled()) {
          next()
        } else if (m === prevMultiplier && !isPrevDisabled()) {
          prev()
        }
      }
    }
    function handleResize (): void {
      perViewSizeRef.value = calculateSize(selfElRef.value as HTMLElement, true)
      resetAutoplay()
    }
    function handleSlideResize (): void {
      if (autoSlideSizeRef.value) {
        slideSizesRef.effect.scheduler?.()
        slideSizesRef.effect.run()
      }
    }
    function handleMouseenter (): void {
      if (props.autoplay) {
        stopAutoplay()
      }
    }
    function handleMouseleave (): void {
      if (props.autoplay) {
        resetAutoplay()
      }
    }
    onMounted(() => {
      watchEffect(resetAutoplay)
      requestAnimationFrame(() => (isMountedRef.value = true))
    })
    onBeforeUnmount(() => {
      resetDragStatus()
      stopAutoplay()
    })
    // Fix index when remounting
    onUpdated(() => {
      const { value: slidesEls } = slideElsRef
      const { value: slideVNodes } = slideVNodesRef
      const indexMap = new Map<HTMLElement, number>()
      const getDisplayIndex = (el: HTMLElement): number =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        indexMap.has(el) ? indexMap.get(el)! : -1
      let isChanged = false
      for (let i = 0; i < slidesEls.length; i++) {
        const index = slideVNodes.findIndex((v) => v.el === slidesEls[i])
        if (index !== i) {
          isChanged = true
        }
        indexMap.set(slidesEls[i], index)
      }
      if (isChanged) {
        slidesEls.sort((a, b) => getDisplayIndex(a) - getDisplayIndex(b))
      }
    })
    watch(
      realIndexRef,
      (realIndex, lastRealIndex) => {
        if (realIndex === lastRealIndex) return
        resetAutoplay()
        if (sequenceLayoutRef.value) {
          if (duplicatedableRef.value) {
            const { value: length } = totalViewRef
            if (
              displayTotalViewRef.value > 2 &&
              realIndex === length - 2 &&
              lastRealIndex === 1
            ) {
              realIndex = 0
            } else if (realIndex === 1 && lastRealIndex === length - 2) {
              realIndex = length - 1
            }
          }
          translateTo(realIndex, speedRef.value)
        } else {
          fixTranslate()
        }
      },
      { immediate: true }
    )
    watch(
      [duplicatedableRef, displaySlidesPerViewRef],
      () =>
        void nextTick(() => {
          toRealIndex(realIndexRef.value)
        })
    )
    watch(
      slideTranlatesRef,
      () => {
        sequenceLayoutRef.value && fixTranslate()
      },
      {
        deep: true
      }
    )
    watch(sequenceLayoutRef, (value) => {
      if (!value) {
        inTransition = false
        // if the current mode does not support translate, reset the position of the wrapper
        updateTranslate((previousTranslate = 0))
      } else {
        fixTranslate()
      }
    })
    const slidesControlListenersRef = computed(() => {
      return {
        onTouchstartPassive: props.touchable ? handleTouchstart : undefined,
        onMousedown: props.draggable ? handleTouchstart : undefined,
        onWheel: props.mousewheel ? handleMousewheel : undefined
      }
    })
    const arrowSlotPropsRef = computed<ArrowScopedSlotProps>(() => ({
      ...keep(carouselContext, [
        'to',
        'prev',
        'next',
        'isPrevDisabled',
        'isNextDisabled'
      ]),
      total: displayTotalViewRef.value,
      currentIndex: mergedDisplayIndexRef.value
    }))
    const dotSlotPropsRef = computed<DotScopedSlotProps>(() => ({
      total: displayTotalViewRef.value,
      currentIndex: mergedDisplayIndexRef.value,
      to: carouselContext.to
    }))
    const caroulseExposedMethod: CarouselInst = {
      getCurrentIndex: () => mergedDisplayIndexRef.value,
      to,
      prev,
      next
    }
    const themeRef = useTheme(
      'Carousel',
      '-carousel',
      style,
      carouselLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          dotSize,
          dotColor,
          dotColorActive,
          dotColorFocus,
          dotLineWidth,
          dotLineWidthActive,
          arrowColor
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-dot-color': dotColor,
        '--n-dot-color-focus': dotColorFocus,
        '--n-dot-color-active': dotColorActive,
        '--n-dot-size': dotSize,
        '--n-dot-line-width': dotLineWidth,
        '--n-dot-line-width-active': dotLineWidthActive,
        '--n-arrow-color': arrowColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('carousel', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      slidesElRef,
      slideVNodes: slideVNodesRef,
      duplicatedable: duplicatedableRef,
      userWantsControl: userWantsControlRef,
      autoSlideSize: autoSlideSizeRef,
      displayIndex: mergedDisplayIndexRef,
      realIndex: realIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      slidesControlListeners: slidesControlListenersRef,
      handleTransitionEnd,
      handleResize,
      handleSlideResize,
      handleMouseenter,
      handleMouseleave,
      isActive: isDisplayActive,
      arrowSlotProps: arrowSlotPropsRef,
      dotSlotProps: dotSlotPropsRef,
      ...caroulseExposedMethod,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      mergedClsPrefix,
      showArrow,
      userWantsControl,
      slideStyles,
      dotType,
      dotPlacement,
      slidesControlListeners,
      transitionProps = {},
      arrowSlotProps,
      dotSlotProps,
      $slots: { default: defaultSlot, dots: dotsSlot, arrow: arrowSlot }
    } = this
    const children = (defaultSlot && flatten(defaultSlot())) || []
    let slides = filterCarouselItem(children)
    if (!slides.length) {
      slides = children.map((ch) => (
        <NCarouselItem>
          {{
            default: () => cloneVNode(ch)
          }}
        </NCarouselItem>
      ))
    }
    if (this.duplicatedable) {
      slides = addDuplicateSlides(slides)
    }
    this.slideVNodes.value = slides
    // When users need to customize the size of the slide,
    // we listen to them to fix the current translate
    if (this.autoSlideSize) {
      slides = slides.map((slide) => (
        <VResizeObserver onResize={this.handleSlideResize}>
          {{
            default: () => slide
          }}
        </VResizeObserver>
      ))
    }
    this.onRender?.()
    return (
      <div
        ref="selfElRef"
        class={[
          this.themeClass,
          `${mergedClsPrefix}-carousel`,
          this.direction === 'vertical' &&
            `${mergedClsPrefix}-carousel--vertical`,
          this.showArrow && `${mergedClsPrefix}-carousel--show-arrow`,
          `${mergedClsPrefix}-carousel--${dotPlacement}`,
          `${mergedClsPrefix}-carousel--${this.direction}`,
          `${mergedClsPrefix}-carousel--${this.effect}`,
          userWantsControl && `${mergedClsPrefix}-carousel--usercontrol`
        ]}
        style={this.cssVars as CSSProperties}
        {...slidesControlListeners}
        onMouseenter={this.handleMouseenter}
        onMouseleave={this.handleMouseleave}
      >
        <VResizeObserver onResize={this.handleResize}>
          {{
            default: () => (
              <div
                ref="slidesElRef"
                class={`${mergedClsPrefix}-carousel__slides`}
                role="listbox"
                style={this.translateStyle}
                onTransitionend={this.handleTransitionEnd}
              >
                {userWantsControl
                  ? slides.map((slide, i) => (
                      <div style={slideStyles[i]} key={i}>
                        {withDirectives(
                          <Transition {...transitionProps}>
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
        {this.showDots &&
          dotSlotProps.total > 1 &&
          resolveSlotWithProps(dotsSlot, dotSlotProps, () => [
            <NCarouselDots
              key={dotType + dotPlacement}
              total={dotSlotProps.total}
              currentIndex={dotSlotProps.currentIndex}
              dotType={dotType}
              trigger={this.trigger}
              keyboard={this.keyboard}
            />
          ])}
        {showArrow &&
          resolveSlotWithProps(arrowSlot, arrowSlotProps, () => [
            <NCarouselArrow />
          ])}
      </div>
    )
  }
})

function filterCarouselItem (vnodes: VNode[]): VNode[] {
  return vnodes.reduce<VNode[]>((carouselItems, vnode) => {
    if (isCarouselItem(vnode)) {
      carouselItems.push(vnode)
    }
    return carouselItems
  }, [])
}
