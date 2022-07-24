<markdown>
# 自定义创建逻辑

使用 `on-create` 属性控制创建标签的逻辑。
</markdown>

<template>
  <n-dynamic-tags @create="handleCreate" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      handleCreate: (label: string) => {
        return (
          {
            0: '赋能',
            1: '打通',
            2: '闭环'
          }[Math.floor(Math.random() * 3)] + label
        )
      }
    }
  }
})
</script>
