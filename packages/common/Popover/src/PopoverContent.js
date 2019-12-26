import popoverManager from './PopoverManager'
import clickoutside from '../../../directives/clickoutside'
import mousemoveoutside from '../../../directives/mousemoveoutside'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'

export default {
  name: 'NPopoverContent',
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    },
    arrow: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 300
    },
    controller: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    minWidth: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    },
    shadow: {
      type: Boolean,
      default: true
    },
    raw: {
      type: Boolean,
      default: false
    },
    manuallyPositioned: {
      type: Boolean,
      default: false
    },
    containerClass: {
      type: String,
      default: undefined
    },
    detached: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: String,
      default: null
    }
  },
  mixins: [withapp, themeable, asthemecontext, placeable, zindexable],
  directives: {
    clickoutside,
    mousemoveoutside
  },
  data () {
    return {
      memorizedId: null,
      internalActive: false,
      show: false
    }
  },
  created () {
    this.memorizedId = this.id
    popoverManager.registerContent(this.memorizedId, this)
    if (this.active) this.show = true
  },
  watch: {
    active (value) {
      if (value) {
        this.$parent.transferElement()
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  },
  computed: {
    style () {
      const style = {}
      if (this.width) {
        style.width = this.width + 'px'
      }
      if (this.maxWidth) {
        style.maxWidth = this.maxWidth + 'px'
      }
      if (this.minWidth) {
        style.minWidth = this.minWidth + 'px'
      }
      return style
    },
    triggeredByClick () {
      return this.trigger === 'click'
    },
    triggeredByHover () {
      return this.trigger === 'hover'
    },
    triggeredByManual () {
      return this.trigger === 'manual'
    },
    active () {
      if (this.trigger === 'manual') return this.value
      else return this.internalActive
    }
  },
  mounted () {
    if (this.active) {
      this.$parent.transferElement()
      // this.$nextTick().then(() => {
      //   this.updatePosition()
      // })
    }
    if (this.controller) {
      this.controller.updatePosition = this.updatePosition
    }
  },
  beforeUpdate () {

  },
  updated () {
    if (this.controller) {
      this.controller.updatePosition = this.updatePosition
    }
  },
  beforeDestroy () {
    popoverManager.unregisterContent(this.memorizedId)
  },
  methods: {
    cancelVanishTimer () {
      const activator = this.activator()
      if (activator) {
        window.clearTimeout(activator.vanishTimerId)
        activator.vanishTimerId = null
      }
    },
    activate () {
      const activator = this.activator()
      if (activator && !activator.active) {
        activator.internalActive = true
      }
      this.internalActive = true
    },
    deactivate () {
      const activator = this.activator()
      if (activator && activator.active) {
        activator.internalActive = false
      }
      this.internalActive = false
    },
    activator () {
      return popoverManager.getActivatorInstance(this.memorizedId)
    },
    handleMouseEnter () {
      this.cancelVanishTimer()
    },
    handleMouseLeave (e) {
      if (this.triggeredByHover) {
        if (!this.active) return
        this.cancelVanishTimer()
        // console.log('[PopoverContent.handleMouseLeave]')
        const activator = this.activator()
        activator.vanishTimerId = window.setTimeout(() => {
          if (activator && activator.$el) {
            const activatorEl = activator.$el
            if (activatorEl.contains(e.target)) {
              // console.log('[PopoverContent.handleMouseLeave] move on activator, do nothing')
              return
            }
          }
          // console.log('[PopoverContent.handleMouseLeave] move on outside, close the popover')
          activator.vanishTimerId = null
          this.deactivate()
        }, this.duration)
      }
    },
    handleMouseMoveOutside (e) {
      // console.log('[PopoverContent.handleMouseMoveOutside')
      if (this.triggeredByHover) {
        this.handleMouseLeave(e)
      }
    },
    handleClickOutside (e) {
      if (this.triggeredByClick) {
        const activator = this.activator()
        if (activator && activator.$el) {
          const activatorEl = activator.$el
          if (activatorEl.contains(e.target)) {
            // console.log('[PopoverContent.handleClickOutside] click at activator, do nothing')
            return
          }
        }
        // console.log('[PopoverContent.handleClickOutside] click at outside, close the popover')
        this.deactivate()
      }
    },
    getTrackingElement () {
      // console.log('getTrackingElement', this.activator().$el)
      return this.$refs.content
    },
    getTrackedElement () {
      // console.log('getTrackedEleme')
      return this.activator().$el
    },
    getZindexableContent () {
      return this.$el
    }
  },
  render (h) {
    // console.log('render popover content', this.$props)
    return h('div', {
      staticClass: 'n-detached-content-container',
      class: {
        [this.containerClass]: true,
        [this.namespace]: this.namespace
      },
      ref: 'contentContainer'
    }, [
      h('div', {
        staticClass: 'n-detached-content',
        ref: 'content',
        attrs: {
          'n-popover-id': this.$props.id
        }
      }, [
        h('transition', {
          props: {
            name: 'n-popover-content-transition'
          },
          on: {
            enter: () => {
              this.show = true
            },
            afterLeave: () => {
              this.show = false
            }
          }
        }, [
          this.active
            ? h('div', {
              attrs: {
                'n-placement': this.placement
              },
              staticClass: 'n-popover-content',
              class: {
                'n-popover-content--without-arrow': !this.arrow,
                [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme,
                'n-popover-content--without-shadow': !this.shadow,
                [this.contentClass]: this.contentClass,
                'n-popover-content--fix-width': this.width !== null || this.maxWidth !== null
              },
              style: this.style,
              directives: [
                {
                  name: 'clickoutside',
                  value: this.handleClickOutside
                },
                {
                  name: 'mousemoveoutside',
                  value: this.handleMouseMoveOutside
                }
              ],
              on: {
                mouseenter: this.handleMouseEnter,
                mouseleave: this.handleMouseLeave
              }
            }, [
              ...this.$slots.default,
              this.arrow
                ? h('div', {
                  staticClass: 'n-popover-arrow'
                })
                : null
            ])
            : null
        ])
      ])
    ])
  }
}
