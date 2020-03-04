import scrollDelegate from '../_utils/delegate/scrollDelegate'
import resizeDelegate from '../_utils/delegate/resizeDelegate'
import getParentNode from '../_utils/dom/getParentNode'
import getScrollParent from '../_utils/dom/getScrollParent'
import {
  getAdjustedPlacementOfTrackingElement,
  getTransformOriginByPlacement,
  getPosition
} from '../_utils/dom/calcPlacementTransform'

let viewMeasurerInitialized = false
let viewMeasurer = null

if (!viewMeasurerInitialized && !document.getElementById('n-view-measurer')) {
  viewMeasurer = document.createElement('div')
  viewMeasurer.id = 'n-view-measurer'
  viewMeasurer.style = `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    visibility: hidden;
  `
  viewMeasurerInitialized = true
  document.body.appendChild(viewMeasurer)
}

function getActivatorEl (componentInstance) {
  const refs = componentInstance.$refs
  return refs.activator.$el || refs.activator
}

function getContentEl (componentInstance) {
  const refs = componentInstance.$refs
  return refs.content.$el || refs.content
}

function getContentInner (instance) {
  const contentInnerRef = instance.$refs.contentInner
  return (contentInnerRef && contentInnerRef.$el) || contentInnerRef || null
}

function getViewBoundingRect () {
  const containerBoundingRect = viewMeasurer.getBoundingClientRect()
  return {
    left: containerBoundingRect.left,
    top: containerBoundingRect.top,
    right: containerBoundingRect.right,
    bottom: containerBoundingRect.bottom,
    width: containerBoundingRect.width,
    height: containerBoundingRect.height
  }
}

function getActivatorRect (manuallyPositioned, x, y, trackedElement, viewBoundingRect) {
  if (manuallyPositioned) {
    return {
      top: y,
      left: x,
      height: 0,
      width: 0,
      right: viewBoundingRect.width - x,
      bottom: viewBoundingRect.height - y
    }
  } else {
    const activatorRect = trackedElement.getBoundingClientRect()
    return {
      left: activatorRect.left - viewBoundingRect.left,
      top: activatorRect.top - viewBoundingRect.top,
      bottom: viewBoundingRect.height + viewBoundingRect.top - activatorRect.bottom,
      right: viewBoundingRect.width + viewBoundingRect.left - activatorRect.right,
      width: activatorRect.width,
      height: activatorRect.height
    }
  }
}

function getPositionInAbsoluteMode (placement) {
  const position = {
    top: null,
    bottom: null,
    left: null,
    right: null
  }
  if (placement === 'bottom-start') {
    position.top = '100%'
    position.left = '0'
  } else if (placement === 'bottom-end') {
    position.top = '100%'
    position.right = '0'
  } else if (placement === 'top-start') {
    position.bottom = '100%'
    position.left = '0'
  } else if (placement === 'top-end') {
    position.bottom = '100%'
    position.right = '0'
  } else if (placement === 'right-start') {
    position.top = '0'
    position.left = '100%'
  } else if (placement === 'right-end') {
    position.bottom = '0'
    position.left = '100%'
  } else if (placement === 'left-start') {
    position.top = '0'
    position.right = '100%'
  } else if (placement === 'left-end') {
    position.bottom = '0'
    position.right = '100%'
  } else {
    console.error(
      '[naive-ui/mixins/placeable]: Placement %s is not supported.',
      placement
    )
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
  inject: {
    NModal: {
      default: null
    }
  },
  props: {
    positionMode: {
      default: null,
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
    syntheticPositionMode () {
      const positionMode = this.positionMode
      if (positionMode !== null) {
        return positionMode
      }
      if (this.NModal) {
        return 'absolute'
      }
      return 'fixed'
    },
    positionModeisAbsolute () {
      return this.syntheticPositionMode === 'absolute'
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
      const refs = this.$refs
      if (refs && refs.content) {
        this.trackingElement = getContentEl(this)
      } else if (this.getTrackingElement) {
        this.trackingElement = this.getTrackingElement()
      }
    },
    _getTrackedElement () {
      const refs = this.$refs
      if (refs && refs.activator) {
        this.trackedElement = getActivatorEl(this)
      } else if (this.getTrackedElement) {
        this.trackedElement = this.getTrackedElement()
      }
    },
    setOffsetOfTrackingElement (position, transformOrigin) {
      this.trackingElement.style.position = 'absolute'
      this.trackingElement.style.top = position.top
      this.trackingElement.style.left = position.left
      this.trackingElement.style.right = position.right
      this.trackingElement.style.bottom = position.bottom
      this.trackingElement.style.transformOrigin = transformOrigin
      this.trackingElement.setAttribute('n-suggested-transform-origin', transformOrigin)
    },
    updatePosition (el, cb) {
      if (!this.active) {
        if (!this.keepPlaceableTracingWhenInactive) return
      }
      if (this.active) {
        if (this.disablePlaceableTracingWhenActive) return
      }
      this._getTrackingElement()
      this.trackingElement.style.position = 'absolute'
      if (this.manuallyPositioned) {
        if (!this.trackingElement) {
          console.error('[naive-ui/mixins/placeable]: trackingElement not found.')
          return
        }
      } else {
        this._getTrackedElement()
        if (!this.trackedElement || !this.trackingElement) {
          console.error('[naive-ui/mixins/placeable]: trakedElement or trackingElement not found.')
          return
        }
      }
      // debugger
      const viewBoundingRect = getViewBoundingRect()
      const activatorRect = getActivatorRect(this.manuallyPositioned, this.x, this.y, this.trackedElement, viewBoundingRect)
      const contentInner = getContentInner(this)
      if (this.widthMode === 'activator' && contentInner) {
        contentInner.style.minWidth = activatorRect.width + 'px'
      }
      const contentBoundingClientRect = {
        width: this.trackingElement.offsetWidth,
        height: this.trackingElement.offsetHeight
      }
      // console.log('activatorRect', activatorRect)
      // console.log('contentBoundingClientRect', contentBoundingClientRect)
      const adjustedPlacement = getAdjustedPlacementOfTrackingElement(this.placement, activatorRect, contentBoundingClientRect, this.flip)
      const suggestedTransformOrigin = getTransformOriginByPlacement(adjustedPlacement)
      let offset = getPosition(adjustedPlacement, activatorRect, contentBoundingClientRect)
      this.adjustedPlacement = adjustedPlacement
      if (this.positionModeisAbsolute) {
        offset = getPositionInAbsoluteMode(adjustedPlacement)
      }
      this.setOffsetOfTrackingElement(offset, suggestedTransformOrigin)
      if (el && cb) {
        cb(el, activatorRect, contentBoundingClientRect)
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
