import {
  computed,
  h,
  defineComponent,
  inject,
  VNodeChild,
  CSSProperties
} from 'vue'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import {
  NIconSwitchTransition,
  NBaseLoading,
  NBaseIcon,
  NBaseClose
} from '../../_internal'
import { render, createKey } from '../../_utils'
import { useTheme } from '../../_mixins'
import { messageLight } from '../styles'
import { messageProps, MessageType } from './message-props'
import { messageProviderInjectionKey } from './MessageProvider'
import style from './styles/index.cssr'

const iconMap = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
}

export default defineComponent({
  name: 'Message',
  props: messageProps,
  setup (props) {
    const {
      props: messageProviderProps,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(messageProviderInjectionKey)!
    const themeRef = useTheme(
      'Message',
      'Message',
      style,
      messageLight,
      messageProviderProps,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      handleClose () {
        props.onClose?.()
      },
      cssVars: computed(() => {
        const { type } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            padding,
            margin,
            maxWidth,
            iconMargin,
            closeMargin,
            closeSize,
            iconSize,
            fontSize,
            lineHeight,
            borderRadius,
            iconColorInfo,
            iconColorSuccess,
            iconColorWarning,
            iconColorError,
            iconColorLoading,
            [createKey('textColor', type)]: textColor,
            [createKey('boxShadow', type)]: boxShadow,
            [createKey('color', type)]: color,
            [createKey('closeColor', type)]: closeColor,
            [createKey('closeColorPressed', type)]: closeColorPressed,
            [createKey('closeColorHover', type)]: closeColorHover
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-margin': margin,
          '--n-padding': padding,
          '--n-max-width': maxWidth,
          '--n-font-size': fontSize,
          '--n-icon-margin': iconMargin,
          '--n-icon-size': iconSize,
          '--n-close-size': closeSize,
          '--n-close-margin': closeMargin,
          '--n-text-color': textColor,
          '--n-color': color,
          '--n-box-shadow': boxShadow,
          '--n-icon-color-info': iconColorInfo,
          '--n-icon-color-success': iconColorSuccess,
          '--n-icon-color-warning': iconColorWarning,
          '--n-icon-color-error': iconColorError,
          '--n-icon-color-loading': iconColorLoading,
          '--n-close-color': closeColor,
          '--n-close-color-pressed': closeColorPressed,
          '--n-close-color-hover': closeColorHover,
          '--n-line-height': lineHeight,
          '--n-border-radius': borderRadius
        }
      }),
      placement: messageProviderProps.placement
    }
  },
  render () {
    const {
      icon,
      type,
      closable,
      content,
      mergedClsPrefix,
      cssVars,
      handleClose
    } = this
    return (
      <div
        class={`${mergedClsPrefix}-message-wrapper`}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
        style={{
          ...(cssVars as CSSProperties),
          alignItems: this.placement.startsWith('top')
            ? 'flex-start'
            : 'flex-end'
        }}
      >
        <div
          class={`${mergedClsPrefix}-message ${mergedClsPrefix}-message--${type}-type`}
        >
          <div
            class={`${mergedClsPrefix}-message__icon ${mergedClsPrefix}-message__icon--${type}-type`}
          >
            <NIconSwitchTransition>
              {{
                default: () => [createIconVNode(icon, type, mergedClsPrefix)]
              }}
            </NIconSwitchTransition>
          </div>
          <div class={`${mergedClsPrefix}-message__content`}>
            {render(content)}
          </div>
          {closable ? (
            <NBaseClose
              clsPrefix={mergedClsPrefix}
              class={`${mergedClsPrefix}-message__close`}
              onClick={handleClose}
            />
          ) : null}
        </div>
      </div>
    )
  }
})

function createIconVNode (
  icon: undefined | (() => VNodeChild),
  type: MessageType,
  clsPrefix: string
): VNodeChild {
  if (typeof icon === 'function') {
    return icon()
  } else {
    return (
      <NBaseIcon clsPrefix={clsPrefix} key={type}>
        {{
          default: () =>
            type === 'loading' ? (
              <NBaseLoading
                clsPrefix={clsPrefix}
                strokeWidth={24}
                scale={0.85}
              />
            ) : (
              iconMap[type]
            )
        }}
      </NBaseIcon>
    )
  }
}
