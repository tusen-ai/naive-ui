import { h, defineComponent, computed, CSSProperties, ref } from 'vue'
import { on, off } from 'evtd'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  render,
  createKey,
  resolveWrappedSlot,
  resolveSlot
} from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_internal'
import { NButton } from '../../button'
import { dialogLight } from '../styles'
import type { DialogTheme } from '../styles'
import { dialogProps } from './dialogProps'
import style from './styles/index.cssr'

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
    const { mergedComponentPropsRef, mergedClsPrefixRef, inlineThemeDisabled } =
      useConfig(props)
    // draggable
    const dialogElementRef = ref<HTMLDivElement | null>(null)
    const topRef = ref('50%')
    const leftRef = ref('50%')
    const mouseClientX = ref(0)
    const mouseClientY = ref(0)

    const mergedIconPlacementRef = computed(() => {
      const { iconPlacement } = props
      return (
        iconPlacement ||
        mergedComponentPropsRef?.value?.Dialog?.iconPlacement ||
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
    function handleMouseMove (e: MouseEvent): void {
      const dX = e.clientX - mouseClientX.value
      const dY = e.clientY - mouseClientY.value

      topRef.value = `${parseInt(topRef.value, 10) + dY}px`
      leftRef.value = `${parseInt(leftRef.value, 10) + dX}px`

      mouseClientX.value = e.clientX
      mouseClientY.value = e.clientY
    }
    function handleMouseUp (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      off('mousemove', window, handleMouseMove, true)
      off('mouseup', window, handleMouseUp, true)
    }
    function handleTitleMouseDown (e: MouseEvent): void {
      e.preventDefault()
      e.stopPropagation()
      if (dialogElementRef.value === null || !props.draggable) return
      const computedStyle = getComputedStyle(dialogElementRef.value)
      topRef.value = computedStyle.top
      leftRef.value = computedStyle.left
      mouseClientX.value = e.clientX
      mouseClientY.value = e.clientY
      on('mousemove', window, handleMouseMove, true)
      on('mouseup', window, handleMouseUp, true)
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'dialog',
        computed(() => `${props.type[0]}${mergedIconPlacementRef.value[0]}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      dialogElementRef,
      topRef,
      leftRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedIconPlacement: mergedIconPlacementRef,
      mergedTheme: themeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      handleTitleMouseDown,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      bordered,
      mergedIconPlacement,
      cssVars,
      closable,
      showIcon,
      title,
      topRef,
      leftRef,
      content,
      action,
      negativeText,
      positiveText,
      handlePositiveClick,
      handleNegativeClick,
      handleTitleMouseDown,
      mergedTheme,
      loading,
      type,
      mergedClsPrefix,
      draggable
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
              (children) =>
                children || (this.icon ? render(this.icon) : iconMap[this.type])
            )
        }}
      </NBaseIcon>
    ) : null

    return (
      <div
        class={[
          `${mergedClsPrefix}-dialog`,
          this.themeClass,
          `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`,
          bordered && `${mergedClsPrefix}-dialog--bordered`,
          draggable && `${mergedClsPrefix}-dialog--draggable`
        ]}
        style={{
          ...(cssVars as CSSProperties),
          top: draggable ? topRef : undefined,
          left: draggable ? leftRef : undefined
        }}
        role="dialog"
        ref="dialogElementRef"
      >
        {closable ? (
          <NBaseClose
            clsPrefix={mergedClsPrefix}
            class={`${mergedClsPrefix}-dialog__close`}
            onClick={this.handleCloseClick}
          />
        ) : null}
        {showIcon && mergedIconPlacement === 'top' ? (
          <div class={`${mergedClsPrefix}-dialog-icon-container`}>{icon}</div>
        ) : null}
        <div
          class={`${mergedClsPrefix}-dialog__title`}
          onMousedown={draggable ? handleTitleMouseDown : undefined}
        >
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
          {resolveSlot(this.$slots.default, () => [render(content)])}
        </div>
        {resolveWrappedSlot(this.$slots.action, (children) =>
          children || positiveText || negativeText || action ? (
            <div class={`${mergedClsPrefix}-dialog__action`}>
              {children ||
                (action
                  ? [render(action)]
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
                    ])}
            </div>
          ) : null
        )}
      </div>
    )
  }
})
