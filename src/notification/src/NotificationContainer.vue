<template>
  <div
    class="n-notification-container"
    :class="{
      'n-notification-container--scrollable': scrollable
    }"
  >
    <n-scrollbar
      v-if="scrollable"
    >
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import { NScrollbar } from '../../scrollbar'

export default {
  name: 'NotificationContainer',
  components: {
    NScrollbar
  },
  props: {
    scrollable: {
      type: Boolean,
      required: true
    }
  }
}
</script>
