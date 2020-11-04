import {
  h,
  vShow,
  withDirectives,
  Transition
} from 'vue'
import { clickoutside, mousemoveoutside, zindexable } from '../../_directives'
import { configurable, themeable, placeable, usecssr } from '../../_mixins'
import styles from './styles'
import { formatLength } from '../../_utils'
import { getSlot } from '../../_utils/vue'

export default {
  name: 'PopoverBody',
  cssrName: 'Popover',
  inject: {
    NPopover: {
      default: null
    }
  },
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
    manuallyPositioned: {
      type: Boolean,
      default: undefined
    },
    filp: {
      type: Boolean,
      default: undefined
    },
    // private
    shadow: {
      type: Boolean,
      default: undefined
    },
    containerClass: {
      type: String,
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
    }
  },
  mixins: [
    configurable,
    themeable,
    placeable,
    usecssr(styles)
  ],
  data () {
    return {
      __placeableEnabled: this.show
    }
  },
  watch: {
    show (value) {
      if (value) this.__placeableEnabled = true
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
      const directives = [
        [clickoutside, this.handleClickOutside],
        [mousemoveoutside, this.handleMouseLeave]
      ]
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
    },
    // for placeable mixin
    __placeableTracked () {
      return this.NPopover.getTriggerElement()
    },
    __placeableTracking () {
      return this.$refs.bodyWrapper
    },
    __placeableBody () {
      return this.$refs.body
    },
    __placeableOffsetContainer () {
      return this.$refs.container
    }
  },
  render () {
    return withDirectives(
      h('div', {
        class: [
          'n-positioning-container',
          {
            [this.containerClass || 'n-popover']: true,
            [this.namespace]: this.namespace
          }
        ],
        ref: 'container'
      }, [
        h('div', {
          class: 'n-positioning-content',
          ref: 'bodyWrapper'
        }, [
          h(Transition, {
            name: 'popover-body-transition',
            appear: this.NPopover.isMounted,
            onAfterLeave: () => {
              this.__placeableEnabled = false
            }
          }, {
            default: () => ((this.useVShow || this.show) ? withDirectives(h('div', {
              'n-placement': this.__placeableAdjustedPlacement,
              class: [
                'n-popover-body',
                {
                  [`n-${this.mergedTheme}-theme`]: this.mergedTheme,
                  'n-popover-body--no-arrow': !this.showArrow,
                  'n-popover-body--shadow': this.shadow,
                  [this.bodyClass]: this.bodyClass,
                  'n-popover-body--styled': !this.raw
                }
              ],
              ref: 'body',
              style: this.style,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave
            }, [
              getSlot(this),
              this.showArrow
                ? h(
                  'div',
                  {
                    class: 'n-popover-arrow-wrapper'
                  }, [
                    h('div', {
                      class: 'n-popover-arrow',
                      style: this.arrowStyle
                    })
                  ])
                : null
            ]), this.directives) : null)
          })
        ])
      ]),
      [
        [zindexable, {
          enabled: this.show
        }]
      ]
    )
  }
}
