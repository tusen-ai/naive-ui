<template>
  <div
    class="n-button"
    :class="{
      'is-round': round,
      [`is-${type}`]: true,
      [`n-button--${size}-size`]: true
    }"
    v-on="$listeners"
  >
    <div
      v-if="icon"
      class="n-button__icon"
    >
      <n-icon :type="icon" />
    </div>
    <div class="n-button__content">
      <slot />
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'

export default {
  name: 'NButton',
  components: {
    NIcon
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: null
    }
  }
}
</script>
