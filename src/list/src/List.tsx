import {
  computed,
  defineComponent,
  h,
  PropType,
  CSSProperties,
  Ref,
  provide
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createInjectionKey, ExtractPublicPropTypes } from '../../_utils'
import { listLight } from '../styles'
import type { ListTheme } from '../styles'
import style from './styles/index.cssr'

export const listProps = {
  ...(useTheme.props as ThemeProps<ListTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  bordered: {
    type: Boolean,
    default: false
  }
}

export type ListProps = ExtractPublicPropTypes<typeof listProps>

interface ListInjection {
  mergedClsPrefixRef: Ref<string>
}

export const listInjectionKey = createInjectionKey<ListInjection>('n-list')

export default defineComponent({
  name: 'List',
  props: listProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'List',
      '-list',
      style,
      listLight,
      props,
      mergedClsPrefixRef
    )
    provide(listInjectionKey, {
      mergedClsPrefixRef
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          fontSize,
          textColor,
          color,
          colorModal,
          colorPopover,
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-color': color,
        '--n-border-radius': borderRadius,
        '--n-border-color': borderColor,
        '--n-border-color-modal': borderColorModal,
        '--n-border-color-popover': borderColorPopover,
        '--n-color-modal': colorModal,
        '--n-color-popover': colorPopover
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('list', undefined, cssVarsRef, props)
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { $slots, mergedClsPrefix, onRender } = this
    onRender?.()
    return (
      <ul
        class={[
          `${mergedClsPrefix}-list`,
          this.bordered && `${mergedClsPrefix}-list--bordered`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        {$slots.header ? (
          <div class={`${mergedClsPrefix}-list__header`}>{$slots.header()}</div>
        ) : null}
        {$slots.default?.()}
        {$slots.footer ? (
          <div class={`${mergedClsPrefix}-list__footer`}>{$slots.footer()}</div>
        ) : null}
      </ul>
    )
  }
})
