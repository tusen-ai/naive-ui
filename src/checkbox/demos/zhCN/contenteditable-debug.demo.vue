<markdown>
# Contenteditable Debug

Issue #7420: 点击复选框后，contenteditable 的 div 需要点击两次才能输入内容。

复现步骤：
1. 点击复选框
2. 点击下方的可编辑区域，尝试输入
3. 如果修复成功，应该只需要点击一次就能输入
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <n-space vertical>
    <n-checkbox v-model:checked="checked">
      点击我
    </n-checkbox>
    <div
      contenteditable="true"
      style="
        border: 1px solid #ccc;
        padding: 8px;
        min-height: 60px;
        border-radius: 4px;
      "
    >
      点击复选框后，再点击这里输入内容...
    </div>
  </n-space>
</template>
