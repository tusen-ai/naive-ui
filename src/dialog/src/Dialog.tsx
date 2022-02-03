import { h, defineComponent, computed, CSSProperties } from 'vue'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { render, createKey } from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_internal'
import { NButton } from '../../button'
import { dialogLight } from '../styles'
import type { DialogTheme } from '../styles'
import style from './styles/index.cssr'
import { dialogProps } from './dialogProps'

const infoIcon = <InfoIcon />

const iconMap = {
  default: infoIcon,
  info: infoIcon,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
}

export const NDialog = defineComponent({
  name: 'Dialog',
  alias: [
    'NimbusConfirmCard', // deprecated
    'Confirm' // deprecated
  ],
  props: {
    ...(useTheme.props as ThemeProps<DialogTheme>),
    ...dialogProps
  },
  setup (props) {
    const { NConfigProvider, mergedClsPrefixRef } = useConfig(props)
    const mergedIconPlacementRef = computed(() => {
      const { iconPlacement } = props
      return (
        iconPlacement ??
        NConfigProvider?.mergedComponentPropsRef.value?.Dialog?.iconPlacement ??
        'left'
      )
    })
    function handlePositiveClick (e: MouseEvent): void {
      const { onPositiveClick } = props
      if (onPositiveClick) onPositiveClick(e)
    }
    function handleNegativeClick (e: MouseEvent): void {
      const { onNegativeClick } = props
      if (onNegativeClick) onNegativeClick(e)
    }
    function handleCloseClick (): void {
      const { onClose } = props
      if (onClose) onClose()
    }
    const themeRef = useTheme(
      'Dialog',
      '-dialog',
      style,
      dialogLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedIconPlacement: mergedIconPlacementRef,
      mergedTheme: themeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      cssVars: computed(() => {
        const { type, iconPlacement } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            lineHeight,
            border,
            titleTextColor,
            textColor,
            color,
            closeColor,
            closeColorHover,
            closeColorPressed,
            borderRadius,
            titleFontWeight,
            titleFontSize,
            padding,
            iconSize,
            actionSpace,
            contentMargin,
            closeSize,
            [iconPlacement === 'top' ? 'iconMarginIconTop' : 'iconMargin']:
              iconMargin,
            [iconPlacement === 'top' ? 'closeMarginIconTop' : 'closeMargin']:
              closeMargin,
            [createKey('iconColor', type)]: iconColor
          }
        } = themeRef.value
        return {
          '--n-font-size': fontSize,
          '--n-icon-color': iconColor,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-close-margin': closeMargin,
          '--n-icon-margin': iconMargin,
          '--n-icon-size': iconSize,
          '--n-close-size': closeSize,
          '--n-close-color': closeColor,
          '--n-close-color-hover': closeColorHover,
          '--n-close-color-pressed': closeColorPressed,
          '--n-color': color,
          '--n-text-color': textColor,
          '--n-border-radius': borderRadius,
          '--n-padding': padding,
          '--n-line-height': lineHeight,
          '--n-border': border,
          '--n-content-margin': contentMargin,
          '--n-title-font-size': titleFontSize,
          '--n-title-font-weight': titleFontWeight,
          '--n-title-text-color': titleTextColor,
          '--n-action-space': actionSpace
        }
      })
    }
  },
  render () {
    const {
      $slots,
      bordered,
      mergedIconPlacement,
      cssVars,
      closable,
      showIcon,
      title,
      content,
      action,
      negativeText,
      positiveText,
      handlePositiveClick,
      handleNegativeClick,
      mergedTheme,
      loading,
      type,
      mergedClsPrefix
    } = this

    return (
      <div
        class={[
          `${mergedClsPrefix}-dialog`,
          `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`,
          bordered && `${mergedClsPrefix}-dialog--bordered`
        ]}
        style={cssVars as CSSProperties}
        role="dialog"
      >
        {closable ? (
          <NBaseClose
            clsPrefix={mergedClsPrefix}
            class={`${mergedClsPrefix}-dialog__close`}
            onClick={this.handleCloseClick}
          />
        ) : null}
        {showIcon && mergedIconPlacement === 'top' ? (
          <div class={`${mergedClsPrefix}-dialog-icon-container`}>
            <NBaseIcon
              clsPrefix={mergedClsPrefix}
              class={`${mergedClsPrefix}-dialog__icon`}
            >
              {{
                default: () =>
                  $slots.icon
                    ? $slots.icon()
                    : this.icon
                      ? render(this.icon)
                      : iconMap[this.type]
              }}
            </NBaseIcon>
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-dialog__title`}>
          {showIcon && mergedIconPlacement === 'left' ? (
            <NBaseIcon
              clsPrefix={mergedClsPrefix}
              class={`${mergedClsPrefix}-dialog__icon`}
            >
              {{
                default: () =>
                  $slots.icon
                    ? $slots.icon()
                    : this.icon
                      ? render(this.icon)
                      : iconMap[this.type]
              }}
            </NBaseIcon>
          ) : null}
          {$slots.header ? $slots.header() : render(title)}
        </div>
        <div class={`${mergedClsPrefix}-dialog__content`}>
          {$slots.default ? $slots.default() : render(content)}
        </div>
        {$slots.action || positiveText || negativeText || action ? (
          <div class={`${mergedClsPrefix}-dialog__action`}>
            {$slots.action
              ? $slots.action()
              : action
                ? render(action)
                : [
                    this.negativeText && (
                    <NButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      ghost
                      size="small"
                      onClick={handleNegativeClick}
                    >
                      {{
                        default: () => render(this.negativeText)
                      }}
                    </NButton>
                    ),
                    this.positiveText && (
                    <NButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      disabled={loading}
                      loading={loading}
                      size="small"
                      type={type === 'default' ? 'primary' : type}
                      onClick={handlePositiveClick}
                    >
                      {{
                        default: () => render(this.positiveText)
                      }}
                    </NButton>
                    )
                  ]}
          </div>
        ) : null}
      </div>
    )
  }
})
