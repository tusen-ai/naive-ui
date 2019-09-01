import popoverManager from './PopoverManager'
import clickoutside from '../../../directives/clickoutside'
import mousemoveoutside from '../../../directives/mousemoveoutside'

export default {
  name: 'NPopoverContent',
  props: {
    id: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  directives: {
    clickoutside,
    mousemoveoutside
  },
  data () {
    return {
      internalActive: false
    }
  },
  computed: {
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
      if (this.trigger === 'manual') return this.show
      else return this.internalActive
    }
  },
  mounted () {
    popoverManager.registerContent(this)
  },
  beforeUpdate () {

  },
  updated () {
    popoverManager.registerContent(this)
  },
  beforeDestroy () {
    popoverManager.unregisterContent(this)
  },
  methods: {
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
      return popoverManager.getActivatorInstance(this)
    },
    handleMouseMoveOutside () {
      if (this.triggeredByHover) {
        console.log('[PopoverContent.handleMouseMoveOutside]')
        this.deactivate()
      }
    },
    handleClickOutside (e) {
      if (this.triggeredByClick) {
        const activator = this.activator()
        if (activator && activator.$el) {
          const activatorEl = activator.$el
          if (activatorEl.contains(e.target)) {
            console.log('[PopoverContent.handleClickOutside] click at activator, do nothing')
            return
          }
        }
        console.log('[PopoverContent.handleClickOutside] click at outside, close the popover')
        this.deactivate()
      }
    }
  },
  render (h) {
    console.log('render popover content', this.$props)
    return h('div', {
      staticClass: 'n-detached-content-container'
    }, [
      h('div', {
        staticClass: 'n-detached-content',
        attrs: {
          'n-popover-id': this.$props.id
        }
      }, [
        h('transition', {
          props: {
            name: 'n-popover-fade'
          }
        }, [
          this.active
            ? h('div', {
              attrs: {
                'n-placement': this.placement
              },
              staticClass: 'n-popover__content',
              class: {
                'n-popover__content--without-arrow': !this.arrow
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
                // mouseenter: this.handleMouseEnter,
                // mouseleave: this.handleMouseLeavePopover
              }
            }, [
              this.arrow
                ? h('div', {
                  staticClass: 'n-popover__arrow',
                  directives: [
                    {
                      name: 'clickoutside',
                      value: this.handleClickOutside
                    },
                    {
                      name: 'mousemoveoutside',
                      valud: this.handleMouseMoveOutside
                    }
                  ]
                })
                : null,
              ...this.$slots.default
            ])
            : null
        ])
      ])
    ])
  }
}
