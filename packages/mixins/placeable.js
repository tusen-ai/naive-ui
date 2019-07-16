import scrollDelegate from '../utils/scrollDelegate'
import resizeDelegate from '../utils/resizeDelegate'
import getParentNode from '../utils/dom/getParentNode'
import getScrollParent from '../utils/dom/getScrollParent'
import calcPlacementTransfrom from '../utils/dom/calcPlacementTransform'

/**
 * Make $refs.content trace $refs.activator
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
    }
  },
  watch: {
    active (newValue) {
      console.log(newValue)
      this.$nextTick().then(this.updatePosition)
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
      this.activatorBoundingClientRect = this.$refs.activator.getBoundingClientRect()
      // console.log(this.$refs.popoverBody)
      // debugger
      this.contentBoundingClientRect = this.$refs.content.getBoundingClientRect()
      // console.log(this.contentBoundingClientRect)
      // debugger
      // console.log('scroll', this.activatorBoundingClientRect, this.contentBoundingClientRect)
      this.$refs.content.style = calcPlacementTransfrom(this.placement, this.activatorBoundingClientRect, this.contentBoundingClientRect)
    },
    registerResizeListener () {
      resizeDelegate.registerHandler(this.updatePosition)
    },
    registerScrollListeners () {
      let currentElement = this.$refs.self
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
