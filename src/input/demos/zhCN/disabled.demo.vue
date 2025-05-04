<markdown>
# 禁用 & 只读

文本输入可以被禁用。
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
      placeholder="噢！它被禁用了。"
      round
      clearable
      :disabled="disabled"
      :readonly="readonly"
    />
    <n-input
      type="textarea"
      size="small"
      placeholder="噢！它被禁用了。"
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
      <n-flex>禁用 <n-switch v-model:value="disabled" /> </n-flex>
      <n-flex>只读 <n-switch v-model:value="readonly" /> </n-flex>
    </n-flex>
  </n-space>
</template>
