<markdown>
# 操作
</markdown>

<template>
  <n-space>
    <n-popconfirm
      @positive-click="handlePositiveClick"
      @negative-click="handleNegativeClick"
    >
      <template #trigger>
        <n-button>引用</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>
    <n-popconfirm :negative-text="null" @positive-click="handlePositiveClick">
      <template #trigger>
        <n-button>只有确定</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>
    <n-popconfirm :positive-text="null" @negative-click="handleNegativeClick">
      <template #trigger>
        <n-button>只有取消</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>
    <n-popconfirm :positive-text="null" :negative-text="null">
      <template #trigger>
        <n-button>什么也没有</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>
    <n-popconfirm>
      <template #trigger>
        <n-button>自定义 action</n-button>
      </template>
      <template #action>
        自定义 action
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('是的')
      },
      handleNegativeClick () {
        message.info('并不')
      }
    }
  }
})
</script>
