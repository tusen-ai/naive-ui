import { h, withDirectives, Transition } from 'vue'
import zindexable from '../../_directives/zindexable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import presetProps from './presetProps'
import usecssr from '../../_mixins/usecssr'
import { useIsMounted } from '../../_utils/composition'
import omit from '../../_utils/vue/omit'
import NLazyTeleport from '../../_base/lazy-teleport'
import NModalMask from './Mask'
import NModalBodyWrapper from './BodyWrapper'
import styles from './styles'

export default {
  name: 'Modal',
  provide () {
    return {
      NModal: this
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    preset: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: 'body'
    },
    displayDirective: {
      validator (value) {
        return ['if', 'show'].includes(value)
      },
      default: 'if'
    },
    ...presetProps,
    // events
    'onUpdate:show': {
      type: Function,
      default: () => {}
    },
    onPositiveClick: {
      type: Function,
      default: () => {}
    },
    onNegativeClick: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    // private
    onBeforeLeave: {
      type: Function,
      default: () => {}
    },
    onAfterLeave: {
      type: Function,
      default: () => {}
    },
    // deprecated
    onBeforeHide: {
      type: Function,
      default: () => {}
    },
    onAfterHide: {
      type: Function,
      default: () => {}
    },
    onHide: {
      type: Function,
      default: () => {}
    }
  },
  setup () {
    return {
      isMounted: useIsMounted()
    }
  },
  methods: {
    hide () {
      this['onUpdate:show'](false)
      // legacy
      this.onHide(false)
    }
  },
  render () {
    return h(NLazyTeleport, {
      to: this.to,
      show: this.show
    }, {
      default: () => [
        withDirectives(
          h('div', {
            ref: 'container',
            class: [
              'n-modal-container',
              {
                [this.namespace]: this.namespace
              }
            ]
          },
          [
            h(Transition, {
              name: 'n-fade-in-transition',
              key: 'mask',
              appear: this.isMounted
            }, {
              default: () => {
                return this.show ? [ h(NModalMask) ] : null
              }
            }),
            h(NModalBodyWrapper,
              {
                ref: 'bodyWrapper',
                ...omit(this.$props, ['maskClosable', 'to']),
                theme: this.syntheticTheme,
                show: this.show,
                onClose: () => {
                  this.onClose()
                },
                onNegativeClick: () => {
                  this.onNegativeClick()
                },
                onPositiveClick: () => {
                  this.onPositiveClick()
                },
                onBeforeLeave: () => {
                  this.onBeforeLeave()
                  // deprecated
                  this.onBeforeHide()
                },
                onAfterLeave: () => {
                  this.onAfterLeave()
                  // deprecated
                  this.onAfterHide()
                },
                onClickoutside: () => {
                  if (this.maskClosable) {
                    // TODO: slient scrollbar click
                    this.hide()
                  }
                }
              },
              {
                ...this.$slots
              }
            )
          ]),
          [
            [zindexable, {
              enabled: this.show
            }]
          ]
        )
      ]
    })
  }
}
