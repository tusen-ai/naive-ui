import scrollDelegate from '../utils/scrollDelegate'
import resizeDelegate from '../utils/resizeDelegate'
import getParentNode from '../utils/dom/getParentNode'
import getScrollParent from '../utils/dom/getScrollParent'
import calcPlacementTransfrom from '../utils/dom/calcPlacementTransform'

/**
 * Make $refs.content trace $refs.activator, set $refs.contentInner width by the way
 *
 * Dependency:
 * $refs.activator
 * $refs.content
 * $refs.contentInner(optional)
 *
 * @prop {string} placement determine where should $refs.content be put
 * @prop {string} widthMode determine how width is $refs.contentInner
 */
export default {
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
    widthMode: {
      validator (value) {
        return ['self', 'activator'].includes(value)
      },
      default: 'self'
    }
  },
  watch: {
    active (newValue) {
      if (newValue) {
        this.$nextTick().then(this.updatePosition)
      }
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.registerScrollListeners()
      this.registerResizeListener()
    })
  },
  beforeDestroy () {
    this.unregisterScrollListeners()
    this.unregisterResizeListener()
  },
  data () {
    return {
      scrollListeners: []
    }
  },
  methods: {
    updatePosition () {
      // console.log('scroll')
      if (!this.active) return
      const activatorBoundingClientRect = this.$refs.activator.getBoundingClientRect()
      // console.log(this.$refs.popoverBody)
      // debugger
      const contentBoundingClientRect = this.$refs.content.getBoundingClientRect()
      // console.log(contentBoundingClientRect)
      // debugger
      // console.log('scroll', activatorBoundingClientRect, contentBoundingClientRect)
      this.$refs.content.style = calcPlacementTransfrom(this.placement, activatorBoundingClientRect, contentBoundingClientRect)
      if (this.widthMode === 'activator' && this.$refs.contentInner) {
        this.$refs.contentInner.style.minWidth = activatorBoundingClientRect.width + 'px'
      }
    },
    registerResizeListener () {
      resizeDelegate.registerHandler(this.updatePosition)
    },
    registerScrollListeners () {
      let currentElement = this.$el
      while (true) {
        currentElement = getScrollParent(currentElement)
        this.scrollListeners.push([currentElement, this.updatePosition])
        currentElement = getParentNode(currentElement)
        if (currentElement === document.body || currentElement.nodeName === 'HTML') {
          break
        }
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
