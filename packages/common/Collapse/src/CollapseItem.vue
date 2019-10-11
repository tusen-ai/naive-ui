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
    <transition
      name="n-fade-in-height-expand"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
    >
      <div
        v-if="value"
        ref="contentContainer"
        class="n-collapse-item__content-wrapper"
      >
        <div
          ref="content"
          class="n-collapse-item__content-inner"
        >
          <slot />
        </div>
      </div>
    </transition>
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
  methods: {
    handleEnter () {
      this.$refs.contentContainer.style.maxHeight = 0
      this.$el.getBoundingClientRect()
      this.$refs.contentContainer.style.maxHeight = this.$refs.content.offsetHeight + 'px'
    },
    handleAfterEnter () {
      this.$refs.contentContainer.style.maxHeight = null
    },
    handleLeave () {
      this.$refs.contentContainer.style.maxHeight = this.$refs.content.offsetHeight + 'px'
      this.$el.getBoundingClientRect()
      this.$refs.contentContainer.style.maxHeight = 0
    },
    handleTitleClick () {
      const newValue = !this.value
      this.$emit('input', newValue, this.name)
    }
  }
}
</script>
