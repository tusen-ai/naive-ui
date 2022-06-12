<markdown>
# Timezone debug
</markdown>

<template>
  <button @click="toggle">
    toggle
  </button>
  {{ tz }} <n-time-picker :time-zone="tz" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const tz = ref('Asia/Shanghai')
    return {
      tz,
      toggle: () => {
        if (tz.value === 'Asia/Shanghai') {
          tz.value = 'America/New_York'
        } else {
          tz.value = 'Asia/Shanghai'
        }
      }
    }
  }
})
</script>
