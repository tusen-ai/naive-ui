import { computed, defineComponent, h, provide, toRef } from 'vue'
import type { PropType, CSSProperties, Ref } from 'vue'
import { useConfig, useTheme, useThemeClass, useRtl } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createInjectionKey, type ExtractPublicPropTypes } from '../../_utils'
import { listLight } from '../styles'
import type { ListTheme } from '../styles'
import style from './styles/index.cssr'

export const listProps = {
  ...(useTheme.props as ThemeProps<ListTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  bordered: Boolean,
  clickable: Boolean,
  hoverable: Boolean,
  showDivider: {
    type: Boolean,
    default: true
  }
}

export type ListProps = ExtractPublicPropTypes<typeof listProps>

interface ListInjection {
  showDividerRef: Ref<boolean>
  mergedClsPrefixRef: Ref<string>
}

export const listInjectionKey = createInjectionKey<ListInjection>('n-list')

export default defineComponent({
  name: 'List',
  props: listProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const rtlEnabledRef = useRtl('List', mergedRtlRef, mergedClsPrefixRef)
    const themeRef = useTheme(
      'List',
      '-list',
      style,
      listLight,
      props,
      mergedClsPrefixRef
    )
    provide(listInjectionKey, {
      showDividerRef: toRef(props, 'showDivider'),
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
          borderRadius,
          colorHover,
          colorHoverModal,
          colorHoverPopover
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
        '--n-color-popover': colorPopover,
        '--n-color-hover': colorHover,
        '--n-color-hover-modal': colorHoverModal,
        '--n-color-hover-popover': colorHoverPopover
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('list', undefined, cssVarsRef, props)
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
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
          this.rtlEnabled && `${mergedClsPrefix}-list--rtl`,
          this.bordered && `${mergedClsPrefix}-list--bordered`,
          this.showDivider && `${mergedClsPrefix}-list--show-divider`,
          this.hoverable && `${mergedClsPrefix}-list--hoverable`,
          this.clickable && `${mergedClsPrefix}-list--clickable`,
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
