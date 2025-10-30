<markdown>
# 自定义 Action

有的时候你想自定义 `action` 和 `content`。
</markdown>

<script lang="ts" setup>
import { useDialog } from 'naive-ui'

const dialog = useDialog()

function handleButtonClick() {
  dialog.warning({
    title: '使用渲染函数',
    content: () => 'Content',
    action: () => 'Action'
  })
}
</script>

<template>
  <n-space>
    <n-button @click="handleButtonClick">
      使用渲染函数
    </n-button>
  </n-space>
</template>
