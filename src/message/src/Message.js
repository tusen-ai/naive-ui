import { h } from 'vue'
import NIcon from '../../icon/index'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  CloseIcon
} from '../../_base/icons'
import { NIconSwitchTransition, NBaseLoading } from '../../_base'
import { render } from '../../_utils'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles'
import props from './message-props'

export default {
  name: 'Message',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props,
  methods: {
    handleClose () {
      this.onClose()
    }
  },
  render () {
    const {
      icon,
      type,
      mergedTheme,
      closable,
      content,
      handleClose
    } = this
    return h('div', {
      class: {
        'n-message': true,
        'n-message--closable': closable,
        [`n-message--${type}-type`]: true,
        [`n-${mergedTheme}-theme`]: mergedTheme
      }
    }, [
      h('div', {
        class: 'n-message__icon'
      }, [
        h(NIcon, null, {
          default: () => [
            h(NIconSwitchTransition, null, {
              default: () => [
                createIconVNode(icon, type, mergedTheme)
              ]
            })
          ]
        })
      ]),
      h('div', {
        class: 'n-message__content'
      }, [
        h(render, {
          render: content
        })
      ]),
      closable
        ? h('div', {
          class: 'n-message__close'
        }, [
          h(NIcon, {
            onClick: handleClose
          }, {
            default: () => [h(CloseIcon)]
          })
        ])
        : null
    ])
  }
}

function createIconVNode (icon, type, theme) {
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
          theme,
          strokeWidth: 24,
          key: 'loading'
        })
    }
  }
}
