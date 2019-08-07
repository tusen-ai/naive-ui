<template>
  <div
    class="n-tag"
    :class="{
      [`n-tag--${type}-type`]: type,
      'n-tag--closable': closable
    }"
  >
    <slot />
    <div
      v-if="closable"
      class="n-tag__close-mark"
      @click="handleClick"
    >
      <icon type="md-close" />
    </div>
  </div>
</template>

<script>
import Icon from '../../Icon'

export default {
  name: 'NTag',
  components: {
    Icon
  },
  props: {
    type: {
      validator (type) {
        return ['success', 'info', 'warning', 'error'].includes(type)
      },
      default: null
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('close')
    }
  }
}
</script>
