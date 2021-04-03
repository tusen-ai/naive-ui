/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h, defineComponent, computed, CSSProperties, PropType } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { pageHeaderLight } from '../styles/light'
import type { PageHeaderTheme } from '../styles/light'
import style from './styles/index.cssr'
import { ArrowBackIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'

export default defineComponent({
  name: 'PageHeader',
  props: {
    ...(useTheme.props as ThemeProps<PageHeaderTheme>),
    title: String,
    subtitle: String,
    extra: String,
    onBack: Function as PropType<() => void>
  },
  setup (props) {
    const themeRef = useTheme(
      'PageHeader',
      'PageHeader',
      style,
      pageHeaderLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          self: {
            titleTextColor,
            subtitleTextColor,
            backColor,
            fontSize,
            titleFontSize,
            backSize,
            titleFontWeight,
            backColorHover,
            backColorPressed
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--title-text-color': titleTextColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--font-size': fontSize,
          '--back-size': backSize,
          '--subtitle-text-color': subtitleTextColor,
          '--back-color': backColor,
          '--back-color-hover': backColorHover,
          '--back-color-pressed': backColorPressed,
          '--bezier': cubicBezierEaseInOut
        }
      })
    }
  },
  render () {
    const { onBack, title, subtitle, extra, $slots } = this
    const {
      title: titleSlot,
      subtitle: subtitleSlot,
      extra: extraSlot,
      default: defaultSlot,
      header: headerSlot,
      avatar: avatarSlot,
      footer: footerSlot
    } = $slots
    const showBack = onBack
    const showTitle = title || titleSlot
    const showSubtitle = subtitle || subtitleSlot
    const showExtra = extra || extraSlot
    return (
      <div style={this.cssVars as CSSProperties}>
        {headerSlot ? (
          <div class="n-page-header-header" key="breadcrumn">
            {headerSlot()}
          </div>
        ) : null}
        <div class="n-page-header" key="header">
          <div class="n-page-header__main" key="back">
            {showBack ? (
              <div class="n-page-header__back" onClick={onBack}>
                <NBaseIcon>
                  {{
                    default: () => <ArrowBackIcon />
                  }}
                </NBaseIcon>
              </div>
            ) : null}
            {avatarSlot ? (
              <div class="n-page-header__avatar">{avatarSlot()}</div>
            ) : null}
            {showTitle ? (
              <div class="n-page-header__title" key="title">
                {title || titleSlot!()}
              </div>
            ) : null}
            {showSubtitle ? (
              <div class="n-page-header__subtitle" key="subtitle">
                {subtitle || subtitleSlot!()}
              </div>
            ) : null}
          </div>
          {showExtra ? (
            <div class="n-page-header__extra">{extra || extraSlot!()}</div>
          ) : null}
        </div>
        {defaultSlot ? (
          <div class="n-page-header-content" key="content">
            {defaultSlot()}
          </div>
        ) : null}
        {footerSlot ? (
          <div class="n-page-header-footer" key="footer">
            {footerSlot()}
          </div>
        ) : null}
      </div>
    )
  }
})
