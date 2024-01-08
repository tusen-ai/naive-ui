<markdown>
# 基础用法

模态框的基础用法，你可以把任何东西放进去，比如一个卡片。
</markdown>

<template>
  <n-button @click="handleClick">
    来吧
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModal } from 'naive-ui'

export default defineComponent({
  setup () {
    const modal = useModal()
    console.log(modal)

    const handleClick = () => {
      modal.create({
        title: '模态框',
        content: '内容'
      })
    }

    return {
      handleClick
    }
  }
})
</script>
