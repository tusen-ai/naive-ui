import type { ScrollbarProps } from 'naive-ui'
import type { CSSProperties, PropType, SlotsType } from 'vue'
import type { ScrollbarInst } from '../../_internal'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { BubbleListTheme } from '../styles/light'
import type {
  BubbleListData,
  BubbleListInst,
  BubbleListRolesType,
  BubbleListSlots
} from './public-types'
import { NBubble } from 'naive-ui'
import { pxfy } from 'seemly'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  reactive,
  ref,
  watch
} from 'vue'
import { NxScrollbar } from '../../_internal'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import bubbleListLight from '../styles/light'
import style from './styles/index.cssr'

export const bubbleListProps = {
  ...(useTheme.props as ThemeProps<BubbleListTheme>),
  roles: {
    type: [Object] as PropType<BubbleListRolesType>,
    default: {}
  },
  data: {
    type: Array<BubbleListData>,
    default: []
  },
  gap: [String, Number] as PropType<string | number>,
  scrollbarProps: Object as PropType<ScrollbarProps>
}

export type BubbleListProps = ExtractPublicPropTypes<typeof bubbleListProps>

export default defineComponent({
  name: 'BubbleList',
  props: bubbleListProps,
  slots: Object as SlotsType<BubbleListSlots>,
  setup(props) {
    const { inlineThemeDisabled, mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'BubbleList',
      '-bubble-list',
      style,
      bubbleListLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const { gap: propGap } = props
      const {
        self: { gap }
      } = themeRef.value
      return {
        '--n-gap':
          propGap === undefined
            ? gap
            : typeof propGap === 'number'
              ? pxfy(propGap)
              : propGap
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('bubbleList', undefined, cssVarsRef, props)
      : undefined

    const mergedData = computed(() => {
      return props.data.map((item) => {
        const roleConfig = props.roles[item.role] || {}
        return {
          ...roleConfig,
          ...item,
          options: {
            ...roleConfig.options,
            ...item.options
          }
        }
      })
    })

    const silentRef = ref(false)
    const scrollbarRef = ref<ScrollbarInst | null>(null)
    const stopAutoScrollToBottom = ref(false)

    const scrollState = reactive({
      isNearBottom: true, // 用户是否在底部附近
      isScrollingUp: false, // 用户是否正在向上滚动
      isScrollingDown: false, // 用户是否正在向下滚动
      lastScrollTop: 0, // 上次滚动位置
      accumulatedScrollUp: 0, // 累计向上滚动距离
      threshold: 30, // 触发停止自动滚动的阈值(像素)
      bottomThreshold: 50 // 判定为"接近底部"的阈值(像素)
    })

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
        stopAutoScrollToBottom.value = true
        scrollbarInst.scrollTo({ left: 0, top, behavior: 'smooth' })
      }
      else if (position === 'top') {
        stopAutoScrollToBottom.value = true
        scrollbarInst.scrollTo({ position, behavior: 'smooth' })
      }
      else if (position === 'bottom') {
        scrollbarInst.scrollTo({ position, behavior: 'smooth' })
        stopAutoScrollToBottom.value = false
        scrollState.isNearBottom = true
        scrollState.accumulatedScrollUp = 0
      }
    }

    const resizeObserver = ref<ResizeObserver | null>(null)
    function autoScroll() {
      const { value: scrollbarInst } = scrollbarRef
      if (!scrollbarInst)
        return
      const { containerRef } = scrollbarInst
      const listBubbles = containerRef!.querySelectorAll(
        '.n-bubble__content-wrapper'
      )
      if (resizeObserver.value) {
        resizeObserver.value.disconnect()
        resizeObserver.value = null
      }
      const lastItem = listBubbles[listBubbles.length - 1]
      if (lastItem) {
        resizeObserver.value = new ResizeObserver(() => {
          if (!stopAutoScrollToBottom.value && scrollState.isNearBottom) {
            scrollTo({ position: 'bottom' })
          }
        })
        resizeObserver.value.observe(lastItem)
      }
    }

    function handleScroll(e: Event): void {
      const container = e.target as HTMLElement

      if (silentRef.value) {
        void nextTick(() => {
          silentRef.value = false
        })
        return
      }

      const { scrollTop, scrollHeight, clientHeight } = container

      const isNearBottom
        = scrollTop + clientHeight >= scrollHeight - scrollState.bottomThreshold

      const scrollDelta = scrollState.lastScrollTop - scrollTop
      scrollState.isScrollingUp = scrollDelta > 0
      scrollState.isScrollingDown = scrollDelta < 0
      scrollState.lastScrollTop = scrollTop

      if (scrollState.isScrollingUp) {
        scrollState.accumulatedScrollUp += Math.abs(scrollDelta)
      }
      else {
        scrollState.accumulatedScrollUp = 0
      }

      if (scrollState.accumulatedScrollUp >= scrollState.threshold) {
        if (!stopAutoScrollToBottom.value) {
          stopAutoScrollToBottom.value = true
        }
        scrollState.accumulatedScrollUp = 0
      }
      scrollState.isNearBottom = isNearBottom

      if (scrollState.isScrollingDown && isNearBottom) {
        if (stopAutoScrollToBottom.value) {
          stopAutoScrollToBottom.value = false
        }
      }
    }

    watch(
      () => props.data.length,
      () => {
        if (props.data && props.data.length) {
          nextTick(() => {
            if (!stopAutoScrollToBottom.value) {
              autoScroll()
            }
          })
        }
      }
    )

    const exportedMethods: BubbleListInst = {
      scrollTo
    }

    return {
      ...exportedMethods,
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      mergedData,
      scrollbarRef,
      handleScroll
    }
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      $slots,
      mergedData,
      scrollbarProps,
      handleScroll
    } = this
    return (
      <NxScrollbar
        {...scrollbarProps}
        ref="scrollbarRef"
        class={this.themeClass}
        theme={mergedTheme.peers.Scrollbar}
        themeOverrides={mergedTheme.peerOverrides.Scrollbar}
        onScroll={handleScroll}
        contentClass={`${mergedClsPrefix}-bubble-list`}
        style={this.cssVars as CSSProperties}
      >
        {{
          default: () =>
            mergedData.map((item: BubbleListData, index: number) => {
              return (
                <NBubble
                  key={index}
                  gap={item.gap}
                  placement={item.placement}
                  avatar={item.avatar}
                  variant={item.variant}
                  shape={item.shape}
                  loading={item.loading}
                  content={item.content}
                  isTyping={item.isTyping}
                  options={item.options}
                  isMarkdown={item.isMarkdown}
                >
                  {{
                    ...($slots.avatar && {
                      avatar: () => $slots.avatar?.({ item, index })
                    }),
                    ...($slots.header && {
                      header: () => $slots.header?.({ item, index })
                    }),
                    ...($slots.footer && {
                      footer: () => $slots.footer?.({ item, index })
                    }),
                    ...($slots.content && {
                      content: () => $slots.content?.({ item, index })
                    }),
                    ...($slots.loading && {
                      loading: () => $slots.loading?.({ item, index })
                    })
                  }}
                </NBubble>
              )
            })
        }}
      </NxScrollbar>
    )
  }
})
