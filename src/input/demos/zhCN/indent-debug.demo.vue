<markdown>
# 缩进debug

缩进debug。
</markdown>

<template>
  <n-space vertical>
    <n-input placeholder="自动调整尺寸" autosize style="min-width: 50%">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>

    <n-input type="textarea" placeholder="Default Textarea">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>

    <n-input type="textarea" autosize placeholder="AutoSize Textarea 1">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>

    <n-input
      type="textarea"
      :autosize="{ minRows: 2 }"
      placeholder="AutoSize Textarea 2"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
  </n-space>
</template>
<script lang="ts">
import { FlashOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {
      FlashOutline
    }
  }
})
</script>
