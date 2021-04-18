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
  position: positionProp,
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object as PropType<Partial<ScrollbarProps>>,
  hasSider: Boolean
} as const

export type LayoutProps = ExtractPublicPropTypes<typeof layoutProps>

export const layoutInjectionKey: InjectionKey<
ExtractPropTypes<LayoutProps>
> = Symbol('layout')

export default defineComponent({
  name: 'Layout',
  alias: ['LayoutContent'],
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutProps
  },
  setup (props) {
    const selfRef = ref<HTMLElement | null>(null)
    const scrollbarRef = ref<ScrollbarInst | null>(null)
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'Layout',
      style,
      layoutLight,
      props,
      mergedClsPrefix
    )
    const scrollTo: LayoutInst['scrollTo'] = (
      options: ScrollToOptions | number,
      y?: number
    ): void => {
      if (scrollbarRef.value) {
        scrollbarRef.value.scrollTo(options as any, y as any)
      } else if (selfRef.value) {
        selfRef.value.scrollTo(options as any, y as any)
      }
    }
    if (__DEV__) provide(layoutInjectionKey, props)
    return {
      mergedClsPrefix,
      selfRef,
      scrollbarRef,
      scrollTo,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="selfRef"
        class={[
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
          >
            {this.$slots}
          </NScrollbar>
        ) : (
          this.$slots
        )}
      </div>
    )
  }
})
