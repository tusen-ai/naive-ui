import {
  h,
  computed,
  defineComponent,
  type CSSProperties,
  provide,
  type Ref,
  toRef
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { breadcrumbLight } from '../styles'
import type { BreadcrumbTheme } from '../styles'
import style from './styles/index.cssr'
import { createInjectionKey, type ExtractPublicPropTypes } from '../../_utils'

export interface BreadcrumbInjection {
  separatorRef: Ref<string>
  mergedClsPrefixRef: Ref<string>
}

export const breadcrumbInjectionKey =
  createInjectionKey<BreadcrumbInjection>('n-breadcrumb')

export const breadcrumbProps = {
  ...(useTheme.props as ThemeProps<BreadcrumbTheme>),
  separator: {
    type: String,
    default: '/'
  }
} as const

export type BreadcrumbProps = ExtractPublicPropTypes<typeof breadcrumbProps>

export default defineComponent({
  name: 'Breadcrumb',
  props: breadcrumbProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Breadcrumb',
      '-breadcrumb',
      style,
      breadcrumbLight,
      props,
      mergedClsPrefixRef
    )
    provide(breadcrumbInjectionKey, {
      separatorRef: toRef(props, 'separator'),
      mergedClsPrefixRef
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          separatorColor,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          fontSize,
          fontWeightActive,
          itemBorderRadius,
          itemColorHover,
          itemColorPressed,
          itemLineHeight
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-hover': itemTextColorHover,
        '--n-item-text-color-pressed': itemTextColorPressed,
        '--n-item-text-color-active': itemTextColorActive,
        '--n-separator-color': separatorColor,
        '--n-item-color-hover': itemColorHover,
        '--n-item-color-pressed': itemColorPressed,
        '--n-item-border-radius': itemBorderRadius,
        '--n-font-weight-active': fontWeightActive,
        '--n-item-line-height': itemLineHeight
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('breadcrumb', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    this.onRender?.()
    return (
      <nav
        class={[`${this.mergedClsPrefix}-breadcrumb`, this.themeClass]}
        style={this.cssVars as CSSProperties}
        aria-label="Breadcrumb"
      >
        <ul>{this.$slots}</ul>
      </nav>
    )
  }
})
