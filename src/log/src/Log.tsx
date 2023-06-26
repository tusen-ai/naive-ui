import {
  h,
  Transition,
  defineComponent,
  computed,
  provide,
  type PropType,
  nextTick,
  ref,
  toRef,
  type Ref
} from 'vue'
import { throttle } from 'lodash-es'
import {
  useTheme,
  useHljs,
  type ThemeProps,
  useConfig,
  useThemeClass,
  type Hljs
} from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { warn } from '../../_utils'
import { NScrollbar } from '../../_internal'
import type { ScrollbarInst } from '../../_internal'
import { NCode } from '../../code'
import type { LogTheme } from '../styles'
import { logLight } from '../styles'
import NLogLoader from './LogLoader'
import NLogLine from './LogLine'
import { logInjectionKey } from './context'
import style from './styles/index.cssr'

export interface LogInjection {
  trimRef: Ref<boolean>
  languageRef: Ref<string | undefined>
  highlightRef: Ref<boolean>
  mergedHljsRef: Ref<Hljs | undefined>
}

export interface LogInst {
  scrollTo: ((options: {
    silent?: boolean
    position: 'top' | 'bottom'
  }) => void) &
  ((options: { silent?: boolean, top: number }) => void)
}

export const logProps = {
  ...(useTheme.props as ThemeProps<LogTheme>),
  loading: Boolean,
  trim: Boolean,
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
  hljs: Object,
  onReachTop: Function as PropType<() => void>,
  onReachBottom: Function as PropType<() => void>,
  onRequireMore: Function as PropType<(from: 'top' | 'bottom') => void>
} as const

export type LogProps = ExtractPublicPropTypes<typeof logProps>

export default defineComponent({
  name: 'Log',
  props: logProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const silentRef = ref(false)
    const highlightRef = computed(() => {
      return props.language !== undefined
    })
    const styleHeightRef = computed(() => {
      return `calc(${Math.round(
        props.rows * props.lineHeight * props.fontSize
      )}px)`
    })
    const mergedLinesRef = computed(() => {
      const { log } = props
      if (log) {
        return log.split('\n')
      }
      return props.lines
    })
    const scrollbarRef = ref<ScrollbarInst | null>(null)
    const themeRef = useTheme(
      'Log',
      '-log',
      style,
      logLight,
      props,
      mergedClsPrefixRef
    )
    function handleScroll (e: Event): void {
      const container = e.target as HTMLElement
      const content = container.firstElementChild as HTMLElement
      if (silentRef.value) {
        void nextTick(() => {
          silentRef.value = false
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
      if (silentRef.value) {
        void nextTick(() => {
          silentRef.value = false
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
      silent?: boolean
      position: 'top' | 'bottom'
    }): void
    function scrollTo (options: { silent?: boolean, top: number }): void
    function scrollTo (options: {
      silent?: boolean
      top?: number
      position?: 'top' | 'bottom'
    }): void {
      const { value: scrollbarInst } = scrollbarRef
      if (!scrollbarInst) return
      const { silent, top, position } = options
      if (silent) {
        silentRef.value = true
      }
      if (top !== undefined) {
        scrollbarInst.scrollTo({ left: 0, top })
      } else if (position === 'bottom' || position === 'top') {
        scrollbarInst.scrollTo({ position })
      }
    }
    // deprecated
    function scrollToTop (silent = false): void {
      warn(
        'log',
        "`scrollToTop` is deprecated, please use `scrollTo({ position: 'top'})` instead."
      )
      scrollTo({
        position: 'top',
        silent
      })
    }
    function scrollToBottom (silent = false): void {
      warn(
        'log',
        "`scrollToTop` is deprecated, please use `scrollTo({ position: 'bottom'})` instead."
      )
      scrollTo({
        position: 'bottom',
        silent
      })
    }
    provide(logInjectionKey, {
      languageRef: toRef(props, 'language'),
      mergedHljsRef: useHljs(props, highlightRef),
      trimRef: toRef(props, 'trim'),
      highlightRef
    })

    const exportedMethods: LogInst = {
      scrollTo
    }

    const cssVarsRef = computed(() => {
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
        '--n-bezier': cubicBezierEaseInOut,
        '--n-loader-font-size': loaderFontSize,
        '--n-loader-border': loaderBorder,
        '--n-loader-color': loaderColor,
        '--n-loader-text-color': loaderTextColor,
        '--n-loading-color': loadingColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('log', undefined, cssVarsRef, props)
      : undefined

    return {
      ...exportedMethods,
      mergedClsPrefix: mergedClsPrefixRef,
      scrollbarRef,
      mergedTheme: themeRef,
      styleHeight: styleHeightRef,
      mergedLines: mergedLinesRef,
      scrollToTop,
      scrollToBottom,
      handleWheel,
      handleScroll,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme, onRender } = this
    onRender?.()
    return h(
      'div',
      {
        class: [`${mergedClsPrefix}-log`, this.themeClass],
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
          theme={mergedTheme.peers.Scrollbar}
          themeOverrides={mergedTheme.peerOverrides.Scrollbar}
          onScroll={this.handleScroll}
        >
          {{
            default: () => (
              <NCode
                internalNoHighlight
                internalFontSize={this.fontSize}
                theme={mergedTheme.peers.Code}
                themeOverrides={mergedTheme.peerOverrides.Code}
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
        <Transition name="fade-in-scale-up-transition">
          {{
            default: () =>
              this.loading ? <NLogLoader clsPrefix={mergedClsPrefix} /> : null
          }}
        </Transition>
      ]
    )
  }
})
