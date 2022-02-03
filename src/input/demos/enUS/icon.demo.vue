<markdown>
# Prefix & suffix

Set a prefix and/or suffix for the input.
</markdown>

<template>
  <n-space vertical>
    <n-input placeholder="Flash">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-input round placeholder="1,400,000">
      <template #suffix>
        $
      </template>
    </n-input>
    <n-input round placeholder="Flash">
      <template #suffix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      FlashOutline
    }
  }
})
</script>
