import { h, withDirectives, Transition, ref, computed, mergeProps } from 'vue'
import { zindexable } from 'vdirs'
import { useIsMounted, useClicked, useClickPosition } from 'vooks'
import { VLazyTeleport } from 'vueuc'
import { useConfig, useTheme } from '../../_mixins'
import presetProps from './presetProps'
import { warn, omit } from '../../_utils'
import NModalBodyWrapper from './BodyWrapper.vue'
import style from './styles/index.cssr.js'
import { modalLight } from '../styles'

export default {
  name: 'Modal',
  provide () {
    return {
      NModal: this,
      NDrawer: null
    }
  },
  inheritAttrs: false,
  props: {
    ...useTheme.props,
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
      default: undefined
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
    clicked: {
      type: Boolean,
      default: undefined
    },
    clickPosition: {
      type: Object,
      default: null
    },
    // deprecated
    overlayStyle: {
      validator () {
        if (__DEV__) {
          warn(
            'modal',
            '`overlay-style` is deprecated, please use `style` instead.'
          )
        }
        return true
      },
      default: undefined
    },
    onBeforeHide: {
      validator () {
        if (__DEV__) {
          warn(
            'modal',
            '`on-before-hide` is deprecated, please use `on-before-leave` instead.'
          )
        }
        return true
      },
      default: undefined
    },
    onAfterHide: {
      validator () {
        if (__DEV__) {
          warn(
            'modal',
            '`on-after-hide` is deprecated, please use `on-after-leave` instead.'
          )
        }
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
  setup (props) {
    const themeRef = useTheme('Modal', 'Modal', style, modalLight, props)
    const clickedRef = useClicked(64)
    const clickedPositionRef = useClickPosition()
    return {
      ...useConfig(props),
      isMounted: useIsMounted(),
      containerRef: ref(null),
      mousePosition: computed(() => {
        const { clicked } = props
        if (clicked !== undefined) {
          if (clicked) return props.clickPosition
        }
        if (clickedRef.value) {
          return clickedPositionRef.value
        }
        return null
      }),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseOut },
          self: { boxShadow, color, textColor }
        } = themeRef.value
        return {
          '--bezier-ease-out': cubicBezierEaseOut,
          '--box-shadow': boxShadow,
          '--color': color,
          '--text-color': textColor
        }
      })
    }
  },
  methods: {
    doUpdateShow (show) {
      const { 'onUpdate:show': onUpdateShow, onHide } = this
      if (onUpdateShow) onUpdateShow(show)
      // deprecated
      if (onHide && !show) onHide(show)
    }
  },
  render () {
    return h(
      VLazyTeleport,
      {
        to: this.to,
        show: this.show
      },
      {
        default: () => [
          withDirectives(
            h(
              'div',
              {
                ref: 'containerRef',
                class: [
                  'n-modal-container',
                  {
                    [this.namespace]: this.namespace
                  }
                ],
                style: this.cssVars
              },
              [
                h(
                  Transition,
                  {
                    name: 'n-fade-in-transition',
                    key: 'mask',
                    appear: this.appear ?? this.isMounted
                  },
                  {
                    default: () => {
                      return this.show
                        ? h('div', {
                          ref: 'containerRef',
                          class: 'n-modal-mask'
                        })
                        : null
                    }
                  }
                ),
                h(
                  NModalBodyWrapper,
                  mergeProps(this.$attrs, {
                    style: this.overlayStyle,
                    ref: 'bodyWrapper',
                    ...omit(this.$props, ['maskClosable', 'to']),
                    show: this.show,
                    onClose: () => {
                      const { onClose = () => {} } = this
                      Promise.resolve(onClose()).then((value) => {
                        if (value === false) return
                        this.doUpdateShow(false)
                      })
                    },
                    onNegativeClick: () => {
                      const { onNegativeClick = () => {} } = this
                      Promise.resolve(onNegativeClick()).then((value) => {
                        if (value === false) return
                        this.doUpdateShow(false)
                      })
                    },
                    onPositiveClick: () => {
                      const { onPositiveClick = () => {} } = this
                      Promise.resolve(onPositiveClick()).then((value) => {
                        if (value === false) return
                        this.doUpdateShow(false)
                      })
                    },
                    onBeforeLeave: () => {
                      const { onBeforeLeave, onBeforeHide } = this
                      if (onBeforeLeave) onBeforeLeave()
                      // deprecated
                      if (onBeforeHide) onBeforeHide()
                    },
                    onAfterLeave: () => {
                      const { onAfterLeave, onAfterHide } = this
                      if (onAfterLeave) onAfterLeave()
                      // deprecated
                      if (onAfterHide) onAfterHide()
                    },
                    onClickoutside: (e) => {
                      if (this.maskClosable) {
                        const { containerRef } = this
                        if (containerRef.contains(e.target)) {
                          this.doUpdateShow(false)
                        }
                      }
                    }
                  }),
                  this.$slots
                )
              ]
            ),
            [
              [
                zindexable,
                {
                  enabled: this.show
                }
              ]
            ]
          )
        ]
      }
    )
  }
}
