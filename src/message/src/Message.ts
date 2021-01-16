import { computed, h, defineComponent, inject, VNodeChild } from 'vue'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_base/icons'
import {
  NIconSwitchTransition,
  NBaseLoading,
  NBaseIcon,
  NBaseClose
} from '../../_base'
import { render, createKey } from '../../_utils'
import { ThemePropsReactive, useTheme } from '../../_mixins'
import { messageLight, MessageTheme } from '../styles'
import { messageProps, MessageType } from './message-props'
import style from './styles/index.cssr'

const iconMap = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  loading: NBaseLoading
}

export default defineComponent({
  name: 'Message',
  props: messageProps,
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const themeProps = inject<ThemePropsReactive<MessageTheme>>(
      'NMessageProvider'
    )!
    const themeRef = useTheme(
      'Message',
      'Message',
      style,
      messageLight,
      themeProps
    )
    return {
      handleClose () {
        props.onClose()
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
    const { icon, type, closable, content, handleClose, cssVars } = this
    return h(
      'div',
      {
        class: 'n-message-wrapper',
        style: cssVars
      },
      [
        h(
          'div',
          {
            class: 'n-message'
          },
          [
            h(
              'div',
              {
                class: [
                  'n-message__icon',
                  `n-message__icon n-message__icon--${type}-type`
                ]
              },
              [
                h(NIconSwitchTransition, null, {
                  default: () => [createIconVNode(icon, type)]
                })
              ]
            ),
            h(
              'div',
              {
                class: 'n-message__content'
              },
              [
                h(render, {
                  render: content
                })
              ]
            ),
            closable
              ? h(NBaseClose, {
                class: 'n-message__close',
                onClick: handleClose
              })
              : null
          ]
        )
      ]
    )
  }
})

function createIconVNode (icon: () => VNodeChild, type: MessageType) {
  if (typeof icon === 'function') {
    return icon()
  } else {
    return h(
      NBaseIcon,
      {
        key: type
      },
      {
        default: () =>
          h(iconMap[type], type === 'loading' ? { scale: 0.85 } : undefined)
      }
    )
  }
}
