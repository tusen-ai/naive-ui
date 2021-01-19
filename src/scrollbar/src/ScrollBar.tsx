import {
  h,
  ref,
  defineComponent,
  computed,
  PropType,
  onMounted,
  onBeforeUnmount,
  mergeProps,
  renderSlot,
  Transition,
  VNode
} from 'vue'
import { on, off } from 'evtd'
import { VResizeObserver } from 'vueuc'
import { useIsIos } from 'vooks'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { scrollbarLight } from '../styles'
import type { ScrollbarTheme } from '../styles'
import style from './styles/index.cssr'

interface ScrollTo {
  (x: number, y: number): void
  (
    x: {
      left?: number
      top?: number
      behavior?: ScrollBehavior
      debounce?: boolean
    },
    y: number
  ): void
  (
    x: {
      el: HTMLElement
      behavior?: ScrollBehavior
      debounce?: boolean
    },
    y: number
  ): void
  (
    x: {
      index: number
      elSize: number
      behavior?: ScrollBehavior
      debounce?: boolean
    },
    y: number
  ): void
  (
    x: {
      position: 'top' | 'bottom'
      behavior?: ScrollBehavior
      debounce?: boolean
    },
    y: number
  ): void
}

export interface ScrollbarRef {
  scrollTo: ScrollTo
  sync: () => void
}

