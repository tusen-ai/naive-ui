<template>
  <div
    class="n-anchor"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <div
      ref="slot"
      class="n-anchor-slot"
    />
    <div class="n-anchor-rail">
      <div
        ref="bar"
        class="n-anchor-rail__bar"
      />
    </div>
    <slot />
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NAnchor',
  mixins: [withapp, themeable],
  provide () {
    return {
      NAnchor: this
    }
  },
  mounted () {
  },
  methods: {
    updateBarPosition (linkTitleEl) {
      const {
        offsetHeight,
        offsetTop,
        offsetLeft,
        offsetWidth
      } = linkTitleEl
      const barEl = this.$refs.bar
      barEl.style.top = `${offsetTop}px`
      barEl.style.height = `${offsetHeight}px`
      const slotEl = this.$refs.slot
      slotEl.style.top = `${offsetTop}px`
      slotEl.style.height = `${offsetHeight}px`
      slotEl.style.maxWidth = `${offsetWidth + offsetLeft}px`
    }
  }
}
</script>
