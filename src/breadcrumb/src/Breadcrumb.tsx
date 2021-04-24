import {
  h,
  computed,
  defineComponent,
  CSSProperties,
  provide,
  InjectionKey,
  Ref,
  toRef
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { breadcrumbLight } from '../styles'
import type { BreadcrumbTheme } from '../styles'
import style from './styles/index.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

export interface BreadcrumbInjection {
  separatorRef: Ref<string>
  mergedClsPrefixRef: Ref<string>
}

export const breadcrumbInjectionKey: InjectionKey<BreadcrumbInjection> = Symbol(
  'breadcrumb'
)

const breadcrumbProps = {
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
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Breadcrumb',
      'Breadcrumb',
      style,
      breadcrumbLight,
      props,
      mergedClsPrefixRef
    )
    provide(breadcrumbInjectionKey, {
      separatorRef: toRef(props, 'separator'),
      mergedClsPrefixRef
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            separatorColor,
            itemTextColor,
            itemTextColorHover,
            itemTextColorPressed,
            itemTextColorActive,
            fontSize,
            fontWeightActive
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--item-text-color': itemTextColor,
          '--item-text-color-hover': itemTextColorHover,
          '--item-text-color-pressed': itemTextColorPressed,
          '--item-text-color-active': itemTextColorActive,
          '--separator-color': separatorColor,
          '--font-weight-active': fontWeightActive
        }
      })
    }
  },
  render () {
    return (
      <div
        class={`${this.mergedClsPrefix}-breadcrumb`}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
