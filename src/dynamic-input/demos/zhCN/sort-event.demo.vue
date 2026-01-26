<markdown>
# 排序事件回调
使用 `on-sort` 监听排序操作。
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const value = ref(['Apple', 'Banana', 'Cherry', 'Date'])

function handleSort(from: number, to: number) {
  message.info(`从索引 ${from} 移动到 ${to}`)
}
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    show-sort-button
    placeholder="请输入"
    @sort="handleSort"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
