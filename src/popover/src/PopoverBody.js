import {
  h,
  vShow,
  withDirectives,
  Transition,
  ref,
  defineComponent,
  computed,
  mergeProps
} from 'vue'
import { VFollower } from 'vueuc'
import { clickoutside, mousemoveoutside } from 'vdirs'
import { useTheme, useConfig } from '../../_mixins'
import { formatLength, useAdjustedTo, getSlot } from '../../_utils'
import { popoverLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'PopoverBody',
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
    padded: {
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
  setup (props) {
    const themeRef = useTheme('Popover', 'Popover', style, popoverLight, props)
    return {
      ...useConfig(props),
      adjustedTo: useAdjustedTo(props),
      followerEnabled: ref(props.show),
      followerRef: ref(null),
      cssVars: computed(() => {
        const {
          common: {
            cubicBezierEaseInOut,
            cubicBezierEaseIn,
            cubicBezierEaseOut
          },
          self: {
            space,
            spaceArrow,
            padding,
            fontSize,
            textColor,
            color,
            boxShadow,
            borderRadius,
            arrowHeight,
            arrowOffset,
            arrowOffsetVertical
          }
        } = themeRef.value
        return {
          '--box-shadow': boxShadow,
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-in': cubicBezierEaseIn,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--font-size': fontSize,
          '--text-color': textColor,
          '--color': color,
          '--border-radius': borderRadius,
          '--arrow-height': arrowHeight,
          '--arrow-offset': arrowOffset,
          '--arrow-offset-vertical': arrowOffsetVertical,
          '--padding': padding,
          '--space': space,
          '--space-arrow': spaceArrow
        }
      })
    }
  },
  computed: {
    useVShow () {
      return this.displayDirective === 'show'
    },
    directives () {
      const { trigger } = this
      const directives = []
      if (trigger === 'click') {
        directives.push([clickoutside, this.handleClickOutside])
      }
      if (trigger === 'hover') {
        directives.push([mousemoveoutside, this.handleMouseMoveOutside])
      }
      if (this.useVShow) directives.push([vShow, this.show])
      return directives
    },
    style () {
      return [
        {
          width: formatLength(this.width),
          maxWidth: formatLength(this.maxWidth),
          minWidth: formatLength(this.minWidth)
        },
        this.cssVars
      ]
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
            mergeProps(
              {
                class: [
                  'n-popover',
                  {
                    'n-popover--no-arrow': !this.showArrow,
                    'n-popover--shadow': this.shadow,
                    'n-popover--padded': this.padded,
                    'n-popover--raw': this.raw
                  }
                ],
                ref: 'body',
                style: this.style,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave
              },
              this.$attrs
            ),
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
})
