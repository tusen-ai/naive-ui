<markdown>
# 分隔符

在 `multiple` 模式下配置 `separators`，当输入或粘贴内容包含分隔符时，会按分隔符立即拆分并尝试选中（`tag` 模式会创建）。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const tagValue = ref<Array<string | number>>([])
const selectValue = ref<Array<string | number>>([])

const options = [
  { label: '123', value: 'xxx' },
  { label: '456', value: 'yyy' }
]
</script>

<template>
  <n-space vertical>
    <n-text>输入或粘贴：aa;bb;cc</n-text>
    <n-select
      v-model:value="tagValue"
      filterable
      tag
      multiple
      :separators="[';']"
      placeholder="输入或粘贴：aa;bb;cc"
      :show-arrow="false"
      :options="options"
    />
    <n-text>输入或粘贴：123,456;</n-text>
    <n-select
      v-model:value="selectValue"
      multiple
      filterable
      :options="options"
      :separators="[';', ',']"
      placeholder="输入或粘贴：123,456;"
    />
  </n-space>
</template>
