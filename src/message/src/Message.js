import { h } from 'vue'
import NIcon from '../../icon/index'
import SuccessIcon from '../../_icons/md-checkmark-circle'
import WarningIcon from '../../_icons/md-alert'
import InfoIcon from '../../_icons/md-information-circle'
import ErrorIcon from '../../_icons/md-close-circle'
import CloseIcon from '../../_icons/md-close'
import NBaseLoading from '../../_base/loading'
import IconSwitchTransition from '../../_transition/IconSwitchTransition'
import { render } from '../../_utils/vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'
import props from './message-props'

export default {
  name: 'Message',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
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
      syntheticTheme,
      closable,
      content,
      handleClose
    } = this
    return h('div', {
      class: {
        'n-message': true,
        'n-message--closable': closable,
        [`n-message--${type}-type`]: true,
        [`n-${syntheticTheme}-theme`]: syntheticTheme
      }
    }, [
      h('div', {
        class: 'n-message__icon'
      }, [
        h(NIcon, {
          size: 20
        }, {
          default: () => [
            h(IconSwitchTransition, null, {
              default: () => [
                createIconVNode(icon, type, syntheticTheme)
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
