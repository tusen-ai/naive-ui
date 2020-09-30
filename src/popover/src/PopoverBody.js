import {
  h,
  vShow,
  withDirectives,
  Transition
} from 'vue'
import clickoutside from '../../_directives/clickoutside'
import mousemoveoutside from '../../_directives/mousemoveoutside'
import zindexable from '../../_directives/zindexable'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import placeable from '../../_mixins/placeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'
import formatLength from '../../_utils/css/formatLength'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'

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
    withapp,
    themeable,
    placeable,
    usecssr(styles)
  ],
  data () {
    return {
      __placeableEnabled: this.show
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
            onEnter: () => {
              this.__placeableEnabled = true
            },
            onAfterLeave: () => {
              this.__placeableEnabled = false
            }
          }, {
            default: () => ((this.useVShow || this.show) ? withDirectives(h('div', {
              'n-placement': this.__placeableAdjustedPlacement,
              class: [
                'n-popover-body',
                {
                  [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
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
              getDefaultSlot(this),
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
