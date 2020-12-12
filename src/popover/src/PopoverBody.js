import { h, vShow, withDirectives, Transition, ref } from 'vue'
import { VFollower } from 'vueuc'
import { clickoutside, mousemoveoutside } from 'vdirs'
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles'
import { formatLength, useAdjustedTo, getSlot } from '../../_utils'

export default {
  name: 'PopoverBody',
  cssrName: 'Popover',
  inject: {
    NPopover: {
      default: null
    }
  },
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: undefined
    },
    trigger: {
      type: String,
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: undefined
    },
    delay: {
      type: Number,
      default: undefined
    },
    duration: {
      type: Number,
      default: undefined
    },
    raw: {
      type: Boolean,
      default: undefined
    },
    bodyClass: {
      type: String,
      default: undefined
    },
    bodyStyle: {
      type: Object,
      default: undefined
    },
    arrowStyle: {
      type: Object,
      default: undefined
    },
    displayDirective: {
      type: String,
      default: undefined
    },
    x: {
      type: Number,
      default: undefined
    },
    y: {
      type: Number,
      default: undefined
    },
    filp: {
      type: Boolean,
      default: undefined
    },
    placement: {
      type: String,
      default: undefined
    },
    // private
    shadow: {
      type: Boolean,
      default: undefined
    },
    // deprecated
    width: {
      type: Number,
      default: undefined
    },
    minWidth: {
      type: Number,
      default: undefined
    },
    maxWidth: {
      type: Number,
      default: undefined
    },
    animated: {
      type: Boolean,
      default: undefined
    }
  },
  mixins: [configurable, themeable, withCssr(styles)],
  setup (props) {
    return {
      adjustedTo: useAdjustedTo(props),
      followerEnabled: ref(props.show),
      followerRef: ref(null)
    }
  },
  watch: {
    show (value) {
      if (value) this.followerEnabled = true
      else {
        if (!this.animated) {
          this.followerEnabled = false
        }
      }
    }
  },
  created () {
    this.NPopover.bodyInstance = this
  },
  beforeUnmount () {
    this.NPopover.bodyInstance = null
  },
  computed: {
    useVShow () {
      return this.displayDirective === 'show'
    },
    directives () {
      const { trigger } = this
      const directives = []
      if (trigger === 'click') { directives.push([clickoutside, this.handleClickOutside]) }
      if (trigger === 'hover') { directives.push([mousemoveoutside, this.handleMouseMoveOutside]) }
      if (this.useVShow) directives.push([vShow, this.show])
      return directives
    },
    style () {
      return {
        width: formatLength(this.width),
        maxWidth: formatLength(this.maxWidth),
        minWidth: formatLength(this.minWidth),
        ...this.bodyStyle
      }
    }
  },
  methods: {
    syncPosition () {
      this.followerRef.syncPosition()
    },
    handleMouseEnter (e) {
      if (this.trigger === 'hover') {
        this.NPopover.handleMouseEnter(e)
      }
    },
    handleMouseLeave (e) {
      if (this.trigger === 'hover') {
        this.NPopover.handleMouseLeave(e)
      }
    },
    handleMouseMoveOutside (e) {
      if (
        this.trigger === 'hover' &&
        !this.getTriggerElement().contains(e.target)
      ) {
        this.NPopover.handleMouseMoveOutside(e)
      }
    },
    handleClickOutside (e) {
      if (
        this.trigger === 'click' &&
        !this.getTriggerElement().contains(e.target)
      ) {
        this.NPopover.handleClickOutside()
      }
    },
    getTriggerElement () {
      return this.NPopover.getTriggerElement()
    }
  },
  render () {
    const { animated } = this
    const contentNode =
      this.useVShow || this.show
        ? withDirectives(
          h(
            'div',
            {
              class: [
                'n-popover',
                {
                  [`n-${this.mergedTheme}-theme`]: this.mergedTheme,
                  'n-popover--no-arrow': !this.showArrow,
                  'n-popover--shadow': this.shadow,
                  [this.bodyClass]: this.bodyClass,
                  'n-popover--raw': this.raw
                }
              ],
              ref: 'body',
              style: this.style,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave
            },
            [
              getSlot(this),
              this.showArrow
                ? h(
                  'div',
                  {
                    class: 'n-popover-arrow-wrapper'
                  },
                  [
                    h('div', {
                      class: 'n-popover-arrow',
                      style: this.arrowStyle
                    })
                  ]
                )
                : null
            ]
          ),
          this.directives
        )
        : null
    return h(
      VFollower,
      {
        show: this.show,
        enabled: this.followerEnabled,
        to: this.adjustedTo,
        x: this.x,
        y: this.y,
        placement: this.placement,
        containerClass: this.namespace,
        ref: 'followerRef'
      },
      {
        default: () => {
          return animated
            ? h(
              Transition,
              {
                name: 'popover-transition',
                appear: this.NPopover.isMounted,
                onAfterLeave: () => {
                  this.followerEnabled = false
                }
              },
              {
                default: () => contentNode
              }
            )
            : contentNode
        }
      }
    )
  }
}
