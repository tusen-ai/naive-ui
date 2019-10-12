<template>
  <div
    class="n-anchor-link"
  >
    <div
      ref="title"
      class="n-anchor-link__title"
      @click="handleClick"
    >
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NAnchorLink',
  inject: {
    NAnchor: {
      default: null
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick (e) {
      this.NAnchor.updateBarPosition(e.target)
    }
  }
}
</script>
