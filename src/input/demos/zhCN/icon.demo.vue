<markdown>
# 前缀 & 后缀

在前缀后缀添加内容。
</markdown>

<template>
  <n-space vertical>
    <n-input placeholder="搜索">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-input round placeholder="100,000,000">
      <template #suffix>
        元
      </template>
    </n-input>
    <n-input round placeholder="搜索">
      <template #suffix>
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
