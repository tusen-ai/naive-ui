import type { ScrollbarProps } from 'naive-ui'
import type {
  CSSProperties,
  PropType,
  SlotsType
} from 'vue'
import type { ScrollbarInst } from '../../_internal'
import type { ThemeProps } from '../../_mixins'
import type { BubbleListTheme } from '../styles/light'
import type {
  BubbleListData,
  BubbleListInst,
  BubbleListRolesType,
  BubbleListSlots
} from './public-types'
import { NBubble, NScrollbar } from 'naive-ui'
import { pxfy } from 'seemly'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  ref,
  watch
} from 'vue'
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
        scrollbarInst.scrollTo({ left: 0, top, behavior: 'smooth' })
      }
      else if (position === 'bottom' || position === 'top') {
        scrollbarInst.scrollTo({ position, behavior: 'smooth' })
      }
    }

    function autoScroll() {
      scrollTo({ position: 'bottom' })
    }

    function handleScroll(): void {
      // e: Event
      if (silentRef.value) {
        void nextTick(() => {
          silentRef.value = false
        })
      }
    }

    watch(
      () => props.data.length,
      () => {
        if (props.data && props.data.length) {
          nextTick(() => {
            autoScroll()
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
      <NScrollbar
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
      </NScrollbar>
    )
  }
})
