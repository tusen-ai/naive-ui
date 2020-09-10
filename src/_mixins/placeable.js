import { nextTick } from 'vue'
import scrollDelegate from '../_utils/delegate/scrollDelegate'
import resizeDelegate from '../_utils/delegate/resizeDelegate'
import getScrollParent from '../_utils/dom/getScrollParent'
import {
  getAdjustedPlacementOfTrackingElement,
  getTransformOriginByPlacement,
  getPosition
} from '../_utils/dom/calcPlacementTransform'

let viewMeasurerInitialized = false
let viewMeasurer = null

if (!viewMeasurerInitialized) {
  viewMeasurer = document.getElementById('n-view-measurer')
  if (!viewMeasurer) {
    viewMeasurer = document.createElement('div')
    viewMeasurer.id = 'n-view-measurer'
    viewMeasurer.style = `
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      top: 0 !important;
      bottom: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    `
    document.body.appendChild(viewMeasurer)
  }
  viewMeasurerInitialized = true
}

function getActivatorEl (refs) {
  return refs.activator.$el || refs.activator
}

function getContentEl (refs) {
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

function getActivatorRect (placeableManuallyPositioned, x, y, trackedElement, viewBoundingRect) {
  if (placeableManuallyPositioned) {
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

/**
 * Make $refs.content trace $refs.activator, set $refs.contentInner width by the way
 *
 * Dependency:
 * $refs.activator
 * $refs.content
 * $refs.contentInner(optional)
 * $vm.placeableEnabled
 *
 * @prop {string} placement determine where should $refs.content be put
 * @prop {string} widthMode determine how width is $refs.contentInner
 */
export default {
  inject: {
    NModal: {
      default: null
    },
    NDrawer: {
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
      if (this.NDrawer) {
        return 'absolute'
      }
      return 'fixed'
    },
    positionModeisAbsolute () {
      return this.syntheticPositionMode === 'absolute'
    }
  },
  watch: {
    placeableEnabled (value) {
      if (value) {
        if (!this.listenersRegistered && !this.placeableManuallyPositioned) {
          this.registerScrollListeners()
          this.registerResizeListener()
          this.listenersRegistered = true
        }
        nextTick(this.placeableSyncPosition)
      }
    },
    x () {
      nextTick(this.placeableSyncPosition)
    },
    y () {
      nextTick(this.placeableSyncPosition)
    }
  },
  data () {
    return {
      trackingElement: null,
      trackedElement: null,
      scrollListeners: [],
      adjustedPlacement: this.placement,
      listenersRegistered: false
    }
  },
  mounted () {
    if (this.placeableEnabled) {
      if (!this.placeableManuallyPositioned) {
        this.registerScrollListeners()
        this.registerResizeListener()
        this.listenersRegistered = true
      }
      this.placeableSyncPosition()
    }
  },
  beforeDestroy () {
    if (this.listenersRegistered) {
      this.unregisterScrollListeners()
      this.unregisterResizeListener()
    }
  },
  methods: {
    _placeableGetTrackingElement () {
      const refs = this.$refs
      if (refs && refs.content) {
        return getContentEl(refs)
      }
      const placeableGetTrackingElement = this.placeableGetTrackingElement
      if (placeableGetTrackingElement) {
        return placeableGetTrackingElement()
      }
    },
    _placeableGetTrackedElement () {
      const refs = this.$refs
      if (refs && refs.activator) {
        return getActivatorEl(refs)
      }
      const placeableGetTrackedElement = this.placeableGetTrackedElement
      if (placeableGetTrackedElement) {
        return placeableGetTrackedElement()
      }
    },
    _placeableGetAbsoluteOffsetContainer () {
      const placeableGetAbsoluteOffsetContainer = this.placeableGetAbsoluteOffsetContainer
      if (placeableGetAbsoluteOffsetContainer) {
        return placeableGetAbsoluteOffsetContainer()
      } else {
        const container = this.$refs.contentContainer
        if (container) {
          return container
        } else {
          console.error('[naive-ui/placeable]: absolute offset container not found')
        }
      }
    },
    setOffsetOfTrackingElement (position, transformOrigin) {
      const trackingElement = this._placeableGetTrackingElement()
      trackingElement.style.position = 'absolute'
      trackingElement.style.top = position.top
      trackingElement.style.left = position.left
      trackingElement.style.right = position.right
      trackingElement.style.bottom = position.bottom
      trackingElement.style.transform = position.transform
      trackingElement.style.transformOrigin = transformOrigin
      trackingElement.setAttribute('n-suggested-transform-origin', transformOrigin)
    },
    placeableSyncPosition () {
      if (!this.placeableEnabled) {
        return
      }
      const trackingElement = this._placeableGetTrackingElement()
      let trackedElement = null
      trackingElement.style.position = 'absolute'
      if (this.placeableManuallyPositioned) {
        if (!trackingElement) {
          console.error('[naive-ui/mixins/placeable]: trackingElement not found.')
          return
        }
      } else {
        trackedElement = this._placeableGetTrackedElement()
        if (!trackedElement || !trackingElement) {
          console.error('[naive-ui/mixins/placeable]: trakedElement or trackingElement not found.')
          return
        }
      }
      const viewBoundingRect = getViewBoundingRect()
      const activatorRect = getActivatorRect(this.placeableManuallyPositioned, this.x, this.y, trackedElement, viewBoundingRect)
      const contentInner = getContentInner(this)
      if (this.widthMode === 'activator' && contentInner) {
        contentInner.style.minWidth = activatorRect.width + 'px'
      }
      let adjustedPlacement = this.placement
      let contentBoundingClientRect = null
      if (this.zindexableFlip) {
        contentBoundingClientRect = {
          width: trackingElement.offsetWidth,
          height: trackingElement.offsetHeight
        }
        adjustedPlacement = getAdjustedPlacementOfTrackingElement(this.placement, activatorRect, contentBoundingClientRect, true)
      }
      const suggestedTransformOrigin = getTransformOriginByPlacement(adjustedPlacement)
      let offset = null
      this.adjustedPlacement = adjustedPlacement
      if (this.positionModeisAbsolute) {
        const absoluteOffsetContainer = this._placeableGetAbsoluteOffsetContainer()
        if (absoluteOffsetContainer) {
          offset = getPosition(
            adjustedPlacement,
            absoluteOffsetContainer.getBoundingClientRect(),
            activatorRect
          )
        }
      } else {
        offset = getPosition(adjustedPlacement, viewBoundingRect, activatorRect)
      }
      this.setOffsetOfTrackingElement(offset, suggestedTransformOrigin)
    },
    registerResizeListener () {
      resizeDelegate.registerHandler(this.placeableSyncPosition)
    },
    registerScrollListeners () {
      let currentElement = this._placeableGetTrackedElement()
      while (true) {
        currentElement = getScrollParent(currentElement)
        if (currentElement === null) break
        this.scrollListeners.push([currentElement, this.placeableSyncPosition])
      }
      for (const [el, handler] of this.scrollListeners) {
        scrollDelegate.registerHandler(el, handler)
      }
    },
    unregisterResizeListener () {
      resizeDelegate.unregisterHandler(this.placeableSyncPosition)
    },
    unregisterScrollListeners () {
      for (const [el, handler] of this.scrollListeners) {
        scrollDelegate.unregisterHandler(el, handler)
      }
      this.scrollListeners = []
    }
  }
}
