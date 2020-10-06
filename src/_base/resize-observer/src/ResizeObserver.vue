<template>
  <slot />
</template>

<script>
import resizeObserverDelegate from '../../../_utils/delegate/resizeObserverDelegate'
import { warn } from '../../../_utils/naive'

export default {
  name: 'ResizeObserver',
  props: {
    onResize: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      registered: false
    }
  },
  mounted () {
    const el = this.$el
    if (!el) {
      if (__DEV__) {
        warn('resize-observer', '$el does not exist.')
      }
    } else if (el.nextElementSibling !== el.nextSibling) {
      if (__DEV__) {
        warn('resize-observer', '$el can not be observed (it may be a text node).')
      }
    } else {
      resizeObserverDelegate.registerHandler(el.nextElementSibling, this.handleResize)
      this.registered = true
    }
  },
  beforeUnmount () {
    if (this.registered) {
      resizeObserverDelegate.unregisterHandler(this.$el.nextElementSibling)
    }
  },
  methods: {
    handleResize () {
      const {
        onResize
      } = this
      if (onResize) onResize()
    }
  }
}
</script>
