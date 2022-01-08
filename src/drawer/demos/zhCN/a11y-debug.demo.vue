<markdown>
# A11y debug
</markdown>

<template>
  <n-button @click="handleClick">
    Trigger
  </n-button>
  <n-drawer v-model:show="active" :width="502">
    <n-input />
    <n-input />
    <n-input />
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const activeRef = ref(false)
    return {
      active: activeRef,
      handleClick () {
        activeRef.value = !activeRef.value
      }
    }
  }
})
</script>
