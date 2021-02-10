import {
  h,
  defineComponent,
  computed,
  VNodeChild,
  PropType,
  renderSlot,
  VNode,
  CSSProperties
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { render, createKey, keysOf } from '../../_utils'
import { NBaseIcon, NBaseClose } from '../../_internal'
import { NButton } from '../../button'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { dialogLight } from '../styles'
import type { DialogTheme } from '../styles'
import type { IconPlacement } from './interface'
import style from './styles/index.cssr'

const infoIcon = <InfoIcon />

const iconMap = {
  default: infoIcon,
  info: infoIcon,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
}

const dialogProps = {
  icon: Function as PropType<() => VNodeChild>,
  type: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  title: String,
  closable: {
    type: Boolean,
    default: true
  },
  negativeText: String,
  positiveText: String,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  showIcon: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false as boolean
  },
  iconPlacement: String as PropType<IconPlacement>,
  onPositiveClick: Function as PropType<(e: MouseEvent) => void>,
  onNegativeClick: Function as PropType<(e: MouseEvent) => void>,
  onClose: Function as PropType<() => void>
} as const

export type DialogProps = typeof dialogProps
export { dialogProps }
export const dialogPropKeys = keysOf(dialogProps)

export default defineComponent({
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
    const { NConfigProvider } = useConfig(props)
    const mergedIconPlacementRef = computed(() => {
      const { iconPlacement } = props
      return (
        iconPlacement ??
        NConfigProvider?.mergedComponentProps?.Dialog?.iconPlacement ??
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
    const themeRef = useTheme('Dialog', 'Dialog', style, dialogLight, props)
    return {
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
            [iconPlacement === 'top'
              ? 'iconMarginIconTop'
              : 'iconMargin']: iconMargin,
            [iconPlacement === 'top'
              ? 'closeMarginIconTop'
              : 'closeMargin']: closeMargin,
            [createKey('iconColor', type)]: iconColor
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--icon-color': iconColor,
          '--bezier': cubicBezierEaseInOut,
          '--close-margin': closeMargin,
          '--icon-margin': iconMargin,
          '--icon-size': iconSize,
          '--close-size': closeSize,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--color': color,
          '--text-color': textColor,
          '--border-radius': borderRadius,
          '--padding': padding,
          '--line-height': lineHeight,
          '--border': border,
          '--content-margin': contentMargin,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-text-color': titleTextColor,
          '--action-space': actionSpace
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
      negativeText,
      handlePositiveClick,
      handleNegativeClick,
      mergedTheme,
      loading,
      type
    } = this
    return (
      <div
        class={[
          'n-dialog',
          {
            'n-dialog--bordered': bordered,
            [`n-dialog--icon-${mergedIconPlacement}`]: true
          }
        ]}
        style={cssVars as CSSProperties}
      >
        {closable ? (
          <NBaseClose class="n-dialog__close" onClick={this.handleCloseClick} />
        ) : null}
        {showIcon && mergedIconPlacement === 'top' ? (
          <div class="n-dialog-icon-container">
            <NBaseIcon class="n-dialog__icon">
              {{
                default: () =>
                  renderSlot(
                    $slots,
                    'icon',
                    undefined,
                    () =>
                      [
                        this.icon
                          ? h(render, { render: this.icon })
                          : iconMap[this.type]
                      ] as VNode[]
                  )
              }}
            </NBaseIcon>
          </div>
        ) : null}
        <div class="n-dialog__title">
          {showIcon && mergedIconPlacement === 'left' ? (
            <NBaseIcon class="n-dialog__icon">
              {{
                default: () =>
                  renderSlot(
                    $slots,
                    'icon',
                    undefined,
                    () =>
                      [
                        this.icon
                          ? h(render, { render: this.icon })
                          : iconMap[this.type]
                      ] as VNode[]
                  )
              }}
            </NBaseIcon>
          ) : null}
          {renderSlot($slots, 'header', undefined, () => [
            h(render, {
              render: title
            })
          ])}
        </div>
        <div class="n-dialog__content">
          {renderSlot($slots, 'default', undefined, () => [
            h(render, {
              render: content
            })
          ])}
        </div>
        <div class="n-dialog__action">
          {renderSlot(
            $slots,
            'action',
            undefined,
            () =>
              [
                negativeText ? (
                  <NButton
                    theme={mergedTheme.peers.Button}
                    themeOverrides={mergedTheme.peerOverrides.Button}
                    ghost
                    size="small"
                    onClick={handleNegativeClick}
                  >
                    {{
                      default: () =>
                        h(render, { render: () => this.negativeText })
                    }}
                  </NButton>
                ) : null,
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
                    default: () =>
                      h(render, { render: () => this.positiveText })
                  }}
                </NButton>
              ] as VNode[]
          )}
        </div>
      </div>
    )
  }
})
