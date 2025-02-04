<markdown>
# Disabled & Readonly

Inputs can also be disabled.
</markdown>

<script lang="ts">
import { FlashOutline } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      FlashOutline,
      disabled: ref(false),
      readonly: ref(false)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-input
      type="text"
      size="small"
      placeholder="Oops! It is disabled."
      round
      clearable
      :disabled="disabled"
      :readonly="readonly"
    />
    <n-input
      type="textarea"
      size="small"
      placeholder="Oops! It is disabled."
      round
      clearable
      :disabled="disabled"
      :readonly="readonly"
    />
    <n-input
      pair
      separator="to"
      :placeholder="['from', 'to']"
      clearable
      :disabled="disabled"
      :readonly="readonly"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-flex>
      <n-flex>Disabled <n-switch v-model:value="disabled" /> </n-flex>
      <n-flex>Readonly <n-switch v-model:value="readonly" /> </n-flex>
    </n-flex>
  </n-space>
</template>
