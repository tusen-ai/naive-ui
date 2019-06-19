<template>
  <div
    class="n-message__cell"
    :class="{
      [`n-message__cell--${type}`]: true
    }"
  >
    <div class="n-message-cell__icon">
      <n-icon
        v-if="type === 'success'"
        type="md-checkmark-circle"
      />
      <n-icon
        v-else-if="type === 'error'"
        type="md-close-circle"
      />
    </div>
    <div class="n-message-cell__content">
      {{ content }}
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'

export default {
  components: {
    NIcon
  },
  props: {
    type: {
      type: String,
      default: 'success'
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
