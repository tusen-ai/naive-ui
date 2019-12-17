<script>
import NIcon from '../../Icon/index'
import mdCheckmarkCircle from '../../../icons/md-checkmark-circle'
import mdAlert from '../../../icons/md-alert'
import mdInformationCircle from '../../../icons/md-information-circle'
import mdCloseCircle from '../../../icons/md-close-circle'
import NBaseLoading from '../../../base/Loading'

export default {
  props: {
    icon: {
      type: [String, Function],
      default: null
    },
    type: {
      type: String,
      default: 'default'
    },
    content: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: null
    }
  },
  render (h) {
    let icon = null
    if (this.icon) {
      if (typeof this.icon === 'function') icon = this.icon(h)
      else icon = h(this.icon)
    } else if (this.type === 'success') {
      icon = h(mdCheckmarkCircle)
    } else if (this.type === 'error') {
      icon = h(mdCloseCircle)
    } else if (this.type === 'info') {
      icon = h(mdInformationCircle)
    } else if (this.type === 'warning') {
      icon = h(mdAlert)
    } else if (this.type === 'loading') {
      icon = h(NBaseLoading, {
        props: {
          theme: this.theme,
          strokeWidth: 6
        }
      })
    }
    return h('div', {
      staticClass: 'n-message',
      class: {
        [`n-message--${this.type}-type`]: true,
        [`n-${this.theme}-theme`]: this.theme
      }
    }, [
      h('div', {
        staticClass: 'n-message__icon'
      }, [
        h(NIcon, {
          props: {
            size: 20
          }
        }, [
          icon
        ])
      ]),
      h('div', {
        staticClass: 'n-message__content'
      }, this.content)
    ])
  }
}
</script>
