<template>
  <div class="n-alert">
    <div
      v-if="$slots.icon || icon"
      class="n-alert__icon"
    >
      <slot
        v-if="$slots.icon"
        name="icon"
      />
      <n-icon
        v-else-if="icon"
        size="24"
        :type="icon"
      />
    </div>
    <div class="n-alert__content">
      <slot />
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'
export default {
  name: 'NAlert',
  components: {
    NIcon
  },
  props: {
    icon: {
      type: String,
      default: null
    }
  }
}
</script>
