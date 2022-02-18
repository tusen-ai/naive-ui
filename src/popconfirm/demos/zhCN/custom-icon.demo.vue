<markdown>
# 自定义图标
</markdown>

<template>
  <n-popconfirm positive-text="ok" negative-text="not ok">
    <template #icon>
      <n-icon color="red">
        <hand-icon />
      </n-icon>
    </template>
    <template #trigger>
      <n-button>退出游戏</n-button>
    </template>
    不充钱怎么变强？
  </n-popconfirm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MdHand as HandIcon } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    HandIcon
  }
})
</script>
