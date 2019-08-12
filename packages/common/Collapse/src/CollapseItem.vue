<template>
  <div
    class="n-collapse-item"
    :class="{
      'n-collapse-item--active': value
    }"
  >
    <div
      class="n-collapse-item__title"
      @click="handleTitleClick"
    >
      <n-icon type="ios-arrow-forward" />{{ title }}
    </div>
    <div
      ref="contentWrapper"
      class="n-collapse-item__content-wrapper"
    >
      <div
        ref="content"
        class="n-collapse-item__content-inner"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'

export default {
  name: 'NCollapseItem',
  components: {
    NIcon
  },
  props: {
    title: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (newValue) {
      if (newValue && this.$refs.contentWrapper && this.$refs.content) {
        this.$refs.contentWrapper.style.maxHeight = this.$refs.content.getBoundingClientRect().height + 'px'
      } else {
        this.$refs.contentWrapper.style.maxHeight = 0
      }
    }
  },
  mounted () {
    if (this.value && this.$refs.contentWrapper && this.$refs.content) {
      this.$refs.contentWrapper.style.maxHeight = this.$refs.content.getBoundingClientRect().height + 'px'
    } else {
      this.$refs.contentWrapper.style.maxHeight = 0
    }
  },
  methods: {
    handleTitleClick () {
      const newValue = !this.value
      this.$emit('input', newValue, this.name)
    }
  }
}
</script>
