import scrollDelegate from '../utils/delegate/scrollDelegate'
import resizeDelegate from '../utils/delegate/resizeDelegate'
import getParentNode from '../utils/dom/getParentNode'
import getScrollParent from '../utils/dom/getScrollParent'
import calcPlacementTransfrom from '../utils/dom/calcPlacementTransform'

function getActivatorEl (componentInstance) {
  return componentInstance.currentActivatorEl || componentInstance.$refs.activator.$el || componentInstance.$refs.activator
}

function sortOrigin (origin) {
  const origins = origin.split(' ')
  if (origins.length === 2) {
    if (origins[0] === 'left' || origins[0] === 'right') return origins[1] + ' ' + origins[0]
  }
  return origin
}

/**
 * Make $refs.content trace $refs.activator, set $refs.contentInner width by the way
 *
 * Dependency:
 * $refs.activator
 * $refs.content
 * $refs.contentInner(optional)
 * $vm.active
 *
 * @prop {string} placement determine where should $refs.content be put
 * @prop {string} widthMode determine how width is $refs.contentInner
 */
export default {
  props: {
    positionMode: {
      type: String,
      default: 'fixed',
      validator (value) {
        return ['fixed', 'absolute'].includes(value)
      }
    },
    placement: {
      validator (value) {
        return [
          'top',
          'bottom',
          'left',
          'right',
          'top-start',
          'top-end',
          'left-start',
          'left-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end'
        ].includes(value)
      },
      default: 'bottom'
    },
    widthMode: {
      validator (value) {
        return ['self', 'activator'].includes(value)
      },
      default: 'self'
    },
    x: {
      type: Number,
      default: null
    },
    y: {
      type: Number,
      default: null
    },
    manuallyPositioned: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    positionModeisAbsolute () {
      return this.positionMode === 'absolute'
    }
  },
  watch: {
    active (newValue) {
      if (newValue) {
        this.$nextTick().then(this.updatePosition)
      }
    },
    x () {
      this.$nextTick().then(this.updatePosition)
    },
    y () {
      this.$nextTick().then(this.updatePosition)
    }
  },
  data () {
    return {
      trackingElement: null,
      trackedElement: null,
      scrollListeners: []
    }
  },
  mounted () {
    this._getTrackingElement()
    this.trackingElement.style.position = 'absolute'
    this.$nextTick().then(() => {
      this.registerScrollListeners()
      this.registerResizeListener()
      this.updatePosition()
    })
  },
  beforeDestroy () {
    this.unregisterScrollListeners()
    this.unregisterResizeListener()
  },
  methods: {
    _getTrackingElement () {
      if (this.$refs && this.$refs.content) {
        this.trackingElement = this.$refs.content
      } else if (this.getTrackingElement) {
        this.trackingElement = this.getTrackingElement()
      }
    },
    _getTrackedElement () {
      if (this.$refs && this.$refs.activator) {
        this.trackedElement = getActivatorEl(this)
      } else if (this.getTrackedElement) {
        this.trackedElement = this.getTrackedElement()
      }
    },
    /**
     * Need to be fulfilled!
     */
    updatePositionInAbsoluteMode () {
      this.trackingElement.style.position = 'absolute'
      this.trackingElement.style.top = '100%'
      this.trackingElement.style.left = '0%'
      this.trackingElement.style.right = null
      this.trackingElement.style.bottom = null
      this.trackingElement.style.transformOrigin = 'top left'
      this.trackingElement.setAttribute('n-suggested-transform-origin', 'top left')
    },
    updatePosition (el, cb, keepOrigin = false) {
      if (!this.active && !this.show) return
      if (!this.manuallyPositioned) {
        this._getTrackedElement()
      }
      this._getTrackingElement()
      if (this.manuallyPositioned) {
        if (!this.trackingElement) {
          console.error('[naive-ui/placeable/updatePosition]: trackingElement not found!')
        }
      } else {
        if (!this.trackedElement || !this.trackingElement) {
          console.error('[naive-ui/placeable/updatePosition]: trakedElement or trackingElement not found!')
        }
      }
      if (this.positionModeisAbsolute) {
        this.updatePositionInAbsoluteMode()
        return
      }
      // console.log(activator)
      let activatorBoundingClientRect = null
      if (!this.manuallyPositioned) {
        activatorBoundingClientRect = this.trackedElement.getBoundingClientRect()
      } else {
        activatorBoundingClientRect = {
          top: this.y,
          left: this.x,
          height: 0,
          width: 0,
          right: this.x,
          bottom: this.y
        }
        // console.log(activatorBoundingClientRect)
      }
      // console.log(activatorBoundingClientRect)
      // console.log(this.$refs.popoverBody)
      // debugger
      const contentBoundingClientRect = this.trackingElement.getBoundingClientRect()
      // console.log(contentBoundingClientRect)
      // debugger
      // console.log('scroll', activatorBoundingClientRect, contentBoundingClientRect)
      const [placementTransform, suggestedTransformOrigin] = calcPlacementTransfrom(this.placement, activatorBoundingClientRect, contentBoundingClientRect)
      // console.log(placementTransform)
      this.trackingElement.style.position = 'absolute'
      this.trackingElement.style.top = placementTransform.top
      this.trackingElement.style.left = placementTransform.left
      this.trackingElement.style.right = placementTransform.right
      this.trackingElement.style.bottom = placementTransform.bottom
      // if (suggestedTransformOrigin === 'left bottom') {
      //   debugger
      // }
      // console.log(' !!! ', suggestedTransformOrigin)
      if (keepOrigin === false) {
        this.trackingElement.style.transformOrigin = suggestedTransformOrigin
        this.trackingElement.setAttribute('n-suggested-transform-origin', suggestedTransformOrigin)
      } else if (keepOrigin !== true) {
        if (keepOrigin.horizontal) {
          const originalTransformOrigin = this.trackingElement.style.transformOrigin
          if (originalTransformOrigin && suggestedTransformOrigin) {
            if (suggestedTransformOrigin.match(/top/)) {
              this.trackingElement.style.transformOrigin = originalTransformOrigin.replace(/(top|bottom)/g, 'top')
              this.trackingElement.setAttribute('n-suggested-transform-origin', sortOrigin(originalTransformOrigin.replace(/(top|bottom)/g, 'top')))
            }
            if (suggestedTransformOrigin.match(/bottom/)) {
              this.trackingElement.style.transformOrigin = sortOrigin(originalTransformOrigin.replace(/(top|bottom)/g, 'bottom'))
              this.trackingElement.setAttribute('n-suggested-transform-origin', sortOrigin(originalTransformOrigin.replace(/(top|bottom)/g, 'bottom')))
            }
          }
        }
      }

      // console.log(this.$refs.contentInner)
      if (this.$refs.contentInner) {
        let el = this.$refs.contentInner
        if (this.$refs.contentInner.$el) {
          el = this.$refs.contentInner.$el
        }
        if (this.widthMode === 'activator') {
          el.style.minWidth = activatorBoundingClientRect.width + 'px'
        }
      }
      if (el && cb) {
        cb(el, activatorBoundingClientRect, contentBoundingClientRect)
      }
    },
    registerResizeListener () {
      resizeDelegate.registerHandler(this.updatePosition)
    },
    registerScrollListeners () {
      this._getTrackedElement()
      let currentElement = getParentNode(this.trackedElement)
      while (true) {
        currentElement = getScrollParent(currentElement)
        if (currentElement === null) break
        this.scrollListeners.push([currentElement, this.updatePosition])
        currentElement = getParentNode(currentElement)
      }
      // console.log(this.scrollListeners)
      for (const [el, handler] of this.scrollListeners) {
        scrollDelegate.registerHandler(el, handler)
      }
    },
    unregisterResizeListener () {
      resizeDelegate.unregisterHandler(this.updatePosition)
    },
    unregisterScrollListeners () {
      for (const [el, handler] of this.scrollListeners) {
        scrollDelegate.unregisterHandler(el, handler)
      }
      this.scrollListeners = []
    }
  }
}
