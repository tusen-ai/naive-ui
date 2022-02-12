<markdown>
# Content size

Text is resized to fit the avatar.
</markdown>

<template>
  <n-space vertical item-style="line-height: 0;">
    <n-space>
      <n-avatar>{{ value }}</n-avatar>
      <n-avatar round>
        {{ value }}
      </n-avatar>
    </n-space>
    <n-input v-model:value="value" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('Oasis')
    }
  }
})
</script>
