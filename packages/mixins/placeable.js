import scrollDelegate from '../utils/delegate/scrollDelegate'
import resizeDelegate from '../utils/delegate/resizeDelegate'
import getParentNode from '../utils/dom/getParentNode'
import getScrollParent from '../utils/dom/getScrollParent'
import calcPlacementTransfrom from '../utils/dom/calcPlacementTransform'

function getActivatorEl (componentInstance) {
  return componentInstance.$refs.activator.$el || componentInstance.$refs.activator
}

function getContentEl (componentInstance) {
  return componentInstance.$refs.content.$el || componentInstance.$refs.content
}

function sortOrigin (origin) {
  const origins = origin.split(' ')
  if (origins.length === 2) {
    if (origins[0] === 'left' || origins[0] === 'right') return origins[1] + ' ' + origins[0]
  }
  return origin
}

function getPositionInAbsoluteMode (placement, origin) {
  let position = {
    top: null,
    bottom: null,
    left: null,
    right: null
  }
  if (placement === 'bottom-start') {
    if (~origin.indexOf('top')) {
      position.top = '100%'
    }
    if (~origin.indexOf('bottom')) {
      position.bottom = '100%'
    }
    if (~origin.indexOf('left')) {
      position.left = '0'
    }
    if (~origin.indexOf('right')) {
      position.right = '0'
    }
  } else if (placement === 'right-start') {
    if (~origin.indexOf('top')) {
      position.top = '0'
    }
    if (~origin.indexOf('bottom')) {
      position.bottom = '0'
    }
    if (~origin.indexOf('left')) {
      position.left = '100%'
    }
    if (~origin.indexOf('right')) {
      position.right = '100%'
    }
  } else {
    console.error('[naive-ui/placeable/getPositionInAbsoluteMode]: placement not implemented')
  }
  return position
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
    },
    flip: {
      type: Boolean,
      default: true
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
    if (this.trackingElement) {
      this.trackingElement.style.position = 'absolute'
    }
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
        this.trackingElement = getContentEl(this)
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
    updatePositionInAbsoluteMode (position, transformOrigin) {
      this.trackingElement.style.position = 'absolute'
      this.trackingElement.style.top = position.top
      this.trackingElement.style.left = position.left
      this.trackingElement.style.right = position.right
      this.trackingElement.style.bottom = position.bottom
      this.trackingElement.style.transformOrigin = transformOrigin
      this.trackingElement.setAttribute('n-suggested-transform-origin', transformOrigin)
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
      const contentBoundingClientRect = {
        width: this.trackingElement.offsetWidth,
        height: this.trackingElement.offsetHeight
      }

      // console.log(contentBoundingClientRect.width, contentBoundingClientRect.height)
      // console.log(contentBoundingClientRect2.width, contentBoundingClientRect2.height)
      // console.log(contentBoundingClientRect)
      // debugger
      // console.log('scroll', activatorBoundingClientRect, contentBoundingClientRect)
      const [placementTransform, suggestedTransformOrigin] = calcPlacementTransfrom(this.placement, activatorBoundingClientRect, contentBoundingClientRect, this.flip)
      // console.log(this.trackingElement, this.positionMode, this.positionModeisAbsolute)
      if (this.positionModeisAbsolute) {
        const position = getPositionInAbsoluteMode(this.placement, suggestedTransformOrigin)
        // console.log(suggestedTransformOrigin, position)
        this.updatePositionInAbsoluteMode(position, suggestedTransformOrigin)
        return
      }
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
        let element = this.$refs.contentInner
        if (this.$refs.contentInner.$el) {
          element = this.$refs.contentInner.$el
        }
        if (this.widthMode === 'activator') {
          element.style.minWidth = activatorBoundingClientRect.width + 'px'
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
