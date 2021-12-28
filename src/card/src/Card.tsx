import {
  h,
  defineComponent,
  computed,
  PropType,
  renderSlot,
  CSSProperties
} from 'vue'
import { getPadding } from 'seemly'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey, keysOf } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { NBaseClose } from '../../_internal'
import { cardLight } from '../styles'
import type { CardTheme } from '../styles'
import style from './styles/index.cssr'
import useRtl from '../../_mixins/use-rtl'

export interface Segmented {
  content?: boolean | 'soft'
  footer?: boolean | 'soft'
  action?: boolean | 'soft'
}

export const cardBaseProps = {
  title: String,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  headerStyle: [Object, String] as PropType<CSSProperties | string>,
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object] as PropType<boolean | Segmented>,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  bordered: {
    type: Boolean,
    default: true as boolean
  },
  closable: {
    type: Boolean,
    default: false as boolean
  },
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>
} as const

export const cardBasePropKeys = keysOf(cardBaseProps)

const cardProps = {
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
    const { mergedClsPrefixRef, NConfigProvider } = useConfig(props)
    const themeRef = useTheme(
      'Card',
      'Card',
      style,
      cardLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl(
      'Card',
      NConfigProvider?.mergedRtlRef,
      mergedClsPrefixRef
    )
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      handleCloseClick,
      cssVars: computed(() => {
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
            closeColor,
            closeColorHover,
            closeColorPressed,
            lineHeight,
            closeSize,
            boxShadow,
            colorPopover,
            colorEmbedded,
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
          '--n-color': props.embedded ? colorEmbedded : color,
          '--n-color-modal': colorModal,
          '--n-color-popover': colorPopover,
          '--n-color-target': colorTarget,
          '--n-text-color': textColor,
          '--n-line-height': lineHeight,
          '--n-action-color': actionColor,
          '--n-title-text-color': titleTextColor,
          '--n-title-font-weight': titleFontWeight,
          '--n-close-color': closeColor,
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
          '--n-close-size': closeSize
        }
      })
    }
  },
  render () {
    const {
      segmented,
      bordered,
      hoverable,
      mergedClsPrefix,
      rtlEnabled,
      $slots
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-card`,
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
        {$slots.cover ? (
          <div class={`${mergedClsPrefix}-card-cover`} role="none">
            {renderSlot($slots, 'cover')}
          </div>
        ) : null}
        {$slots.header || this.title || this.closable ? (
          <div
            class={`${mergedClsPrefix}-card-header`}
            style={this.headerStyle}
          >
            <div class={`${mergedClsPrefix}-card-header__main`} role="heading">
              {renderSlot($slots, 'header', {}, () => [this.title])}
            </div>
            {$slots['header-extra'] ? (
              <div class={`${mergedClsPrefix}-card-header__extra`}>
                {renderSlot($slots, 'header-extra')}
              </div>
            ) : null}
            {this.closable ? (
              <NBaseClose
                clsPrefix={mergedClsPrefix}
                class={`${mergedClsPrefix}-card-header__close`}
                onClick={this.handleCloseClick}
              />
            ) : null}
          </div>
        ) : null}
        <div
          class={`${mergedClsPrefix}-card__content`}
          style={this.contentStyle}
          role="none"
        >
          {$slots}
        </div>
        {$slots.footer ? (
          <div
            class={`${mergedClsPrefix}-card__footer`}
            style={this.footerStyle}
            role="none"
          >
            {renderSlot($slots, 'footer')}
          </div>
        ) : null}
        {$slots.action ? (
          <div class={`${mergedClsPrefix}-card__action`} role="none">
            {renderSlot($slots, 'action')}
          </div>
        ) : null}
      </div>
    )
  }
})
