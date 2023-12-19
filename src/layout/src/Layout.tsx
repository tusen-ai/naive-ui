import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  ref,
  provide,
  type ExtractPropTypes
} from 'vue'
import { NScrollbar } from '../../_internal'
import type { ScrollbarProps, ScrollbarInst } from '../../_internal'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { createInjectionKey, useReactivated } from '../../_utils'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import type { LayoutInst } from './interface'
import { positionProp } from './interface'
import style from './styles/layout.cssr'

export const layoutProps = {
  embedded: Boolean,
  position: positionProp,
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object as PropType<Partial<ScrollbarProps>>,
  onScroll: Function as PropType<(e: Event) => void>,
  contentClass: String,
  contentStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: ''
  },
  hasSider: Boolean,
  siderPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  }
} as const

export type LayoutProps = ExtractPublicPropTypes<typeof layoutProps>

export const layoutInjectionKey =
  createInjectionKey<ExtractPropTypes<typeof layoutProps>>('n-layout')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createLayoutComponent (isContent: boolean) {
  return defineComponent({
    name: isContent ? 'LayoutContent' : 'Layout',
    props: {
      ...(useTheme.props as ThemeProps<LayoutTheme>),
      ...layoutProps
    },
    setup (props) {
      const scrollableElRef = ref<HTMLElement | null>(null)
      const scrollbarInstRef = ref<ScrollbarInst | null>(null)
      const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
      const themeRef = useTheme(
        'Layout',
        '-layout',
        style,
        layoutLight,
        props,
        mergedClsPrefixRef
      )
      function scrollTo (options: ScrollToOptions): void
      function scrollTo (x: number, y: number): void
      function scrollTo (options: ScrollToOptions | number, y?: number): void {
        if (props.nativeScrollbar) {
          const { value: scrollableEl } = scrollableElRef
          if (scrollableEl) {
            if (y === undefined) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              scrollableEl.scrollTo(options as any)
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              scrollableEl.scrollTo(options as any, y as any)
            }
          }
        } else {
          const { value: scrollbarInst } = scrollbarInstRef
          if (scrollbarInst) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            scrollbarInst.scrollTo(options as any, y as any)
          }
        }
      }
      provide(layoutInjectionKey, props)
      let scrollX = 0
      let scrollY = 0
      const handleNativeElScroll = (e: Event): void => {
        const target = e.target as HTMLElement
        scrollX = target.scrollLeft
        scrollY = target.scrollTop
        props.onScroll?.(e)
      }
      useReactivated(() => {
        if (props.nativeScrollbar) {
          const el = scrollableElRef.value
          if (el) {
            el.scrollTop = scrollY
            el.scrollLeft = scrollX
          }
        }
      })
      const hasSiderStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        flexDirection: 'row'
      }
      const exposedMethods: LayoutInst = {
        scrollTo
      }
      const cssVarsRef = computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-color': props.embedded ? self.colorEmbedded : self.color,
          '--n-text-color': self.textColor
        }
      })
      const themeClassHandle = inlineThemeDisabled
        ? useThemeClass(
          'layout',
          computed(() => {
            return props.embedded ? 'e' : ''
          }),
          cssVarsRef,
          props
        )
        : undefined
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        scrollableElRef,
        scrollbarInstRef,
        hasSiderStyle,
        mergedTheme: themeRef,
        handleNativeElScroll,
        cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
        themeClass: themeClassHandle?.themeClass,
        onRender: themeClassHandle?.onRender,
        ...exposedMethods
      }
    },
    render () {
      const { mergedClsPrefix, hasSider } = this
      this.onRender?.()
      const hasSiderStyle = hasSider ? this.hasSiderStyle : undefined
      const layoutClass = [
        this.themeClass,
        isContent && `${mergedClsPrefix}-layout-content`,
        `${mergedClsPrefix}-layout`,
        `${mergedClsPrefix}-layout--${this.position}-positioned`
      ]
      return (
        <div class={layoutClass} style={this.cssVars as CSSProperties}>
          {this.nativeScrollbar ? (
            <div
              ref="scrollableElRef"
              class={[
                `${mergedClsPrefix}-layout-scroll-container`,
                this.contentClass
              ]}
              style={[this.contentStyle, hasSiderStyle] as any}
              onScroll={this.handleNativeElScroll}
            >
              {this.$slots}
            </div>
          ) : (
            <NScrollbar
              {...this.scrollbarProps}
              onScroll={this.onScroll}
              ref="scrollbarInstRef"
              theme={this.mergedTheme.peers.Scrollbar}
              themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
              contentClass={this.contentClass}
              contentStyle={[this.contentStyle, hasSiderStyle] as any}
            >
              {this.$slots}
            </NScrollbar>
          )}
        </div>
      )
    }
  })
}

export default createLayoutComponent(false)
