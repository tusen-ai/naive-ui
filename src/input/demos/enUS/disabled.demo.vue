<markdown>
# Disabled

Inputs can also be disabled.
</markdown>

<template>
  <n-space vertical>
    <n-input
      type="text"
      size="small"
      placeholder="Oops! It is disabled."
      :disabled="!active"
      round
    />
    <n-input
      type="textarea"
      size="small"
      placeholder="Oops! It is disabled."
      :disabled="!active"
      round
    />
    <n-input pair separator="to" clearable :disabled="!active">
      <template #affix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      FlashOutline,
      active: ref(false)
    }
  }
})
</script>
