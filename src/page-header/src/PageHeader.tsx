/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h, defineComponent, computed, CSSProperties, PropType } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { pageHeaderLight } from '../styles/light'
import type { PageHeaderTheme } from '../styles/light'
import style from './styles/index.cssr'
import { ArrowBackIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import type { ExtractPublicPropTypes } from '../../_utils'

const pageHeaderProps = {
  ...(useTheme.props as ThemeProps<PageHeaderTheme>),
  title: String,
  subtitle: String,
  extra: String,
  onBack: Function as PropType<() => void>
}

export type PageHeaderPorps = ExtractPublicPropTypes<typeof pageHeaderProps>

export default defineComponent({
  name: 'PageHeader',
  props: pageHeaderProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'PageHeader',
      'PageHeader',
      style,
      pageHeaderLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
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
    const {
      onBack,
      title,
      subtitle,
      extra,
      mergedClsPrefix,
      cssVars,
      $slots
    } = this
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
      <div style={cssVars as CSSProperties}>
        {headerSlot ? (
          <div class={`${mergedClsPrefix}-page-header-header`} key="breadcrumn">
            {headerSlot()}
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-page-header`} key="header">
          <div class={`${mergedClsPrefix}-page-header__main`} key="back">
            {showBack ? (
              <div
                class={`${mergedClsPrefix}-page-header__back`}
                onClick={onBack}
              >
                <NBaseIcon clsPrefix={mergedClsPrefix}>
                  {{
                    default: () => <ArrowBackIcon />
                  }}
                </NBaseIcon>
              </div>
            ) : null}
            {avatarSlot ? (
              <div class={`${mergedClsPrefix}-page-header__avatar`}>
                {avatarSlot()}
              </div>
            ) : null}
            {showTitle ? (
              <div class={`${mergedClsPrefix}-page-header__title`} key="title">
                {title || titleSlot!()}
              </div>
            ) : null}
            {showSubtitle ? (
              <div
                class={`${mergedClsPrefix}-page-header__subtitle`}
                key="subtitle"
              >
                {subtitle || subtitleSlot!()}
              </div>
            ) : null}
          </div>
          {showExtra ? (
            <div class={`${mergedClsPrefix}-page-header__extra`}>
              {extra || extraSlot!()}
            </div>
          ) : null}
        </div>
        {defaultSlot ? (
          <div class={`${mergedClsPrefix}-page-header-content`} key="content">
            {defaultSlot()}
          </div>
        ) : null}
        {footerSlot ? (
          <div class={`${mergedClsPrefix}-page-header-footer`} key="footer">
            {footerSlot()}
          </div>
        ) : null}
      </div>
    )
  }
})
