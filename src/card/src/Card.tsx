import { h, defineComponent, computed, PropType, renderSlot } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import { NBaseClose } from '../../_base'
import { cardLight } from '../styles'
import type { CardTheme } from '../styles'
import style from './styles/index.cssr'

interface Segmented {
  content?: boolean | 'soft'
  footer?: boolean | 'soft'
  action?: boolean | 'soft'
}

export default defineComponent({
  name: 'Card',
  props: {
    ...(useTheme.props as ThemeProps<CardTheme>),
    title: {
      type: String,
      default: undefined
    },
    contentStyle: {
      type: [Object, String],
      default: undefined
    },
    headerStyle: {
      type: [Object, String],
      default: undefined
    },
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
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const handleCloseClick = (): void => {
      const { onClose } = props
      if (onClose) onClose()
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
            [createKey('paddingTop', size)]: paddingTop,
            [createKey('paddingBottom', size)]: paddingBottom,
            [createKey('paddingLeft', size)]: paddingLeft,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--color': color,
          '--text-color': textColor,
          '--line-height': lineHeight,
          '--action-color': actionColor,
          '--title-text-color': titleTextColor,
          '--title-font-weight': titleFontWeight,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--border-color': borderColor,
          // size
          '--padding-top': paddingTop,
          '--padding-bottom': paddingBottom,
          '--padding-left': paddingLeft,
          '--font-size': fontSize,
          '--title-font-size': titleFontSize
        }
      })
    }
  },
  render () {
    const { segmented, bordered, $slots } = this
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
            'n-card--bordered': bordered
          }
        ]}
        style={this.cssVars as any}
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
        {
          <div class="n-card__content" style={this.contentStyle}>
            {renderSlot($slots, 'default')}
          </div>
        }
        {$slots.footer ? (
          <div class="n-card__footer">{renderSlot($slots, 'footer')}</div>
        ) : null}

        {$slots.action ? (
          <div class="n-card__action">{renderSlot($slots, 'action')}</div>
        ) : null}
      </div>
    )
  }
})
