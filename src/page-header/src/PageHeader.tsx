/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h, defineComponent, computed, type PropType } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { pageHeaderLight } from '../styles/light'
import type { PageHeaderTheme } from '../styles/light'
import style from './styles/index.cssr'
import { ArrowBackIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useRtl } from '../../_mixins/use-rtl'

export const pageHeaderProps = {
  ...(useTheme.props as ThemeProps<PageHeaderTheme>),
  title: String,
  subtitle: String,
  extra: String,
  onBack: Function as PropType<() => void>
}

export type PageHeaderProps = ExtractPublicPropTypes<typeof pageHeaderProps>

export default defineComponent({
  name: 'PageHeader',
  props: pageHeaderProps,
  setup (props) {
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled } =
      useConfig(props)
    const themeRef = useTheme(
      'PageHeader',
      '-page-header',
      style,
      pageHeaderLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('PageHeader', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
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
        '--n-title-text-color': titleTextColor,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-font-size': fontSize,
        '--n-back-size': backSize,
        '--n-subtitle-text-color': subtitleTextColor,
        '--n-back-color': backColor,
        '--n-back-color-hover': backColorHover,
        '--n-back-color-pressed': backColorPressed,
        '--n-bezier': cubicBezierEaseInOut
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('page-header', undefined, cssVarsRef, props)
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { onBack, title, subtitle, extra, mergedClsPrefix, cssVars, $slots } =
      this
    this.onRender?.()
    const {
      title: titleSlot,
      subtitle: subtitleSlot,
      extra: extraSlot,
      default: defaultSlot,
      header: headerSlot,
      avatar: avatarSlot,
      footer: footerSlot,
      back: backSlot
    } = $slots
    const showBack = onBack
    const showTitle = title || titleSlot
    const showSubtitle = subtitle || subtitleSlot
    const showExtra = extra || extraSlot
    return (
      <div
        style={cssVars as any}
        class={[
          `${mergedClsPrefix}-page-header-wrapper`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-page-header-wrapper--rtl`
        ]}
      >
        {headerSlot ? (
          <div class={`${mergedClsPrefix}-page-header-header`} key="breadcrumb">
            {headerSlot()}
          </div>
        ) : null}
        {(showBack || avatarSlot || showTitle || showSubtitle || showExtra) && (
          <div class={`${mergedClsPrefix}-page-header`} key="header">
            <div class={`${mergedClsPrefix}-page-header__main`} key="back">
              {showBack ? (
                <div
                  class={`${mergedClsPrefix}-page-header__back`}
                  onClick={onBack}
                >
                  {backSlot ? (
                    backSlot()
                  ) : (
                    <NBaseIcon clsPrefix={mergedClsPrefix}>
                      {{
                        default: () => <ArrowBackIcon />
                      }}
                    </NBaseIcon>
                  )}
                </div>
              ) : null}
              {avatarSlot ? (
                <div class={`${mergedClsPrefix}-page-header__avatar`}>
                  {avatarSlot()}
                </div>
              ) : null}
              {showTitle ? (
                <div
                  class={`${mergedClsPrefix}-page-header__title`}
                  key="title"
                >
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
        )}
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
