import resizeDelegate from '../../../_utils/delegate/resizeDelegate'

export default {
  name: 'WindowResizeObserver',
  props: {
    onResize: {
      type: Function,
      default: undefined
    }
  },
  mounted () {
    resizeDelegate.registerHandler(this.handleResize)
  },
  beforeUnmount () {
    resizeDelegate.unregisterHandler(this.handleResize)
  },
  methods: {
    handleResize () {
      const {
        onResize
      } = this
      if (onResize) onResize()
    }
  },
  render () {
    return null
  }
}
