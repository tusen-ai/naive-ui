import {
  h,
  vShow,
  withDirectives,
  Transition
} from 'vue'
import clickoutside from '../../_directives/clickoutside'
import mousemoveoutside from '../../_directives/mousemoveoutside'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import placeable from '../../_mixins/placeable'
import zindexable from '../../_mixins/zindexable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'
import formatLength from '../../_utils/css/formatLength'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'

export default {
  name: 'PopoverBody',
  cssrName: 'Popover',
  emits: [
    'show',
    'hide'
  ],
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
    arrow: {
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
    }
  },
  mixins: [
    withapp,
    themeable,
    placeable,
    zindexable,
    usecssr(styles)
  ],
  data () {
    return {
      placeableEnabled: this.show,
      zindexableEnabled: true
    }
  },
  watch: {
    show (value) {
      if (value) {
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  },
  computed: {
    placeableManuallyPositioned () {
      return this.manuallyPositioned
    },
    zindexableElementDisplayed () {
      return this.show
    },
    zindexableFlip () {
      return this.filp
    },
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
      const style = {}
      const {
        width,
        maxWidth,
        minWidth,
        bodyStyle
      } = this
      if (width) {
        style.width = formatLength(width)
      }
      if (maxWidth) {
        style.maxWidth = formatLength(maxWidth)
      }
      if (minWidth) {
        style.minWidth = formatLength(minWidth)
      }
      if (bodyStyle) {
        Object.assign(style, bodyStyle)
      }
      return style
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
    placeableGetTrackedElement () {
      return this.NPopover.getTriggerElement()
    },
    placeableGetTrackingElement () {
      return this.$refs.wrapper
    },
    placeableGetAbsoluteOffsetContainer () {
      return this.$refs.container
    },
    // for zindexable mixin
    zindexableGetElement () {
      return this.$refs.container
    }
  },
  render () {
    return h('div', {
      class: {
        'n-positioning-container': true,
        [this.containerClass || 'n-popover']: true,
        [this.namespace]: this.namespace
      },
      ref: 'container'
    }, [
      h('div', {
        class: 'n-positioning-content',
        ref: 'wrapper'
      }, [
        h(Transition, {
          name: 'popover-body-transition',
          appear: true,
          onEnter: () => {
            this.placeableEnabled = true
          },
          onAfterLeave: () => {
            this.placeableEnabled = false
          }
        }, {
          default: () => ((this.useVShow || this.show) ? withDirectives(h('div', {
            'n-placement': this.adjustedPlacement,
            class: {
              'n-popover-body': true,
              'n-popover-body--no-arrow': !this.arrow,
              [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
              'n-popover-body--shadow': this.shadow,
              [this.bodyClass]: this.bodyClass,
              'n-popover-body--styled': !this.raw,
              'n-popover-body--fix-width': this.width !== null || this.maxWidth !== null
            },
            style: this.style,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
          }, [
            getDefaultSlot(this),
            this.arrow
              ? h(
                'div',
                {
                  staticClass: 'n-popover-arrow-wrapper'
                }, [
                  h('div', {
                    staticClass: 'n-popover-arrow',
                    style: this.arrowStyle
                  })
                ])
              : null
          ]), this.directives) : null)
        })
      ])
    ])
  }
}
