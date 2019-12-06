<script>
import NIcon from '../../Icon/index'
import mdCheckmarkCircle from '../../../icons/md-checkmark-circle'
import mdAlert from '../../../icons/md-alert'
import mdInformationCircle from '../../../icons/md-information-circle'
import mdCloseCircle from '../../../icons/md-close-circle'

export default {
  props: {
    option: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    type () {
      return this.option.type
    },
    icon () {
      return this.option.icon
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
    }
    const theme = this.option.theme
    return h('div', {
      staticClass: 'n-message',
      class: {
        [`n-message--${this.type}`]: true,
        [`n-${theme}-theme`]: theme
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
