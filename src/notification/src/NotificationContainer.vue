<template>
  <div
    class="n-notification-container"
    :class="{
      'n-notification-container--scrollable': scrollable
    }"
  >
    <n-scrollbar
      v-if="scrollable"
      :unstable-theme="NNotificationProvider.mergedTheme.peers.Scrollbar"
      :unstable-theme-overrides="
        NNotificationProvider.mergedTheme.overrides.Scrollbar
      "
    >
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
import { NScrollbar } from '../../scrollbar'

export default defineComponent({
  name: 'NotificationContainer',
  components: {
    NScrollbar
  },
  props: {
    scrollable: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    return {
      NNotificationProvider: inject('NNotificationProvider')
    }
  }
})
</script>
