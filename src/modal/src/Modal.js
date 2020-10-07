import { h, withDirectives, Transition } from 'vue'
import zindexable from '../../_directives/zindexable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import presetProps from './presetProps'
import usecssr from '../../_mixins/usecssr'
import { useIsMounted } from '../../_utils/composition'
import { warn } from '../../_utils/naive/warn'
import { omit } from '../../_utils/vue'
import NLazyTeleport from '../../_base/lazy-teleport'
import NModalMask from './Mask'
import NModalBodyWrapper from './BodyWrapper.vue'
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
      default: undefined
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
      default: undefined
    },
    onPositiveClick: {
      type: Function,
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    },
    // private
    onBeforeLeave: {
      type: Function,
      default: undefined
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    appear: {
      type: Boolean,
      default: undefined
    },
    // deprecated
    onBeforeHide: {
      validator () {
        if (__DEV__) warn('modal', '`on-before-hide` is deprecated, please use `on-before-leave` instead.')
        return true
      },
      default: undefined
    },
    onAfterHide: {
      validator () {
        if (__DEV__) warn('modal', '`on-after-hide` is deprecated, please use `on-after-leave` instead.')
        return true
      },
      default: undefined
    },
    onHide: {
      validator () {
        if (__DEV__) warn('modal', '`on-hide` is deprecated.')
        return true
      },
      default: undefined
    }
  },
  setup () {
    return {
      isMounted: useIsMounted()
    }
  },
  methods: {
    hide () {
      const {
        'onUpdate:show': onUpdateShow,
        onHide
      } = this
      if (onUpdateShow) onUpdateShow(false)
      // deprecated
      if (onHide) onHide(false)
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
              appear: this.appear ?? this.isMounted
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
                  const { onClose } = this
                  if (onClose) onClose()
                },
                onNegativeClick: () => {
                  const { onNegativeClick } = this
                  if (onNegativeClick) onNegativeClick()
                },
                onPositiveClick: () => {
                  const { onPositiveClick } = this
                  if (onPositiveClick) onPositiveClick()
                },
                onBeforeLeave: () => {
                  const {
                    onBeforeLeave,
                    onBeforeHide
                  } = this
                  if (onBeforeLeave) onBeforeLeave()
                  // deprecated
                  if (onBeforeHide) onBeforeHide()
                },
                onAfterLeave: () => {
                  const {
                    onAfterLeave,
                    onAfterHide
                  } = this
                  if (onAfterLeave) onAfterLeave()
                  // deprecated
                  if (onAfterHide) onAfterHide()
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
