import scrollDelegate from '../utils/delegate/scrollDelegate'
import resizeDelegate from '../utils/delegate/resizeDelegate'
import getParentNode from '../utils/dom/getParentNode'
import getScrollParent from '../utils/dom/getScrollParent'
import { getAdjustedPlacementOfTrackingElement, getTransformOriginByPlacement, getPosition } from '../utils/dom/calcPlacementTransform'

function getActivatorEl (componentInstance) {
  return componentInstance.$refs.activator.$el || componentInstance.$refs.activator
}

function getContentEl (componentInstance) {
  return componentInstance.$refs.content.$el || componentInstance.$refs.content
}

function getContentInner (contentInner) {
  if (contentInner) {
    let element = contentInner
    if (contentInner.$el) {
      element = contentInner.$el
    }
    return element
  }
}

function getActivatorBoundingClientRect (manuallyPositioned, x, y, trackedElement) {
  if (manuallyPositioned) {
    return {
      top: y,
      left: x,
      height: 0,
      width: 0,
      right: window.innerWidth - x,
      bottom: window.innerHeight - y
    }
  } else {
    let activatorRect = trackedElement.getBoundingClientRect()
    return {
      left: parseInt(activatorRect.left),
      top: parseInt(activatorRect.top),
      bottom: parseInt(window.innerHeight - activatorRect.bottom),
      right: parseInt(window.innerWidth - activatorRect.right),
      width: parseInt(activatorRect.width),
      height: parseInt(activatorRect.height)
    }
  }
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
    active (value) {
      if (value) {
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
      scrollListeners: [],
      adjustedPlacement: this.placement
    }
  },
  mounted () {
    this.registerScrollListeners()
    this.registerResizeListener()
    this.updatePosition()
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
    setTrackingElementPosition (position, transformOrigin) {
      this.trackingElement.style.position = 'absolute'
      this.trackingElement.style.top = position.top
      this.trackingElement.style.left = position.left
      this.trackingElement.style.right = position.right
      this.trackingElement.style.bottom = position.bottom
      this.trackingElement.style.transformOrigin = transformOrigin
      this.trackingElement.setAttribute('n-suggested-transform-origin', transformOrigin)
    },
    updatePosition (el, cb) {
      if (!this.active && !this.show) return
      this._getTrackingElement()
      if (this.manuallyPositioned) {
        if (!this.trackingElement) {
          console.error('[naive-ui/placeable/updatePosition]: trackingElement not found!')
          return
        }
      } else {
        this._getTrackedElement()
        if (!this.trackedElement || !this.trackingElement) {
          console.error('[naive-ui/placeable/updatePosition]: trakedElement or trackingElement not found!')
          return
        }
      }
      const activatorBoundingClientRect = getActivatorBoundingClientRect(this.manuallyPositioned, this.x, this.y, this.trackedElement)
      const contentBoundingClientRect = {
        width: this.trackingElement.offsetWidth,
        height: this.trackingElement.offsetHeight
      }
      const adjustedPlacement = getAdjustedPlacementOfTrackingElement(this.placement, activatorBoundingClientRect, contentBoundingClientRect, this.flip)
      const suggestedTransformOrigin = getTransformOriginByPlacement(adjustedPlacement)
      let position = getPosition(adjustedPlacement, activatorBoundingClientRect, contentBoundingClientRect)
      this.adjustedPlacement = adjustedPlacement
      if (this.positionModeisAbsolute) {
        position = getPositionInAbsoluteMode(this.placement, suggestedTransformOrigin)
      }
      this.setTrackingElementPosition(position, suggestedTransformOrigin)
      const contentInner = getContentInner(this.$refs.contentInner)
      if (this.widthMode === 'activator') {
        contentInner.style.minWidth = activatorBoundingClientRect.width + 'px'
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
