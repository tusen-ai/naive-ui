import { computed, h } from 'vue'
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
import { useTheme } from '../../_mixins'
import { messageLight } from '../styles'
import props from './message-props'
import style from './styles/index.cssr.js'

export default {
  name: 'Message',
  props,
  setup (props) {
    const themeRef = useTheme('Message', 'Message', style, messageLight, props)
    return {
      handleClose () {
        props.onClose()
      },
      cssVars: computed(() => {
        const { type } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            height,
            padding,
            paddingClosable,
            maxWidth,
            iconMargin,
            closeMargin,
            closeSize,
            iconSize,
            fontSize,
            loadingColor,
            [createKey('textColor', type)]: textColor,
            [createKey('boxShadow', type)]: boxShadow,
            [createKey('color', type)]: color,
            [createKey('iconColor', type)]: iconColor,
            [createKey('closeColor', type)]: closeColor,
            [createKey('closeColorPressed', type)]: closeColorPressed,
            [createKey('closeColorHover', type)]: closeColorHover
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--padding': padding,
          '--height': height,
          '--max-width': maxWidth,
          '--font-size': fontSize,
          '--icon-margin': iconMargin,
          '--icon-size': iconSize,
          '--close-size': closeSize,
          '--close-margin': closeMargin,
          '--padding-closable': paddingClosable,
          '--text-color': textColor,
          '--color': color,
          '--box-shadow': boxShadow,
          '--icon-color': iconColor,
          '--close-color': closeColor,
          '--close-color-pressed': closeColorPressed,
          '--close-color-hover': closeColorHover,
          '--loading-color': loadingColor
        }
      })
    }
  },
  render () {
    const { icon, type, closable, content, handleClose, cssVars } = this
    return h(
      'div',
      {
        style: cssVars,
        class: [
          'n-message',
          {
            'n-message--closable': closable
          }
        ]
      },
      [
        h(
          'div',
          {
            class: 'n-message__icon'
          },
          [
            h(NBaseIcon, null, {
              default: () => [
                h(NIconSwitchTransition, null, {
                  default: () => [createIconVNode(icon, type)]
                })
              ]
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
  }
}

function createIconVNode (icon, type) {
  if (typeof icon === 'function') {
    return icon()
  } else {
    switch (type) {
      case 'info':
        return h(InfoIcon, {
          key: 'info'
        })
      case 'success':
        return h(SuccessIcon, {
          key: 'success'
        })
      case 'warning':
        return h(WarningIcon, {
          key: 'warning'
        })
      case 'error':
        return h(ErrorIcon, {
          key: 'error'
        })
      case 'loading':
        return h(NBaseLoading, {
          strokeWidth: 24,
          key: 'loading'
        })
    }
  }
}
