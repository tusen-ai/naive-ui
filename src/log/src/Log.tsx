import {
  h,
  Transition,
  defineComponent,
  computed,
  VNode,
  provide,
  PropType,
  nextTick,
  ref,
  reactive,
  toRef
} from 'vue'
import { throttle } from 'lodash-es'
import { useTheme, useHljs, ThemeProps } from '../../_mixins'
import type { Hljs } from '../../_mixins'
import { warn } from '../../_utils'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarRef } from '../../scrollbar'
import { NCode } from '../../code'
import { logLight, LogTheme } from '../styles'
import NLogLoader from './LogLoader'
import NLogLine from './LogLine'
import style from './styles/index.cssr'

export interface LogInjection {
  trim: boolean
  language: string | undefined
  highlight: boolean
  mergedHljs: Hljs | undefined
}

export default defineComponent({
  name: 'Log',
  props: {
    ...(useTheme.props as ThemeProps<LogTheme>),
    loading: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Boolean,
      default: false
    },
    log: String,
    fontSize: {
      type: Number,
      default: 14
    },
    lines: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    lineHeight: {
      type: Number,
      default: 1.25
    },
    language: String,
    rows: {
      type: Number,
      default: 15
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number,
      default: 0
    },
    hljs: {
      type: Object,
      default: undefined
    },
    onReachTop: Function as PropType<() => void>,
    onReachBottom: Function as PropType<() => void>,
    onRequireMore: Function as PropType<(from: 'top' | 'bottom') => void>
  },
  setup (props) {
    const slientRef = ref(false)
    const highlightRef = computed(() => {
      return props.language !== undefined
    })
    const styleHeightRef = computed(() => {
      const lineHeight = Math.floor(props.fontSize * props.lineHeight)
      return `calc(${props.rows * lineHeight}px)`
    })
    const mergedLinesRef = computed(() => {
      const { log } = props
      if (log) {
        return log.split('\n')
      }
      return props.lines
    })
    const scrollbarRef = ref<ScrollbarRef | null>(null)
    const themeRef = useTheme('Log', 'Log', style, logLight, props)
    function handleScroll (e: Event): void {
      const container = e.target as HTMLElement
      const content = container.firstElementChild as HTMLElement
      if (slientRef.value) {
        void nextTick(() => {
          slientRef.value = false
        })
        return
      }
      const containerHeight = container.offsetHeight
      const containerScrollTop = container.scrollTop
      const contentHeight = content.offsetHeight
      const scrollTop = containerScrollTop
      const scrollBottom = contentHeight - containerScrollTop - containerHeight
      if (scrollTop <= props.offsetTop) {
        const { onReachTop, onRequireMore } = props
        if (onRequireMore) onRequireMore('top')
        if (onReachTop) onReachTop()
      }
      if (scrollBottom <= props.offsetBottom) {
        const { onReachBottom, onRequireMore } = props
        if (onRequireMore) onRequireMore('bottom')
        if (onReachBottom) onReachBottom()
      }
    }
    const handleWheel = throttle(_handleWheel, 300)
    function _handleWheel (e: WheelEvent): void {
      if (slientRef.value) {
        void nextTick(() => {
          slientRef.value = false
        })
        return
      }
      if (scrollbarRef.value) {
        const { containerRef, contentRef } = scrollbarRef.value
        if (containerRef && contentRef) {
          const containerHeight = containerRef.offsetHeight
          const containerScrollTop = containerRef.scrollTop
          const contentHeight = contentRef.offsetHeight
          const scrollTop = containerScrollTop
          const scrollBottom =
            contentHeight - containerScrollTop - containerHeight
          const deltaY = e.deltaY
          if (scrollTop === 0 && deltaY < 0) {
            const { onRequireMore } = props
            if (onRequireMore) onRequireMore('top')
          }
          if (scrollBottom <= 0 && deltaY > 0) {
            const { onRequireMore } = props
            if (onRequireMore) onRequireMore('bottom')
          }
        }
      }
    }
    function scrollTo (options: {
      slient?: boolean
      position: 'top' | 'bottom'
    }): void
    function scrollTo (options: { slient?: boolean, top: number }): void
    function scrollTo (options: {
      slient?: boolean
      top?: number
      position?: 'top' | 'bottom'
    }): void {
      const { value: scrollbarInst } = scrollbarRef
      if (!scrollbarInst) return
      const { slient, top, position } = options
      if (slient) {
        slientRef.value = true
      }
      if (top !== undefined) {
        scrollbarInst.scrollTo({ left: 0, top })
      } else if (position === 'bottom' || position === 'top') {
        scrollbarInst.scrollTo({ position })
      }
    }
    // deprecated
    function scrollToTop (slient = false): void {
      warn(
        'log',
        "`scrollToTop` is deprecated, please use `scrollTo({ position: 'top'})` instead."
      )
      scrollTo({
        position: 'top',
        slient
      })
    }
    function scrollToBottom (slient = false): void {
      warn(
        'log',
        "`scrollToTop` is deprecated, please use `scrollTo({ position: 'bottom'})` instead."
      )
      scrollTo({
        position: 'bottom',
        slient
      })
    }
    provide<LogInjection>(
      'NLog',
      reactive({
        language: toRef(props, 'language'),
        mergedHljs: useHljs(props),
        trim: toRef(props, 'trim'),
        highlight: highlightRef
      })
    )
    return {
      scrollbarRef,
      mergedTheme: themeRef,
      styleHeight: styleHeightRef,
      mergedLines: mergedLinesRef,
      scrollTo,
      scrollToTop,
      scrollToBottom,
      handleWheel,
      handleScroll,
      cssVars: computed(() => {
        const {
          self: {
            loaderFontSize,
            loaderTextColor,
            loaderColor,
            loaderBorder,
            loadingColor
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--loader-font-size': loaderFontSize,
          '--loader-border': loaderBorder,
          '--loader-color': loaderColor,
          '--loader-text-color': loaderTextColor,
          '--loading-color': loadingColor
        }
      })
    }
  },
  render () {
    return h(
      'div',
      {
        class: 'n-log',
        style: [
          {
            lineHeight: this.lineHeight,
            height: this.styleHeight
          },
          this.cssVars
        ],
        onWheelPassive: this.handleWheel
      },
      [
        <NScrollbar
          ref="scrollbarRef"
          theme={this.mergedTheme.peers.Scrollbar}
          themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
          onScroll={this.handleScroll}
        >
          {{
            default: () => (
              <NCode
                theme={this.mergedTheme.peers.Code}
                themeOverrides={this.mergedTheme.peerOverrides.Code}
              >
                {{
                  default: () =>
                    this.mergedLines.map((line, index) => {
                      return <NLogLine key={index} line={line} />
                    })
                }}
              </NCode>
            )
          }}
        </NScrollbar>,
        <Transition name="n-fade-in-scale-up-transition">
          {{ default: () => (this.loading ? <NLogLoader /> : null) }}
        </Transition>
      ] as VNode[]
    )
  }
})
