import placeable from '../../../mixins/placeable'
import popoverManager from './PopoverManager'

export default {
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
      default: 'hover'
    }
  },
  mixins: [placeable],
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
  data () {
    return {
      internalActive: false
    }
  },
  mounted () {
    console.log('[Activator.mounted] id', this.id)
    console.log('[Activator.mounted] active', this.active)
    popoverManager.registerActivator(this)
    this.registerListeners()
  },
  beforeUpdate () {

  },
  updated () {
    console.log('Activator Updated', this.id)
    popoverManager.registerActivator(this)
    this.registerListeners()
  },
  beforeDestroy () {
    console.log('Activator Destroyed', this.id)
    popoverManager.unregisterActivator(this)
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
    getTrackingElement () {
      // console.log('popover activator getTrackingElement')
      return document.querySelector(`[n-popover-id="${this.id}"]`)
    },
    getTrackedElement () {
      return this.$el
    },
    content () {
      console.log(popoverManager, this)
      return popoverManager.getContentInstance(this)
    },
    handleClick () {
      if (this.triggeredByClick) {
        console.log(`[Activator.handleClick]`)
        if (this.active) this.deactivate()
        else this.activate()
      }
    },
    handleMouseEnter () {
      if (this.triggeredByHover) {
        console.log(`[Activator.handleMouseEnter]`)
        this.activate()
      }
    },
    handleMouseLeave () {
      if (this.triggeredByHover) {
        this.deactivate()
      }
    },
    registerListeners () {
      const el = this.$el
      if (el) {
        el.removeEventListener('click', this.handleClick)
        el.removeEventListener('mouseenter', this.handleMouseEnter)
        el.removeEventListener('mouseleave', this.handleMouseLeave)
        if (this.triggeredByClick) {
          console.log('register click')
          el.addEventListener('click', this.handleClick)
        } else if (this.triggeredByHover) {
          console.log('register hover')
          el.addEventListener('mouseenter', this.handleMouseEnter)
          el.addEventListener('mouseleave', this.handleMouseEnter)
        }
      }
    }
  }
}
