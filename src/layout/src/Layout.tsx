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
      const scrollableDivRef = ref<HTMLElement | null>(null)
      const scrollbarRef = ref<ScrollbarInst | null>(null)
      const { mergedClsPrefixRef } = useConfig(props)
      const themeRef = useTheme(
        'Layout',
        'Layout',
        style,
        layoutLight,
        props,
        mergedClsPrefixRef
      )
      const scrollTo: LayoutInst['scrollTo'] = (
        options: ScrollToOptions | number,
        y?: number
      ): void => {
        if (scrollbarRef.value) {
          scrollbarRef.value.scrollTo(options as any, y as any)
        } else if (scrollableDivRef.value) {
          scrollableDivRef.value.scrollTo(options as any, y as any)
        }
      }
      const scrollableDivStyleRef = computed(() => {
        return [
          props.contentStyle,
          {
            height: '100%',
            overflow: 'auto'
          }
        ]
      })
      if (__DEV__) provide(layoutInjectionKey, props)
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        scrollableDivRef,
        scrollbarRef,
        scrollableDivStyle: scrollableDivStyleRef,
        scrollTo,
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
        })
      }
    },
    render () {
      const { mergedClsPrefix } = this
      return (
        <div
          class={[
            isContent && `${mergedClsPrefix}-layout-content`,
            `${mergedClsPrefix}-layout`,
            `${mergedClsPrefix}-layout--${this.position}-positioned`,
            this.hasSider && `${mergedClsPrefix}-layout--has-sider`
          ]}
          style={this.cssVars as CSSProperties}
        >
          {!this.nativeScrollbar ? (
            <NScrollbar
              {...this.scrollbarProps}
              ref="scrollbarRef"
              theme={this.mergedTheme.peers.Scrollbar}
              themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
              contentClass={`${mergedClsPrefix}-layout__content`}
              contentStyle={this.contentStyle}
            >
              {this.$slots}
            </NScrollbar>
          ) : (
            <div
              ref="scrollableDivRef"
              class={`${mergedClsPrefix}-layout__content`}
              style={this.scrollableDivStyle}
            >
              {this.$slots}
            </div>
          )}
        </div>
      )
    }
  })
}

export default createLayoutComponent(false)
