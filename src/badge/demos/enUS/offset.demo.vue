<markdown>
# Offset
</markdown>

<template>
  <n-badge :value="value" :max="15" :offset="offset">
    <n-avatar />
  </n-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(5),
      offset: ref<[string | number, string | number]>(['10', '10'])
    }
  }
})
</script>
