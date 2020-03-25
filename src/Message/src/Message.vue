<script>
import NIcon from '../../Icon/index'
import mdCheckmarkCircle from '../../_icons/md-checkmark-circle'
import mdAlert from '../../_icons/md-alert'
import mdInformationCircle from '../../_icons/md-information-circle'
import mdCloseCircle from '../../_icons/md-close-circle'
import NBaseLoading from '../../_base/Loading'
import IconSwitchTransition from '../../_transition/IconSwitchTransition'
import render from '../../_utils/vue/render'
import themeable from '../../_mixins/themeable'
import asthemecontext from '../../_mixins/asthemecontext'

export default {
  mixins: [ themeable, asthemecontext ],
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
      type: [String, Function],
      default: null
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
      icon = h(mdCheckmarkCircle, {
        key: 'success'
      })
    } else if (this.type === 'error') {
      icon = h(mdCloseCircle, {
        key: 'info'
      })
    } else if (this.type === 'info') {
      icon = h(mdInformationCircle, {
        key: 'warning'
      })
    } else if (this.type === 'warning') {
      icon = h(mdAlert, {
        key: 'error'
      })
    } else if (this.type === 'loading') {
      icon = h(NBaseLoading, {
        props: {
          theme: this.theme,
          strokeWidth: 24
        },
        key: 'loading'
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
          h(IconSwitchTransition, [
            icon
          ])
        ])
      ]),
      h('div', {
        staticClass: 'n-message__content'
      }, [
        h(render, {
          props: {
            render: this.content
          }
        })
      ])
    ])
  }
}
</script>
