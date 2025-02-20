import type { VirtualListInst } from 'vueuc'
import type { ItemData } from 'vueuc/lib/virtual-list/src/type'
import type { ScrollbarInst } from '../../_internal'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { LogTheme } from '../styles'
import { throttle } from 'lodash-es'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  type PropType,
  provide,
  type Ref,
  ref,
  toRef,
  Transition
} from 'vue'
import { VirtualList } from 'vueuc'
import { NScrollbar } from '../../_internal'
import {
  type Hljs,
  type ThemeProps,
  useConfig,
  useHljs,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { warn } from '../../_utils'
import { NCode } from '../../code'
import { logLight } from '../styles'
import { logInjectionKey } from './context'
import NLogLine from './LogLine'
import NLogLoader from './LogLoader'
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
  virtualScroll: {
    type: Boolean,
    default: true
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
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const virtualListRef = ref<VirtualListInst | null>()
    const silentRef = ref(false)
    const highlightRef = computed(() => {
      return props.language !== undefined
    })
    const styleHeightRef = computed(() => {
      return `calc(${Math.round(
        props.rows * props.lineHeight * props.fontSize
      )}px)`
    })

    const itemSize = computed(() => {
      return props.lineHeight * props.fontSize
    })

    const mergedLinesRef = computed(() => {
      const { log } = props
      let lines: string[] = []
      if (log) {
        lines = log.split('\n')
      }
      else {
        lines = props.lines || []
      }
      const result: ItemData[] = []
      lines.forEach((line, index) => {
        result.push({ key: index, value: line })
      })

      return result
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

    function scrollContainer(): HTMLElement | null {
      const { value } = virtualListRef
      if (!value)
        return null
      const { listElRef } = value
      return listElRef
    }
    function scrollContent(): HTMLElement | null {
      const { value } = virtualListRef
      if (!value)
        return null
      const { itemsElRef } = value
      return itemsElRef
    }

    function syncVLScroller(e: Event): void {
      scrollbarRef.value?.sync()
      handleScroll(e)
    }

    function handleScroll(e: Event): void {
      scrollbarRef.value?.sync()
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
        if (onRequireMore)
          onRequireMore('top')
        if (onReachTop)
          onReachTop()
      }
      if (scrollBottom <= props.offsetBottom) {
        const { onReachBottom, onRequireMore } = props
        if (onRequireMore)
          onRequireMore('bottom')
        if (onReachBottom)
          onReachBottom()
      }
    }
    const handleWheel = throttle(_handleWheel, 300)
    function _handleWheel(e: WheelEvent): void {
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
          const scrollBottom
            = contentHeight - containerScrollTop - containerHeight
          const deltaY = e.deltaY
          if (scrollTop === 0 && deltaY < 0) {
            const { onRequireMore } = props
            if (onRequireMore)
              onRequireMore('top')
          }
          if (scrollBottom <= 0 && deltaY > 0) {
            const { onRequireMore } = props
            if (onRequireMore)
              onRequireMore('bottom')
          }
        }
      }
    }
    function scrollTo(options: {
      silent?: boolean
      position: 'top' | 'bottom'
    }): void
    function scrollTo(options: { silent?: boolean, top: number }): void
    function scrollTo(options: {
      silent?: boolean
      top?: number
      position?: 'top' | 'bottom'
    }): void {
      const { value: scrollbarInst } = scrollbarRef
      if (!scrollbarInst)
        return
      const { silent, top, position } = options
      if (silent) {
        silentRef.value = true
      }
      if (top !== undefined) {
        scrollbarInst.scrollTo({ left: 0, top })
      }
      else if (position === 'bottom' || position === 'top') {
        scrollbarInst.scrollTo({ position })
      }
    }
    // deprecated
    function scrollToTop(silent = false): void {
      warn(
        'log',
        '`scrollToTop` is deprecated, please use `scrollTo({ position: \'top\'})` instead.'
      )
      scrollTo({
        position: 'top',
        silent
      })
    }
    function scrollToBottom(silent = false): void {
      warn(
        'log',
        '`scrollToTop` is deprecated, please use `scrollTo({ position: \'bottom\'})` instead.'
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
      virtualListRef,
      itemSize,
      syncVLScroller,
      scrollContent,
      scrollContainer,
      scrollToTop,
      scrollToBottom,
      handleWheel,
      handleScroll,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      onRender,
      virtualScroll,
      syncVLScroller
    } = this
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
          container={virtualScroll ? this.scrollContainer : undefined}
          content={virtualScroll ? this.scrollContent : undefined}
          onScroll={virtualScroll ? undefined : this.handleScroll}
        >
          {{
            default: () => {
              return virtualScroll ? (
                <NCode
                  internalNoHighlight
                  internalFontSize={this.fontSize}
                  theme={mergedTheme.peers.Code}
                  themeOverrides={mergedTheme.peerOverrides.Code}
                >
                  <VirtualList
                    ref="virtualListRef"
                    style={{ height: '100%' }}
                    class={`${mergedClsPrefix}-virtual-list`}
                    items={this.mergedLines}
                    itemSize={this.itemSize}
                    showScrollbar={false}
                    onScroll={syncVLScroller}
                  >
                    {{
                      default: ({ item }: { item: ItemData }) => (
                        <NLogLine key={item.key} line={item.value} />
                      )
                    }}
                  </VirtualList>
                </NCode>
              ) : (
                <NCode
                  internalNoHighlight
                  internalFontSize={this.fontSize}
                  theme={mergedTheme.peers.Code}
                  themeOverrides={mergedTheme.peerOverrides.Code}
                >
                  {{
                    default: () =>
                      this.mergedLines.map((item) => {
                        return <NLogLine key={item.key} line={item.value} />
                      })
                  }}
                </NCode>
              )
            }
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
