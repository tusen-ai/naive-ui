<template>
  <div
    class="n-message__cell"
    :class="{
      [`n-message__cell--${type}`]: true
    }"
  >
    <div class="n-message-cell__icon">
      <n-icon
        v-if="icon"
        size="20"
        :type="icon"
      />
      <n-icon
        v-else-if="type === 'success'"
        size="20"
        type="md-checkmark-circle"
      />
      <n-icon
        v-else-if="type === 'error'"
        size="20"
        type="md-close-circle"
      />
      <n-icon
        v-else-if="type === 'info'"
        size="20"
        type="md-information-circle"
      />
      <n-icon
        v-else-if="type === 'warning'"
        size="20"
        type="md-alert"
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
    option: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    type () {
      return this.option.type
    },
    icon () {
      return this.option.icon
    }
  }
}
</script>