export default defineComponent({
  name: 'Scrollbar',
  props: {
    ...(useTheme.props as ThemeProps<ScrollbarTheme>),
    size: {
      type: Number,
      default: 5
    },
    duration: {
      type: Number,
      default: 0
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    xScrollable: {
      type: Boolean,
      default: false
    },
    container: {
      type: Function as PropType<undefined | (() => HTMLElement)>,
      default: undefined
    },
    content: {
      type: Function as PropType<undefined | (() => HTMLElement)>,
      default: undefined
    },
    containerStyle: {
      type: Object,
      default: undefined
    },
    contentClass: {
      type: String,
      default: undefined
    },
    contentStyle: {
      type: Object,
      default: undefined
    },
    horizontalRailStyle: {
      type: Object,
      default: undefined
    },
    verticalRailStyle: {
      type: Object,
      default: undefined
    },
    onScroll: {
      type: Function as PropType<((e: Event) => void) | undefined>,
      default: undefined
    }
  },
  setup (props) {
    // dom ref
    const containerRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const yRailRef = ref<HTMLElement | null>(null)
    const xRailRef = ref<HTMLElement | null>(null)

    // data ref
    const contentHeightRef = ref<number | null>(null)
    const contentWidthRef = ref<number | null>(null)
    const containerHeightRef = ref<number | null>(null)
    const containerWidthRef = ref<number | null>(null)
    const yRailSizeRef = ref<number | null>(null)
    const xRailSizeRef = ref<number | null>(null)
    const containerScrollTopRef = ref<number | null>(null)
    const containerScrollLeftRef = ref<number | null>(null)
    const isShowXBarRef = ref(false)
    const isShowYBarRef = ref(false)

    let yBarPressed = false
    let xBarPressed = false
    let xBarVanishTimerId: number | undefined
    let yBarVanishTimerId: number | undefined
    let memoYTop: number = 0
    let memoXLeft: number = 0
    let memoMouseX: number = 0
    let memoMouseY: number = 0
    const isIos = useIsIos()

    const yBarSizeRef = computed(() => {
      const { value: containerHeight } = containerHeightRef
      const { value: contentHeight } = contentHeightRef
      const { value: yRailSize } = yRailSizeRef
      if (
        containerHeight === null ||
        contentHeight === null ||
        yRailSize === null
      ) {
        return 0
      } else {
        return Math.min(
          containerHeight,
          (yRailSize * containerHeight) / contentHeight + props.size * 1.5
        )
      }
    })
    const yBarSizePxRef = computed(() => {
      return `${yBarSizeRef.value}px`
    })
    const xBarSizeRef = computed(() => {
      const { value: containerWidth } = containerWidthRef
      const { value: contentWidth } = contentWidthRef
      const { value: xRailSize } = xRailSizeRef
      if (
        containerWidth === null ||
        contentWidth === null ||
        xRailSize === null
      ) {
        return 0
      } else {
        return (xRailSize * containerWidth) / contentWidth + props.size * 1.5
      }
    })
    const xBarSizePxRef = computed(() => {
      return `${xBarSizeRef.value}px`
    })
    const yBarTopRef = computed(() => {
      const { value: containerHeight } = containerHeightRef
      const { value: containerScrollTop } = containerScrollTopRef
      const { value: contentHeight } = contentHeightRef
      const { value: yRailSize } = yRailSizeRef
      if (
        containerHeight === null ||
        containerScrollTop === null ||
        contentHeight === null ||
        yRailSize === null
      ) {
        return 0
      } else {
        return (
          (containerScrollTop / (contentHeight - containerHeight)) *
          (yRailSize - yBarSizeRef.value)
        )
      }
    })
    const yBarTopPxRef = computed(() => {
      return `${yBarTopRef.value}px`
    })
    const xBarLeftRef = computed(() => {
      const { value: containerWidth } = containerWidthRef
      const { value: containerScrollLeft } = containerScrollLeftRef
      const { value: contentWidth } = contentWidthRef
      const { value: xRailSize } = xRailSizeRef
      if (
        containerWidth === null ||
        containerScrollLeft === null ||
        contentWidth === null ||
        xRailSize === null
      ) {
        return 0
      } else {
        return (
          (containerScrollLeft / (contentWidth - containerWidth)) *
          (xRailSize - xBarSizeRef.value)
        )
      }
    })
    const xBarLeftPxRef = computed(() => {
      return `${xBarLeftRef.value}px`
    })
    const sizePxRef = computed(() => {
      return `${props.size}px`
    })
    const needYBarRef = computed(() => {
      const { value: containerHeight } = containerHeightRef
      const { value: contentHeight } = contentHeightRef
      return (
        containerHeight !== null &&
        contentHeight !== null &&
        contentHeight > containerHeight
      )
    })
    const needXBarRef = computed(() => {
      const { value: containerWidth } = containerWidthRef
      const { value: contentWidth } = contentWidthRef
      return (
        containerWidth !== null &&
        contentWidth !== null &&
        contentWidth > containerWidth
      )
    })
    const mergedContainerRef = computed(() => {
      const { container } = props
      if (container) return container()
      return containerRef.value
    })
    const mergedContentRef = computed(() => {
      const { content } = props
      if (content) return content()
      return contentRef.value
    })

    // methods
    function handleContentResize (): void {
      sync()
    }
    interface MergedScrollOptions {
      left?: number
      top?: number
      el?: HTMLElement
      position?: 'top' | 'bottom'
      behavior?: ScrollBehavior
      debounce?: boolean
      index?: number
      elSize?: number
    }
    const scrollTo: ScrollTo = (
      options: MergedScrollOptions | number,
      y?: number
    ): void => {
      if (!props.scrollable) return
      if (typeof options === 'number') {
        scrollToPosition(options, y ?? 0, 0, false, 'auto')
        return
      }
      const {
        left,
        top,
        index,
        elSize,
        position,
        behavior,
        el,
        debounce = true
      } = options
      if (left !== undefined || top !== undefined) {
        scrollToPosition(left ?? 0, top ?? 0, 0, false, behavior)
      }
      if (el !== undefined) {
        scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior)
      } else if (index !== undefined && elSize !== undefined) {
        scrollToPosition(0, index * elSize, elSize, debounce, behavior)
      } else if (position === 'bottom') {
        scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior)
      } else if (position === 'top') {
        scrollToPosition(0, 0, 0, false, behavior)
      }
    }
    function scrollToPosition (
      left: number,
      top: number,
      elSize: number,
      debounce: boolean,
      behavior?: ScrollBehavior
    ): void {
      const { value: container } = mergedContainerRef
      if (!container) return
      if (debounce) {
        const { scrollTop, offsetHeight } = container
        if (top > scrollTop) {
          if (top + elSize <= scrollTop + offsetHeight) {
            // do nothing
          } else {
            container.scrollTo({
              left,
              top: top + elSize - offsetHeight,
              behavior
            })
          }
          return
        }
      }
      container.scrollTo({
        left,
        top,
        behavior
      })
    }
    function handleMouseEnterWrapper (): void {
      showXBar()
      showYBar()
      sync()
    }
    function handleMouseLeaveWrapper (): void {
      hideBar()
    }
    function hideBar (): void {
      hideYBar()
      hideXBar()
    }
    function hideYBar (): void {
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      yBarVanishTimerId = window.setTimeout(() => {
        isShowYBarRef.value = false
      }, props.duration)
    }
    function hideXBar (): void {
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      xBarVanishTimerId = window.setTimeout(() => {
        isShowXBarRef.value = false
      }, props.duration)
    }
    function showXBar (): void {
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      isShowXBarRef.value = true
    }
    function showYBar (): void {
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      isShowYBarRef.value = true
    }
    function handleScroll (e: Event): void {
      const { onScroll } = props
      if (onScroll) onScroll(e)
      syncScrollState()
    }
    function syncScrollState (): void {
      // only collect scroll state, do not trigger any dom event
      const { value: container } = mergedContainerRef
      if (container) {
        containerScrollTopRef.value = container.scrollTop
        containerScrollLeftRef.value = container.scrollLeft
      }
    }
    function syncPositionState (): void {
      // only collect position state, do not trigger any dom event
      // Don't use getClientBoundingRect because element may be scale transformed
      const { value: content } = mergedContentRef
      if (content) {
        contentHeightRef.value = content.offsetHeight
        contentWidthRef.value = content.offsetWidth
      }
      const { value: container } = mergedContainerRef
      if (container) {
        containerHeightRef.value = container.offsetHeight
        containerWidthRef.value = container.offsetWidth
      }
      const { value: xRailEl } = xRailRef
      const { value: yRailEl } = yRailRef
      if (xRailEl) {
        xRailSizeRef.value = xRailEl.offsetWidth
      }
      if (yRailEl) {
        yRailSizeRef.value = yRailEl.offsetHeight
      }
    }
    function sync (): void {
      if (!props.scrollable) return
      syncPositionState()
      syncScrollState()
    }
    function handleXScrollMouseDown (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      xBarPressed = true
      on('mousemove', window, handleXScrollMouseMove, true)
      on('mouseup', window, handleXScrollMouseUp, true)
      memoXLeft = containerScrollLeftRef.value as number
      memoMouseX = e.clientX
    }
    function handleXScrollMouseMove (e: MouseEvent): void {
      if (!xBarPressed) return
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      const { value: containerWidth } = containerWidthRef
      const { value: contentWidth } = contentWidthRef
      const { value: xBarSize } = xBarSizeRef
      if (containerWidth === null || contentWidth === null) return
      const dX = e.clientX - memoMouseX
      const dScrollLeft =
        (dX * (contentWidth - containerWidth)) / (containerWidth - xBarSize)
      const toScrollLeftUpperBound = contentWidth - containerWidth
      let toScrollLeft = memoXLeft + dScrollLeft
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
      toScrollLeft = Math.max(toScrollLeft, 0)
      const { value: container } = mergedContainerRef
      if (container) {
        container.scrollLeft = toScrollLeft
      }
    }
    function handleXScrollMouseUp (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      off('mousemove', window, handleXScrollMouseMove, true)
      off('mouseup', window, handleXScrollMouseUp, true)
      xBarPressed = false
      sync()
      const { value: container } = mergedContainerRef
      if (!container?.contains(e.target as any)) {
        hideBar()
      }
    }
    function handleYScrollMouseDown (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      yBarPressed = true
      on('mousemove', window, handleYScrollMouseMove, true)
      on('mouseup', window, handleYScrollMouseUp, true)
      memoYTop = containerScrollTopRef.value as number
      memoMouseY = e.clientY
    }
    function handleYScrollMouseMove (e: MouseEvent): void {
      if (!yBarPressed) return
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      const { value: containerHeight } = containerHeightRef
      const { value: contentHeight } = contentHeightRef
      const { value: yBarSize } = yBarSizeRef
      if (containerHeight === null || contentHeight === null) return
      const dY = e.clientY - memoMouseY
      const dScrollTop =
        (dY * (contentHeight - containerHeight)) / (containerHeight - yBarSize)
      const toScrollTopUpperBound = contentHeight - containerHeight
      let toScrollTop = memoYTop + dScrollTop
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
      toScrollTop = Math.max(toScrollTop, 0)
      const { value: container } = mergedContainerRef
      if (container) {
        container.scrollTop = toScrollTop
      }
    }
    function handleYScrollMouseUp (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      off('mousemove', window, handleYScrollMouseMove, true)
      off('mouseup', window, handleYScrollMouseUp, true)
      yBarPressed = false
      sync()
      const { value: container } = mergedContainerRef
      if (!container?.contains(e.target as any)) {
        hideBar()
      }
    }
    onMounted(() => {
      // if container exist, it always can't be resolved when scrollbar is mounted
      // for example:
      // - component
      //   - scrollbar
      //     - inner
      // if you pass inner to scrollbar, you may use a ref inside component
      // however, when scrollbar is mounted, ref is not ready at component
      // you need to init by yourself
      if (props.container) return
      sync()
    })
    onBeforeUnmount(() => {
      if (xBarVanishTimerId !== undefined) {
        window.clearTimeout(xBarVanishTimerId)
      }
      if (yBarVanishTimerId !== undefined) {
        window.clearTimeout(yBarVanishTimerId)
      }
      off('mousemove', window, handleYScrollMouseMove, true)
      off('mouseup', window, handleYScrollMouseUp, true)
    })
    const themeRef = useTheme(
      'Scrollbar',
      'Scrollbar',
      style,
      scrollbarLight,
      props
    )
    return {
      sync,
      scrollTo,
      containerRef,
      contentRef,
      yRailRef,
      xRailRef,
      needYBar: needYBarRef,
      needXBar: needXBarRef,
      sizePx: sizePxRef,
      yBarSizePx: yBarSizePxRef,
      xBarSizePx: xBarSizePxRef,
      yBarTopPx: yBarTopPxRef,
      xBarLeftPx: xBarLeftPxRef,
      isShowXBar: isShowXBarRef,
      isShowYBar: isShowYBarRef,
      isIos,
      handleScroll,
      handleContentResize,
      handleMouseEnterWrapper,
      handleMouseLeaveWrapper,
      handleYScrollMouseDown,
      handleXScrollMouseDown,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, colorHover }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--color-hover': colorHover
        }
      })
    }
  },
  render () {
    const { $slots } = this
    if (!this.scrollable) return renderSlot($slots, 'default')
    return (
      <VResizeObserver onResize={this.handleContentResize}>
        {{
          default: () =>
            h(
              'div',
              mergeProps(this.$attrs, {
                class: 'n-scrollbar',
                style: this.cssVars,
                onMouseenter: this.handleMouseEnterWrapper,
                onMouseleave: this.handleMouseLeaveWrapper
              }),
              [
                this.container ? (
                  renderSlot($slots, 'default')
                ) : (
                  <div
                    ref="containerRef"
                    class="n-scrollbar-container"
                    style={this.containerStyle}
                    onScroll={this.handleScroll}
                  >
                    <VResizeObserver onResize={this.handleContentResize}>
                      {{
                        default: () => (
                          <div
                            ref="contentRef"
                            style={
                              [
                                this.contentStyle,
                                {
                                  width: this.xScrollable ? 'fit-content' : null
                                }
                              ] as any
                            }
                            class={['n-scrollbar-content', this.contentClass]}
                          >
                            {renderSlot($slots, 'default')}
                          </div>
                        )
                      }}
                    </VResizeObserver>
                  </div>
                ),
                <div
                  ref="yRailRef"
                  class={[
                    'n-scrollbar-rail n-scrollbar-rail--vertical',
                    {
                      'n-scrollbar-rail--disabled': !this.needYBar
                    }
                  ]}
                  style={
                    [this.horizontalRailStyle, { width: this.sizePx }] as any
                  }
                >
                  <Transition name="n-fade-in-transition">
                    {{
                      default: () =>
                        this.needYBar && this.isShowYBar && !this.isIos ? (
                          <div
                            class="n-scrollbar-rail__scrollbar"
                            style={{
                              height: this.yBarSizePx,
                              top: this.yBarTopPx,
                              width: this.sizePx,
                              borderRadius: this.sizePx
                            }}
                            onMousedown={this.handleYScrollMouseDown}
                          />
                        ) : null
                    }}
                  </Transition>
                </div>,
                <div
                  ref="xRailRef"
                  class={[
                    'n-scrollbar-rail n-scrollbar-rail--horizontal',
                    {
                      'n-scrollbar-rail--disabled': !this.needXBar
                    }
                  ]}
                  style={
                    [this.verticalRailStyle, { height: this.sizePx }] as any
                  }
                >
                  <Transition name="n-fade-in-transition">
                    {{
                      default: () =>
                        this.needXBar && this.isShowXBar && !this.isIos ? (
                          <div
                            class="n-scrollbar-rail__scrollbar"
                            style={{
                              height: this.sizePx,
                              width: this.xBarSizePx,
                              left: this.xBarLeftPx,
                              borderRadius: this.sizePx
                            }}
                            onMousedown={this.handleXScrollMouseDown}
                          />
                        ) : null
                    }}
                  </Transition>
                </div>
              ] as VNode[]
            )
        }}
      </VResizeObserver>
    )
  }
})
