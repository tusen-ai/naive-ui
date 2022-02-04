<markdown>
# 禁用

文本输入可以被禁用。
</markdown>

<template>
  <n-space vertical>
    <n-input
      type="text"
      size="small"
      placeholder="噢！它被禁用了。"
      :disabled="!active"
      round
    />
    <n-input
      type="textarea"
      size="small"
      placeholder="噢！它被禁用了。"
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
