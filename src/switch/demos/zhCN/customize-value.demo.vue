<markdown>
# 自定义选中的值

使用 `checked-value` 和 `unchecked-value` 制定选中的值。
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleUpdateValue(value: string) {
        message.info(value)
      }
    }
  }
})
</script>

<template>
  <n-switch
    checked-value="周末加班"
    unchecked-value="周末支持一下"
    @update:value="handleUpdateValue"
  />
</template>
