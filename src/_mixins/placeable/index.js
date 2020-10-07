import { nextTick } from 'vue'
import scrollDelegate from '../../_utils/delegate/scrollDelegate'
import resizeDelegate from '../../_utils/delegate/resizeDelegate'
import getScrollParent from '../../_utils/dom/getScrollParent'
import { warn } from '../../_utils/naive/warn'
import {
  getAdjustedPlacementOfTrackingElement,
  getTransformOriginByPlacement,
  getPosition
} from './calc-placement-transform'

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
function getViewBoundingRect () {
  const view = viewMeasurer.getBoundingClientRect()
  return {
    left: view.left,
    top: view.top,
    right: view.right,
    bottom: view.bottom,
    width: view.width,
    height: view.height
  }
}

function getActivatorRect (manuallyPositioned, x, y, trackedElement, viewRect) {
  if (manuallyPositioned) {
    return {
      top: y,
      left: x,
      height: 0,
      width: 0,
      right: viewRect.width - x,
      bottom: viewRect.height - y
    }
  } else {
    const triggerRect = trackedElement.getBoundingClientRect()
    return {
      left: triggerRect.left - viewRect.left,
      top: triggerRect.top - viewRect.top,
      bottom: viewRect.height + viewRect.top - triggerRect.bottom,
      right: viewRect.width + viewRect.left - triggerRect.right,
      width: triggerRect.width,
      height: triggerRect.height
    }
  }
}

// dependencies:
// methods.__placeableTracking
// methods.__placeableTracked
// methods.__placeableBody
// methods.__placeableOffsetContainer
// data.__placeableEnabled
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
    flip: {
      type: Boolean,
      default: true
    },
    widthMode: {
      validator (value) {
        return ['self', 'trigger'].includes(value)
      },
      default: 'self'
    },
    manuallyPositioned: {
      type: Boolean,
      default: false
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
  watch: {
    __placeableEnabled (value) {
      if (value) {
        if (!this.__placeableListenerAdded && !this.manuallyPositioned) {
          this.__addScrollListeners()
          this.__addResizeListener()
          this.__placeableListenerAdded = true
        }
        nextTick(this.__placeableSyncPosition)
      }
    },
    x () {
      nextTick(this.__placeableSyncPosition)
    },
    y () {
      nextTick(this.__placeableSyncPosition)
    }
  },
  data () {
    return {
      __placeableScrollListeners: [],
      __placeableAdjustedPlacement: this.placement,
      __placeableListenerAdded: false
    }
  },
  mounted () {
    if (this.__placeableEnabled) {
      if (!this.manuallyPositioned) {
        this.__addScrollListeners()
        this.__addResizeListener()
        this.__placeableListenerAdded = true
      }
      this.__placeableSyncPosition()
    }
  },
  beforeUnmount () {
    if (this.__placeableListenerAdded) {
      this.__removeScrollListeners()
      this.__removeResizeListener()
    }
  },
  created: __DEV__ ? function () {
    [
      '__placeableOffsetContainer',
      '__placeableTracking',
      '__placeableTracked',
      '__placeableBody'
    ].forEach(key => {
      if (!this[key]) {
        warn('mixins/placeable', `\`${key}\` is not defined.`)
      }
    })
  } : undefined,
  methods: {
    __placeableSyncPosition () {
      if (!this.__placeableEnabled) {
        return
      }
      const trackingElement = this.__getTrackingElement()
      let trackedElement = null
      trackingElement.style.position = 'absolute'
      if (this.manuallyPositioned) {
        if (__DEV__ && !trackingElement) {
          warn('mixins/placeable', 'Tracking element not found.')
          return
        }
      } else {
        trackedElement = this.__getTrackedElement()
        if (__DEV__ && (!trackedElement || !trackingElement)) {
          warn('mixins/placeable', 'Traked element or tracking element not found.')
          return
        }
      }
      const viewRect = getViewBoundingRect()
      const triggerRect = getActivatorRect(this.manuallyPositioned, this.x, this.y, trackedElement, viewRect)
      const {
        widthMode
      } = this
      if (
        (widthMode === 'trigger' || widthMode === 'activator')
      ) {
        const body = this.__getBodyElement()
        body.style.minWidth = triggerRect.width + 'px'
      }
      let adjustedPlacement = this.placement
      let contentBoundingClientRect = null
      if (this.flip) {
        contentBoundingClientRect = {
          width: trackingElement.offsetWidth,
          height: trackingElement.offsetHeight
        }
        adjustedPlacement = getAdjustedPlacementOfTrackingElement(this.placement, triggerRect, contentBoundingClientRect, true)
      }
      const suggestedTransformOrigin = getTransformOriginByPlacement(adjustedPlacement)
      let offset = null
      this.__placeableAdjustedPlacement = adjustedPlacement
      const offsetContainer = this.__getOffsetContainer()
      offset = getPosition(
        adjustedPlacement,
        offsetContainer.getBoundingClientRect(),
        triggerRect
      )
      this.__setOffset(offset, suggestedTransformOrigin)
    },
    __getTrackingElement () {
      const { __placeableTracking } = this
      if (__placeableTracking) {
        const el = __placeableTracking()
        return el.$el || el
      } else if (__DEV__) {
        warn('mixins/placeable', 'No tracking element getter.')
      }
    },
    __getTrackedElement () {
      const { __placeableTracked } = this
      if (__placeableTracked) {
        const el = __placeableTracked()
        return el.$el || el
      } else if (__DEV__) {
        warn('mixins/placeable', 'No tracked element getter.')
      }
    },
    __getBodyElement () {
      const { __placeableBody } = this
      if (__placeableBody) {
        const el = __placeableBody()
        return el.$el || el
      } else if (__DEV__) {
        warn('mixins/placeable', 'No body element getter.')
      }
    },
    __getOffsetContainer () {
      const __placeableOffsetContainer = this.__placeableOffsetContainer
      if (__placeableOffsetContainer) {
        const el = __placeableOffsetContainer()
        return el.$el || el
      } else if (__DEV__) {
        warn('mixins/placeable', 'No offset container getter.')
      }
    },
    __setOffset (position, transformOrigin) {
      const el = this.__getTrackingElement()
      el.style.position = 'absolute'
      el.style.top = position.top
      el.style.left = position.left
      el.style.right = position.right
      el.style.bottom = position.bottom
      el.style.transform = position.transform
      el.style.transformOrigin = transformOrigin
      el.setAttribute('n-suggested-transform-origin', transformOrigin)
    },
    __addResizeListener () {
      resizeDelegate.registerHandler(this.__placeableSyncPosition)
    },
    __addScrollListeners () {
      let currentElement = this.__getTrackedElement()
      while (true) {
        currentElement = getScrollParent(currentElement)
        if (currentElement === null) break
        this.__placeableScrollListeners.push([currentElement, this.__placeableSyncPosition])
      }
      for (const [el, handler] of this.__placeableScrollListeners) {
        scrollDelegate.registerHandler(el, handler)
      }
    },
    __removeResizeListener () {
      resizeDelegate.unregisterHandler(this.__placeableSyncPosition)
    },
    __removeScrollListeners () {
      for (const [el, handler] of this.__placeableScrollListeners) {
        scrollDelegate.unregisterHandler(el, handler)
      }
      this.__placeableScrollListeners = []
    }
  }
}
