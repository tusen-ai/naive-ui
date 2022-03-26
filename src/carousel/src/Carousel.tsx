import {
  h,
  defineComponent,
  ref,
  provide,
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
  onUpdated
} from 'vue'
import type { CSSProperties, PropType, Ref, TransitionProps, VNode } from 'vue'
import { VResizeObserver } from 'vueuc'
import { on, off } from 'evtd'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { flatten, keep, resolveSlotWithProps } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { carouselLight } from '../styles'
import type { CarouselTheme } from '../styles'
import {
  calculateSize,
  getNextIndex,
  getPrevIndex,
  getDisplayIndex,
  getRealIndex,
  isTouchEvent,
  clampValue,
  resolveSpeed
} from './utils'
import NCarouselDots from './CarouselDots'
import NCarouselArrow from './CarouselArrow'
import NCarouselItem from './CarouselItem'
import { carouselMethodsInjectionKey, DragFlags, tuple } from './interface'
import type { CarouselInst, ElementOf } from './interface'
import style from './styles/index.cssr'

const transitionProperties = tuple(
  'transitionDuration',
  'transitionTimingFunction'
)

type TransitionStyle = Partial<
Pick<CSSProperties, ElementOf<typeof transitionProperties>>
>

const carouselProps = {
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
    const slidesElsRef = ref<HTMLElement[]>([])
    const slideVNodesRef = { value: [] as VNode[] }

    // user wants to control the transition animation
    const userWantsControlRef = computed(() => props.effect === 'custom')
    const translateableRef = computed(
      () => !userWantsControlRef.value && props.effect === 'slide'
    )
    // TODO
    const allowLoopRef = computed(() => props.loop && props.slidesPerView === 1)
    // Because of the nature of the loop slide work,
    // we need to add duplicates to the left and right of the carousel
    // slot    [ 0 1 2 ]
    // display 2 0 1 2 0
    // index   0 1 2 3 4
    const duplicatedableRef = computed(
      // only duplicate the copy operation in `slide` mode,
      // because other effects have special process
      () => translateableRef.value && allowLoopRef.value
    )
    // used to calculate total views
    const displaySlidesPerViewRef = computed(() =>
      userWantsControlRef.value ||
      props.centeredSlides ||
      props.effect !== 'slide'
        ? 1
        : props.slidesPerView
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

    const transitionStyleRef = computed(() =>
      props.transitionStyle
        ? keep(props.transitionStyle, transitionProperties)
        : {}
    )
    const speedRef = computed(() =>
      userWantsControlRef.value
        ? 0
        : resolveSpeed(transitionStyleRef.value.transitionDuration)
    )
    const verticalRef = computed(() => props.direction === 'vertical')
    const sizeAxisRef = computed(() => (verticalRef.value ? 'height' : 'width'))
    const perViewSizeRef = ref({ width: 0, height: 0 })

    const slideSizesRef = computed(() => {
      const { value: slidesEls } = slidesElsRef
      const { length } = slidesEls
      if (!length) return []
      if (autoSlideSizeRef.value) {
        return slidesEls.map((slide) => calculateSize(slide))
      }
      const { value: slidesPerView } = realSlidesPerViewRef
      const { value: perViewSize } = perViewSizeRef
      const { value: axis } = sizeAxisRef
      let slideSize = perViewSize[axis]
      if (slidesPerView !== 'auto') {
        const { spaceBetween } = props
        const remaining = slideSize - (slidesPerView - 1) * spaceBetween
        const percentage = 1 / Math.max(1, slidesPerView)
        slideSize = remaining * percentage
      }
      return slidesEls.map(() => ({ ...perViewSize, [axis]: slideSize }))
    })

    // The translate required to reach each slide
    const slideTranlatesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      const { length } = slideSizes
      if (!length) return []
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

    let isMounted = false
    const slideStylesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef
      const { length } = slideSizes
      if (!length) return []
      const { value: axis } = sizeAxisRef
      // when user wants to control the transition animation, we center each slide
      if (userWantsControlRef.value) {
        return slideSizes.map((size) => ({
          [axis]: `${size[axis]}px`
        }))
      }
      const { effect, spaceBetween } = props
      const { value: vertical } = verticalRef
      const spaceAxis = vertical ? 'bottom' : 'right'
      const slideStyles: CSSProperties[] = []
      for (let i = 0; i < length; i++) {
        const size = slideSizes[i][axis]
        const style: CSSProperties = {
          [axis]: `${size}px`,
          [`margin-${spaceAxis}`]: `${spaceBetween}px`
        }
        if (isMounted && (effect === 'fade' || effect === 'card')) {
          Object.assign(style, transitionStyleRef.value)
        }
        slideStyles.push(style)
      }
      return slideStyles
    })

    // Total
    const totalViewRef = computed(() => {
      const { value: slidesPerView } = displaySlidesPerViewRef
      const { length: originLength } = slidesElsRef.value
      if (slidesPerView !== 'auto') {
        return originLength - slidesPerView + 1
      } else {
        const { value: slideSizes } = slideSizesRef
        const { length } = slideSizes
        if (!length) return originLength
        const { value: translates } = slideTranlatesRef
        const { value: axis } = sizeAxisRef
        const perViewSize = perViewSizeRef.value[axis]
        let lastViewSize = slideSizes[slideSizes.length - 1][axis]
        let i = length
        while (i > 1 && lastViewSize < perViewSize) {
          i--
          lastViewSize += translates[i] - translates[i - 1]
        }
        if (i !== length) i++
        if (i < 1) i = 1
        return i
      }
    })
    const displayTotalViewRef = computed(() => {
      const { value: totalView } = totalViewRef
      return duplicatedableRef.value && totalView > 3
        ? totalView - 2
        : totalView
    })

    // Index
    const initializeIndex =
      props.defaultIndex + (duplicatedableRef.value ? 1 : 0)
    const displayIndexRef = ref(
      getDisplayIndex(
        initializeIndex,
        totalViewRef.value,
        duplicatedableRef.value
      )
    )
    const virtualIndexRef = ref(initializeIndex)
    const realIndexRef = ref(initializeIndex)

    // record the translate of each slide, so that it can be restored at touch
    let previousTranslate = 0

    // Reality methods
    function toRealIndex (index: number, speed = speedRef.value): void {
      const { value: length } = totalViewRef
      if ((index = clampValue(index, 0, length - 1)) !== realIndexRef.value) {
        const { value: lastDisplayIndex } = displayIndexRef
        // When it is loop from the first silde to the last one,
        // we control its animation effect
        if (duplicatedableRef.value && displayTotalViewRef.value > 2) {
          if (lastDisplayIndex === 0 && index === displayTotalViewRef.value) {
            index = 0
          } else if (
            lastDisplayIndex === displayTotalViewRef.value - 1 &&
            index === 1
          ) {
            index = length - 1
          }
        }
        const displayIndex = (displayIndexRef.value = getDisplayIndex(
          index,
          totalViewRef.value,
          duplicatedableRef.value
        ))
        virtualIndexRef.value = index
        realIndexRef.value = getRealIndex(displayIndex, duplicatedableRef.value)
        if (translateableRef.value) {
          translateTo(index, speed)
        } else {
          if (!userWantsControlRef.value && speed > 0) {
            inTransition = true
          }
          fixTranslate()
        }
        if (displayIndex !== lastDisplayIndex) {
          props['onUpdate:currentIndex']?.(displayIndex, lastDisplayIndex)
          props.onUpdateCurrentIndex?.(displayIndex, lastDisplayIndex)
        }
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
      return displayIndexRef.value === index
    }
    function isPrevDisabled (): boolean {
      return getRealPrevIndex() === null
    }
    function isNextDisabled (): boolean {
      return getRealNextIndex() === null
    }

    // Slide to
    function to (index: number): void {
      const realIndex = getRealIndex(index, duplicatedableRef.value)
      if (index !== displayIndexRef.value || realIndex !== realIndexRef.value) {
        toRealIndex(realIndex)
      }
    }
    function prev (): void {
      const prevIndex = getRealPrevIndex()
      if (prevIndex !== null) {
        toRealIndex(prevIndex)
      }
    }
    function next (): void {
      const nextIndex = getRealNextIndex()
      if (nextIndex !== null) {
        toRealIndex(nextIndex)
      }
    }

    // Translate to
    const translateStyleRef = ref({}) as Ref<CSSProperties>
    let inTransition = false
    function updateTranslate (translate: number, speed = 0): void {
      const isVersical = props.direction === 'vertical'
      translateStyleRef.value = Object.assign({}, transitionStyleRef.value, {
        transform: isVersical
          ? `translateY(${-translate}px)`
          : `translateX(${-translate}px)`,
        transitionDuration: `${speed}ms`
      })
    }
    function fixTranslate (speed = 0): void {
      if (translateableRef.value) {
        translateTo(realIndexRef.value, speed)
      } else if (previousTranslate !== 0) {
        updateTranslate((previousTranslate = 0), speed)
      }
    }
    function translateTo (index: number, speed = speedRef.value): void {
      const translate = getTranslate(index)
      if (translate !== previousTranslate && speed > 0) {
        inTransition = true
      }
      updateTranslate(translate, speed)
      previousTranslate = getTranslate(realIndexRef.value)
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
    function addSlide (slide?: HTMLElement): void {
      if (!slide) return
      slidesElsRef.value.push(slide)
    }
    function removeSlide (slide?: HTMLElement): void {
      if (!slide) return
      const index = getSlideIndex(slide)
      if (index !== -1) {
        slidesElsRef.value.splice(index, 1)
      }
    }
    function getSlideIndex (slideOrIndex: HTMLElement | number): number {
      return typeof slideOrIndex === 'number'
        ? slideOrIndex
        : slidesElsRef.value.indexOf(slideOrIndex)
    }
    function getSlideStyle (slide: HTMLElement | number): any {
      const index = getSlideIndex(slide)
      if (index !== -1) {
        return slideStylesRef.value[index]
      }
    }
    function onCarouselItemClick (index: number, event: MouseEvent): void {
      const isTryDrag = DragFlags.PROGRESS | DragFlags.SUCCESS | DragFlags.FAIL
      let allowClick = !inTransition && !(dragStatus & isTryDrag)
      if (
        props.effect === 'card' &&
        !userWantsControlRef.value &&
        !(dragStatus & DragFlags.SUCCESS) &&
        !isRealActive(index)
      ) {
        to(index)
        allowClick = false
      }
      if (!allowClick) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
    const carouselMethods = {
      to,
      prev: () => {
        // wait transition end
        if (!inTransition || !duplicatedableRef.value) prev()
      },
      next: () => {
        // wait transition end
        if (!inTransition || !duplicatedableRef.value) next()
      },
      isVertical: () => verticalRef.value,
      isHorizontal: () => !verticalRef.value,
      isPrev: isRealPrev,
      isNext: isRealNext,
      isActive: isRealActive,
      isPrevDisabled,
      isNextDisabled,
      getCurrentIndex: () => displayIndexRef.value,
      getSlideIndex,
      getSlideStyle,
      addSlide,
      removeSlide,
      onCarouselItemClick,
      prevSlideStyleRef: toRef(props, 'prevSlideStyle'),
      nextSlideStyleRef: toRef(props, 'nextSlideStyle')
    }
    provide(carouselMethodsInjectionKey, carouselMethods)

    // Autoplay
    let autoplayTimer: NodeJS.Timeout | null = null
    function resetAutoplay (cleanOnly?: boolean): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
      const { autoplay, interval } = props
      if (autoplay && interval && !cleanOnly) {
        autoplayTimer = setInterval(next, interval)
      }
    }
    function mesureAutoplay (): void {
      const { autoplay } = props
      if (autoplay) {
        resetAutoplay()
      } else if (displayTotalViewRef.value < 2) {
        resetAutoplay(true)
      }
    }

    // Drag
    let dragStartX = 0
    let dragStartY = 0
    let dragOffset = 0
    let dragStartTime = 0
    let dragStatus = DragFlags.NORMAL
    function handleTouchstart (event: MouseEvent | TouchEvent): void {
      if (globalDragging) return
      dragStartTime = Date.now()
      dragStatus = DragFlags.START
      globalDragging = true
      resetAutoplay(true /** cleanOnly */)
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
      const axis = vertical ? 'height' : 'width'
      const perViewSize = perViewSizeRef.value[axis]
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event
      const offset = vertical
        ? touchEvent.clientY - dragStartY
        : touchEvent.clientX - dragStartX
      dragOffset = clampValue(offset, -perViewSize, perViewSize)
      dragStatus = DragFlags.PROGRESS
      if (translateableRef.value) {
        updateTranslate(previousTranslate - dragOffset, 0)
      }
    }
    function handleTouchend (): void {
      const duration = Date.now() - dragStartTime
      const { value: axis } = sizeAxisRef
      const { value: realIndex } = realIndexRef
      const { value: translateable } = translateableRef
      let currentIndex: number | null = realIndex
      if (!inTransition && translateable && dragOffset !== 0) {
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
        const perViewSize = perViewSizeRef.value[axis]
        // more than 50% width or faster than 0.4px per ms
        if (dragOffset > perViewSize / 2 || dragOffset / duration > 0.4) {
          currentIndex = getRealPrevIndex(realIndex)
        } else if (
          dragOffset < -perViewSize / 2 ||
          dragOffset / duration < -0.4
        ) {
          currentIndex = getRealNextIndex(realIndex)
        }
      }
      if (currentIndex !== null && currentIndex !== realIndex) {
        dragStatus = DragFlags.SUCCESS
        toRealIndex(currentIndex)
      } else {
        if (dragStatus & DragFlags.PROGRESS) {
          dragStatus = DragFlags.FAIL
        } else {
          dragStatus = DragFlags.END
        }
        fixTranslate(speedRef.value)
      }
      mesureAutoplay()
      resetDragStatus()
    }
    function resetDragStatus (): void {
      if (!(dragStatus & DragFlags.NORMAL)) {
        globalDragging = false
        if (dragStatus & (DragFlags.START | DragFlags.PROGRESS)) {
          dragStatus = DragFlags.NORMAL
        }
      }
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
      const { value: virtualIndex } = virtualIndexRef
      const { value: realIndex } = realIndexRef
      if (inTransition && virtualIndex !== realIndex) {
        translateTo(realIndex, 0)
      } else {
        resetAutoplay()
      }
      if (translateableRef.value) {
        translateStyleRef.value.transitionDuration = '0ms'
      }
      inTransition = false
    }
    function handleMousewheel (event: WheelEvent): void {
      event.preventDefault()
      if (inTransition) return
      const { value: vertical } = verticalRef
      let { deltaX, deltaY } = event
      if (event.shiftKey && !deltaX) {
        deltaX = deltaY
      }
      const P_MULTIPLIER = -1
      const N_MULTIPLIER = 1
      const MULTIPLIER = (deltaX || deltaY) > 0 ? N_MULTIPLIER : P_MULTIPLIER
      let rx = 0
      let ry = 0
      if (vertical) {
        ry = MULTIPLIER
      } else {
        rx = MULTIPLIER
      }
      const RESPONSE_STEP = 10
      if (ry * deltaY >= RESPONSE_STEP || rx * deltaX >= RESPONSE_STEP) {
        if (MULTIPLIER === N_MULTIPLIER && !isNextDisabled()) {
          next()
        } else if (MULTIPLIER === P_MULTIPLIER && !isPrevDisabled()) {
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

    onMounted(() => {
      watchEffect(mesureAutoplay)
      void nextTick(() => (isMounted = true))
    })
    onBeforeUnmount(() => {
      resetDragStatus()
      resetAutoplay(true)
    })
    // Fix index when remounting
    onUpdated(() => {
      const { value: slidesEls } = slidesElsRef
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
      toRef(props, 'currentIndex'),
      (index) => index !== undefined && to(index)
    )
    watch(
      duplicatedableRef,
      () => void nextTick(() => to(displayIndexRef.value))
    )
    watch(slideTranlatesRef, () => translateableRef.value && fixTranslate(), {
      deep: true
    })
    watch(translateableRef, (value) => {
      if (!value) {
        inTransition = false
        // if the current mode does not support translate, reset the position of the wrapper
        updateTranslate((previousTranslate = 0))
      } else {
        fixTranslate()
      }
    })
    const caroulseSlotProps = {
      arrowSlotProps: computed(() => ({
        total: displayTotalViewRef.value,
        currentIndex: displayIndexRef.value,
        ...keep(carouselMethods, [
          'to',
          'prev',
          'next',
          'isPrevDisabled',
          'isNextDisabled'
        ])
      })),
      dotSlotProps: computed(() => ({
        total: displayTotalViewRef.value,
        currentIndex: displayIndexRef.value,
        to
      }))
    }
    const caroulseExposedMethod: CarouselInst = {
      getCurrentIndex: () => displayIndexRef.value,
      to: to,
      prev: prev,
      next: next
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
      slideVNodes: slideVNodesRef,
      duplicatedable: duplicatedableRef,
      userWantsControl: userWantsControlRef,
      autoSlideSize: autoSlideSizeRef,
      displayIndex: displayIndexRef,
      realIndex: realIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      handleTouchstart,
      handleTransitionEnd,
      handleMousewheel,
      handleResize,
      handleSlideResize,
      isActive: isDisplayActive,
      ...caroulseSlotProps,
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
      draggable,
      touchable,
      slideStyles,
      dotType,
      dotPlacement,
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
    const { length: realLength } = slides
    if (realLength > 1 && this.duplicatedable) {
      slides.push(duplicateSlide(slides[0], 0, 'append'))
      slides.unshift(
        duplicateSlide(slides[realLength - 1], realLength - 1, 'prepend')
      )
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
      >
        <VResizeObserver onResize={this.handleResize}>
          {{
            default: () => (
              <div
                class={`${mergedClsPrefix}-carousel__slides`}
                role="listbox"
                style={this.translateStyle}
                onMousedown={draggable ? this.handleTouchstart : undefined}
                onTouchstart={touchable ? this.handleTouchstart : undefined}
                onWheel={this.mousewheel ? this.handleMousewheel : undefined}
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
          resolveSlotWithProps(dotsSlot, dotSlotProps, () => [
            dotSlotProps.total > 1 && (
              <NCarouselDots
                key={dotType + dotPlacement}
                total={dotSlotProps.total}
                currentIndex={dotSlotProps.currentIndex}
                dotType={dotType}
                trigger={this.trigger}
                keyboard={this.keyboard}
              />
            )
          ])}
        {showArrow &&
          resolveSlotWithProps(arrowSlot, arrowSlotProps, () => [
            <NCarouselArrow />
          ])}
      </div>
    )
  }
})

function filterCarouselItem (
  vnodes: VNode[],
  carouselItems: VNode[] = []
): VNode[] {
  if (Array.isArray(vnodes)) {
    vnodes.forEach((vnode) => {
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
