import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  type VNodeChild
} from 'vue'
import { getPadding } from 'seemly'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey, keysOf, resolveWrappedSlot } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { NBaseClose } from '../../_internal'
import { cardLight } from '../styles'
import type { CardTheme } from '../styles'
import style from './styles/index.cssr'
import { ensureValidVNode } from '../../_utils/vue/resolve-slot'

export interface CardSegmented {
  content?: boolean | 'soft'
  footer?: boolean | 'soft'
  action?: boolean | 'soft'
}

export const cardBaseProps = {
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  contentClass: String,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  headerClass: String,
  headerStyle: [Object, String] as PropType<CSSProperties | string>,
  headerExtraClass: String,
  headerExtraStyle: [Object, String] as PropType<CSSProperties | string>,
  footerClass: String,
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object] as PropType<boolean | CardSegmented>,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  },
  cover: Function as PropType<() => VNodeChild>,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  footer: Function as PropType<() => VNodeChild>,
  action: Function as PropType<() => VNodeChild>,
  headerExtra: Function as PropType<() => VNodeChild>
} as const

export const cardBasePropKeys = keysOf(cardBaseProps)

export const cardProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  ...cardBaseProps
}

export type CardProps = ExtractPublicPropTypes<typeof cardProps>

export default defineComponent({
  name: 'Card',
  props: cardProps,
  setup (props) {
    const handleCloseClick = (): void => {
      const { onClose } = props
      if (onClose) call(onClose)
    }
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Card',
      '-card',
      style,
      cardLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Card', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        self: {
          color,
          colorModal,
          colorTarget,
          textColor,
          titleTextColor,
          titleFontWeight,
          borderColor,
          actionColor,
          borderRadius,
          lineHeight,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius,
          closeIconSize,
          closeSize,
          boxShadow,
          colorPopover,
          colorEmbedded,
          colorEmbeddedModal,
          colorEmbeddedPopover,
          [createKey('padding', size)]: padding,
          [createKey('fontSize', size)]: fontSize,
          [createKey('titleFontSize', size)]: titleFontSize
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      const {
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom
      } = getPadding(padding)
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-color': color,
        '--n-color-modal': colorModal,
        '--n-color-popover': colorPopover,
        '--n-color-embedded': colorEmbedded,
        '--n-color-embedded-modal': colorEmbeddedModal,
        '--n-color-embedded-popover': colorEmbeddedPopover,
        '--n-color-target': colorTarget,
        '--n-text-color': textColor,
        '--n-line-height': lineHeight,
        '--n-action-color': actionColor,
        '--n-title-text-color': titleTextColor,
        '--n-title-font-weight': titleFontWeight,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-border-color': borderColor,
        '--n-box-shadow': boxShadow,
        // size
        '--n-padding-top': paddingTop,
        '--n-padding-bottom': paddingBottom,
        '--n-padding-left': paddingLeft,
        '--n-font-size': fontSize,
        '--n-title-font-size': titleFontSize,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-close-border-radius': closeBorderRadius
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'card',
        computed(() => {
          return props.size[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      segmented,
      bordered,
      hoverable,
      mergedClsPrefix,
      rtlEnabled,
      onRender,
      embedded,
      tag: Component,
      $slots
    } = this
    onRender?.()
    return (
      <Component
        class={[
          `${mergedClsPrefix}-card`,
          this.themeClass,
          embedded && `${mergedClsPrefix}-card--embedded`,
          {
            [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
            [`${mergedClsPrefix}-card--content${
              typeof segmented !== 'boolean' && segmented.content === 'soft'
                ? '-soft'
                : ''
            }-segmented`]:
              segmented === true || (segmented !== false && segmented.content),
            [`${mergedClsPrefix}-card--footer${
              typeof segmented !== 'boolean' && segmented.footer === 'soft'
                ? '-soft'
                : ''
            }-segmented`]:
              segmented === true || (segmented !== false && segmented.footer),
            [`${mergedClsPrefix}-card--action-segmented`]:
              segmented === true || (segmented !== false && segmented.action),
            [`${mergedClsPrefix}-card--bordered`]: bordered,
            [`${mergedClsPrefix}-card--hoverable`]: hoverable
          }
        ]}
        style={this.cssVars as CSSProperties}
        role={this.role}
      >
        {resolveWrappedSlot($slots.cover, (children) => {
          const mergedChildren = this.cover
            ? ensureValidVNode([this.cover()])
            : children
          return (
            mergedChildren && (
              <div class={`${mergedClsPrefix}-card-cover`} role="none">
                {mergedChildren}
              </div>
            )
          )
        })}
        {resolveWrappedSlot($slots.header, (children) => {
          const { title } = this
          const mergedChildren = title
            ? ensureValidVNode(
              typeof title === 'function' ? [title()] : [title]
            )
            : children
          return mergedChildren || this.closable ? (
            <div
              class={[`${mergedClsPrefix}-card-header`, this.headerClass]}
              style={this.headerStyle}
              role="heading"
            >
              <div
                class={`${mergedClsPrefix}-card-header__main`}
                role="heading"
              >
                {mergedChildren}
              </div>
              {resolveWrappedSlot($slots['header-extra'], (children) => {
                const mergedChildren = this.headerExtra
                  ? ensureValidVNode([this.headerExtra()])
                  : children
                return (
                  mergedChildren && (
                    <div
                      class={[
                        `${mergedClsPrefix}-card-header__extra`,
                        this.headerExtraClass
                      ]}
                      style={this.headerExtraStyle}
                    >
                      {mergedChildren}
                    </div>
                  )
                )
              })}
              {this.closable && (
                <NBaseClose
                  clsPrefix={mergedClsPrefix}
                  class={`${mergedClsPrefix}-card-header__close`}
                  onClick={this.handleCloseClick}
                  absolute
                />
              )}
            </div>
          ) : null
        })}
        {resolveWrappedSlot($slots.default, (children) => {
          const { content } = this
          const mergedChildren = content
            ? ensureValidVNode(
              typeof content === 'function' ? [content()] : [content]
            )
            : children
          return (
            mergedChildren && (
              <div
                class={[`${mergedClsPrefix}-card__content`, this.contentClass]}
                style={this.contentStyle}
                role="none"
              >
                {mergedChildren}
              </div>
            )
          )
        })}
        {resolveWrappedSlot($slots.footer, (children) => {
          const mergedChildren = this.footer
            ? ensureValidVNode([this.footer()])
            : children
          return (
            mergedChildren && (
              <div
                class={[`${mergedClsPrefix}-card__footer`, this.footerClass]}
                style={this.footerStyle}
                role="none"
              >
                {mergedChildren}
              </div>
            )
          )
        })}
        {resolveWrappedSlot($slots.action, (children) => {
          const mergedChildren = this.action
            ? ensureValidVNode([this.action()])
            : children
          return (
            mergedChildren && (
              <div class={`${mergedClsPrefix}-card__action`} role="none">
                {mergedChildren}
              </div>
            )
          )
        })}
      </Component>
    )
  }
})
