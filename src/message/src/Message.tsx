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
          '--bezier': cubicBezierEaseInOut,
          '--margin': margin,
          '--padding': padding,
          '--max-width': maxWidth,
          '--font-size': fontSize,
          '--icon-margin': iconMargin,
          '--icon-size': iconSize,
          '--close-size': closeSize,
          '--close-margin': closeMargin,
          '--text-color': textColor,
          '--color': color,
          '--box-shadow': boxShadow,
          '--icon-color-info': iconColorInfo,
          '--icon-color-success': iconColorSuccess,
          '--icon-color-warning': iconColorWarning,
          '--icon-color-error': iconColorError,
          '--icon-color-loading': iconColorLoading,
          '--close-color': closeColor,
          '--close-color-pressed': closeColorPressed,
          '--close-color-hover': closeColorHover,
          '--line-height': lineHeight,
          '--border-radius': borderRadius
        }
      })
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
        style={cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-message`}>
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
