import { type CSSProperties, computed, defineComponent, h } from 'vue'
import { getMargin } from 'seemly'
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon
} from '../../_internal/icons'
import { useConfig, useRtl, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  createKey,
  render,
  resolveSlot,
  resolveWrappedSlot
} from '../../_utils'
import { NBaseClose, NBaseIcon } from '../../_internal'
import { NButton } from '../../button'
import { dialogLight } from '../styles'
import type { DialogTheme } from '../styles'
import { toValue } from '../../_utils/vue/to-value'
import { dialogProps } from './dialogProps'
import style from './styles/index.cssr'

const iconRenderMap = {
  default: () => <InfoIcon />,
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  error: () => <ErrorIcon />
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
  setup(props) {
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const rtlEnabledRef = useRtl('Dialog', mergedRtlRef, mergedClsPrefixRef)
    const mergedIconPlacementRef = computed(() => {
      const { iconPlacement } = props
      return (
        iconPlacement
        || mergedComponentPropsRef?.value?.Dialog?.iconPlacement
        || 'left'
      )
    })
    function handlePositiveClick(e: MouseEvent): void {
      const { onPositiveClick } = props
      if (onPositiveClick)
        onPositiveClick(e)
    }
    function handleNegativeClick(e: MouseEvent): void {
      const { onNegativeClick } = props
      if (onNegativeClick)
        onNegativeClick(e)
    }
    function handleCloseClick(): void {
      const { onClose } = props
      if (onClose)
        onClose()
    }
    const themeRef = useTheme(
      'Dialog',
      '-dialog',
      style,
      dialogLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { type } = props
      const iconPlacement = mergedIconPlacementRef.value
      const {
        common: { cubicBezierEaseInOut },
        self: {
          fontSize,
          lineHeight,
          border,
          titleTextColor,
          textColor,
          color,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeIconSize,
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
      const iconMarginDiscrete = getMargin(iconMargin)
      return {
        '--n-font-size': fontSize,
        '--n-icon-color': iconColor,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-close-margin': closeMargin,
        '--n-icon-margin-top': iconMarginDiscrete.top,
        '--n-icon-margin-right': iconMarginDiscrete.right,
        '--n-icon-margin-bottom': iconMarginDiscrete.bottom,
        '--n-icon-margin-left': iconMarginDiscrete.left,
        '--n-icon-size': iconSize,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'dialog',
        computed(() => `${props.type[0]}${mergedIconPlacementRef.value[0]}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedIconPlacement: mergedIconPlacementRef,
      mergedTheme: themeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const {
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
      positiveButtonProps,
      negativeButtonProps,
      handlePositiveClick,
      handleNegativeClick,
      mergedTheme,
      loading,
      type,
      mergedClsPrefix
    } = this

    this.onRender?.()

    const icon = showIcon ? (
      <NBaseIcon
        clsPrefix={mergedClsPrefix}
        class={`${mergedClsPrefix}-dialog__icon`}
      >
        {{
          default: () =>
            resolveWrappedSlot(
              this.$slots.icon,
              children =>
                children
                || (this.icon ? render(this.icon) : iconRenderMap[this.type]())
            )
        }}
      </NBaseIcon>
    ) : null

    const actionNode = resolveWrappedSlot(this.$slots.action, children =>
      children || positiveText || negativeText || action ? (
        <div
          class={[`${mergedClsPrefix}-dialog__action`, this.actionClass]}
          style={this.actionStyle}
        >
          {children
          || (action
            ? [render(action)]
            : [
                this.negativeText && (
                  <NButton
                    theme={mergedTheme.peers.Button}
                    themeOverrides={mergedTheme.peerOverrides.Button}
                    ghost
                    size="small"
                    onClick={handleNegativeClick}
                    {...negativeButtonProps}
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
                    size="small"
                    type={type === 'default' ? 'primary' : type}
                    disabled={toValue(loading)}
                    loading={toValue(loading)}
                    onClick={handlePositiveClick}
                    {...positiveButtonProps}
                  >
                    {{
                      default: () => render(this.positiveText)
                    }}
                  </NButton>
                )
              ])}
        </div>
      ) : null)

    return (
      <div
        class={[
          `${mergedClsPrefix}-dialog`,
          this.themeClass,
          this.closable && `${mergedClsPrefix}-dialog--closable`,
          `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`,
          bordered && `${mergedClsPrefix}-dialog--bordered`,
          this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`
        ]}
        style={cssVars as CSSProperties}
        role="dialog"
      >
        {closable
          ? resolveWrappedSlot(this.$slots.close, (node) => {
            const classNames = [
              `${mergedClsPrefix}-dialog__close`,
              this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`
            ]
            return node ? (
              <div class={classNames}>{node}</div>
            ) : (
              <NBaseClose
                clsPrefix={mergedClsPrefix}
                class={classNames}
                onClick={this.handleCloseClick}
              />
            )
          })
          : null}
        {showIcon && mergedIconPlacement === 'top' ? (
          <div class={`${mergedClsPrefix}-dialog-icon-container`}>{icon}</div>
        ) : null}
        <div
          class={[`${mergedClsPrefix}-dialog__title`, this.titleClass]}
          style={this.titleStyle}
        >
          {showIcon && mergedIconPlacement === 'left' ? icon : null}
          {resolveSlot(this.$slots.header, () => [render(title)])}
        </div>
        <div
          class={[
            `${mergedClsPrefix}-dialog__content`,
            actionNode ? '' : `${mergedClsPrefix}-dialog__content--last`,
            this.contentClass
          ]}
          style={this.contentStyle}
        >
          {resolveSlot(this.$slots.default, () => [render(content)])}
        </div>
        {actionNode}
      </div>
    )
  }
})
