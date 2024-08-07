<markdown>
# 图标

默认插槽的内容会被用作图标。
</markdown>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>

<template>
  <n-rate>
    <n-icon size="20">
      <CashIcon />
    </n-icon>
  </n-rate>
</template>
