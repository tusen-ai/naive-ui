<markdown>
# Timezone debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tz = ref('Asia/Shanghai')

function toggle() {
  if (tz.value === 'Asia/Shanghai') {
    tz.value = 'America/New_York'
  }
  else {
    tz.value = 'Asia/Shanghai'
  }
}
</script>

<template>
  <button @click="toggle">
    toggle
  </button>
  {{ tz }} <n-time-picker :time-zone="tz" />
</template>
