import {
  h,
  defineComponent,
  computed,
  PropType,
  renderSlot,
  CSSProperties
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey, keysOf, MaybeArray } from '../../_utils'
import { NBaseClose } from '../../_internal'
import { cardLight } from '../styles'
import type { CardTheme } from '../styles'
import style from './styles/index.cssr'
import { getPadding } from 'seemly'

export interface Segmented {
  content?: boolean | 'soft'
  footer?: boolean | 'soft'
  action?: boolean | 'soft'
}

const cardProps = {
  title: String,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  headerStyle: [Object, String] as PropType<CSSProperties | string>,
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
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
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>
} as const

export { cardProps }
export const cardPropKeys = keysOf(cardProps)
export type CardProps = typeof cardProps

export default defineComponent({
  name: 'Card',
  props: {
    ...(useTheme.props as ThemeProps<CardTheme>),
    ...cardProps
  },
  setup (props) {
    const handleCloseClick = (): void => {
      const { onClose } = props
      if (onClose) call(onClose)
    }
    const themeRef = useTheme('Card', 'Card', style, cardLight, props)
    return {
      handleCloseClick,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const { size } = props
        const {
          self: {
            color,
            colorModal,
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
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--color': color,
          '--color-modal': colorModal,
          '--color-popover': colorPopover,
          '--text-color': textColor,
          '--line-height': lineHeight,
          '--action-color': actionColor,
          '--title-text-color': titleTextColor,
          '--title-font-weight': titleFontWeight,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--border-color': borderColor,
          '--box-shadow': boxShadow,
          // size
          '--padding-top': paddingTop,
          '--padding-bottom': paddingBottom,
          '--padding-left': paddingLeft,
          '--font-size': fontSize,
          '--title-font-size': titleFontSize,
          '--close-size': closeSize
        }
      })
    }
  },
  render () {
    const { segmented, bordered, hoverable, $slots } = this
    return (
      <div
        class={[
          'n-card',
          {
            [`n-card--content${
              typeof segmented !== 'boolean' && segmented.content === 'soft'
                ? '-soft'
                : ''
            }-segmented`]:
              segmented === true || (segmented !== false && segmented.content),
            [`n-card--footer${
              typeof segmented !== 'boolean' && segmented.footer === 'soft'
                ? '-soft'
                : ''
            }-segmented`]:
              segmented === true || (segmented !== false && segmented.footer),
            'n-card--action-segmented':
              segmented === true || (segmented !== false && segmented.action),
            'n-card--bordered': bordered,
            'n-card--hoverable': hoverable
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {$slots.cover ? (
          <div class="n-card-cover">{renderSlot($slots, 'cover')}</div>
        ) : null}
        {$slots.header || this.title || this.closable ? (
          <div class="n-card-header">
            <div class="n-card-header__main" style={this.headerStyle}>
              {renderSlot($slots, 'header', {}, () => [this.title])}
            </div>
            {$slots['header-extra'] ? (
              <div class="n-card-header__extra">
                {renderSlot($slots, 'header-extra')}
              </div>
            ) : null}
            {this.closable ? (
              <NBaseClose
                class="n-card-header__close"
                onClick={this.handleCloseClick}
              />
            ) : null}
          </div>
        ) : null}
        <div class="n-card__content" style={this.contentStyle}>
          {$slots}
        </div>
        {$slots.footer ? (
          <div class="n-card__footer" style={this.footerStyle}>
            {renderSlot($slots, 'footer')}
          </div>
        ) : null}
        {$slots.action ? (
          <div class="n-card__action">{renderSlot($slots, 'action')}</div>
        ) : null}
      </div>
    )
  }
})
