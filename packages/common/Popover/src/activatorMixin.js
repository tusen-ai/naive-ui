import popoverManager from './PopoverManager'

export default {
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
      default: 'hover'
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 300
    },
    raw: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
    },
    controller: {
      type: Object,
      default: null
    }
  },
  created () {
    this.memorizedId = this.id
    popoverManager.registerActivator(this.memorizedId, this)
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
      if (this.trigger === 'manual') return this.value
      else return this.internalActive
    }
  },
  data () {
    return {
      memorizedId: null,
      internalActive: false,
      delayTimerId: null,
      vanishTimerId: null
    }
  },
  mounted () {
    // console.log('[Activator.mounted] id', this.id)
    // console.log('[Activator.mounted] active', this.active)
    this.registerListeners()
    if (this.controller) {
      this.controller.show = this.activate
      this.controller.hide = this.deactivate
    }
  },
  beforeUpdate () {},
  updated () {
    this.registerListeners()
    if (this.controller) {
      this.controller.show = this.activate
      this.controller.hide = this.deactivate
    }
  },
  beforeDestroy () {
    popoverManager.unregisterActivator(this.memorizedId)
    if (this.controller) {
      this.controller.show = null
      this.controller.hide = null
    }
  },
  methods: {
    activate () {
      const content = this.content()
      if (content && !content.active) {
        content.internalActive = true
      }
      this.internalActive = true
    },
    deactivate () {
      const content = this.content()
      if (content && content.active) {
        content.internalActive = false
      }
      this.internalActive = false
    },
    content () {
      return popoverManager.getContentInstance(this.memorizedId)
    },
    handleClick () {
      if (this.triggeredByClick) {
        // console.log(`[Activator.handleClick]`)
        if (this.active) this.deactivate()
        else this.activate()
      }
    },
    handleMouseEnter () {
      window.clearTimeout(this.vanishTimerId)
      if (this.triggeredByHover) {
        this.delayTimerId = window.setTimeout(() => {
          this.activate()
          this.delayTimerId = null
        }, this.delay)
      }
    },
    handleMouseLeave () {
      window.clearTimeout(this.delayTimerId)
      if (this.triggeredByHover) {
        this.vanishTimerId = window.setTimeout(() => {
          this.deactivate()
          this.vanishTimerId = null
        }, this.duration)
      }
    },
    registerListeners () {
      const el = this.$el
      if (el) {
        if (!el['@n-popover-context']) el['@n-popover-context'] = {}
        const elContext = el['@n-popover-context']
        if (this.triggeredByClick) {
          if (elContext.handleClick !== this.handleClick) {
            el.removeEventListener('click', elContext.handleClick)
            el.addEventListener('click', this.handleClick)
            elContext.handleClick = this.handleClick
          }
          if (elContext.handleMouseEnter) {
            el.removeEventListener('mouseenter', elContext.handleMouseEnter)
            el.removeEventListener('mouseenter', this.handleMouseEnter)
            elContext.handleMouseEnter = null
          }
          if (elContext.handleMouseLeave) {
            el.removeEventListener('mouseenter', elContext.handleMouseLeave)
            el.removeEventListener('mouseleave', this.handleMouseLeave)
            elContext.handleMouseLeave = null
          }
          // console.log('register click')
          // debugger
          el.addEventListener('click', this.handleClick)
        } else if (this.triggeredByHover) {
          // console.log('register hover')
          if (elContext.handleMouseLeave !== this.handleMouseLeave) {
            el.removeEventListener('mouseleave', elContext.handleMouseLeave)
            el.addEventListener('mouseleave', this.handleMouseLeave)
            elContext.handleMouseLeave = this.handleMouseLeave
          }
          if (elContext.handleMouseEnter !== this.handleMouseEnter) {
            el.removeEventListener('mouseenter', elContext.handleMouseEnter)
            el.addEventListener('mouseenter', this.handleMouseEnter)
            elContext.handleMouseEnter = this.handleMouseEnter
          }
          if (elContext.handleClick) {
            el.removeEventListener('click', elContext.handleMouseEnter)
            el.removeEventListener('click', this.handleMouseEnter)
            elContext.handleMouseEnter = null
          }
        }
      }
    }
  }
}
