import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  ref,
  InjectionKey,
  provide,
  ExtractPropTypes
} from 'vue'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps, ScrollbarInst } from '../../scrollbar'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout.cssr'
import { LayoutInst, positionProp } from './interface'
import type { ExtractPublicPropTypes } from '../../_utils'

const layoutProps = {
  embedded: Boolean,
  position: positionProp,
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object as PropType<Partial<ScrollbarProps>>,
  contentStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: ''
  },
  hasSider: Boolean
} as const

export type LayoutProps = ExtractPublicPropTypes<typeof layoutProps>

export const layoutInjectionKey: InjectionKey<
ExtractPropTypes<LayoutProps>
> = Symbol('layout')

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
      const { mergedClsPrefixRef } = useConfig(props)
      const themeRef = useTheme(
        'Layout',
        'Layout',
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
              scrollableEl.scrollTo(options as any)
            } else {
              scrollableEl.scrollTo(options as any, y as any)
            }
          }
        } else {
          const { value: scrollbarInst } = scrollbarInstRef
          if (scrollbarInst) {
            scrollbarInst.scrollTo(options as any, y as any)
          }
        }
      }
      if (__DEV__) provide(layoutInjectionKey, props)
      const hasSiderStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        flexDirection: 'row'
      }
      const exposedMethods: LayoutInst = {
        scrollTo
      }
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        scrollableElRef,
        scrollbarInstRef,
        hasSiderStyle,
        mergedTheme: themeRef,
        cssVars: computed(() => {
          const {
            common: { cubicBezierEaseInOut },
            self
          } = themeRef.value
          return {
            '--bezier': cubicBezierEaseInOut,
            '--color': props.embedded ? self.colorEmbedded : self.color,
            '--text-color': self.textColor
          }
        }),
        ...exposedMethods
      }
    },
    render () {
      const { mergedClsPrefix, hasSider } = this
      const hasSiderStyle = hasSider ? this.hasSiderStyle : undefined
      const layoutClass = [
        isContent && `${mergedClsPrefix}-layout-content`,
        `${mergedClsPrefix}-layout`,
        `${mergedClsPrefix}-layout--${this.position}-positioned`
      ]
      return (
        <div class={layoutClass} style={this.cssVars as CSSProperties}>
          {this.nativeScrollbar ? (
            <div
              ref="scrollableElRef"
              class={`${mergedClsPrefix}-layout-scroll-container`}
              style={[this.contentStyle, hasSiderStyle] as any}
            >
              {this.$slots}
            </div>
          ) : (
            <NScrollbar
              {...this.scrollbarProps}
              ref="scrollbarInstRef"
              theme={this.mergedTheme.peers.Scrollbar}
              themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
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
