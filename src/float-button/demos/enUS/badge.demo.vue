<markdown>
  # 基础用法

  跟 BackTop 很像
  </markdown>

<template>
  <n-float-button :right="160">
    <n-icon><cash-icon /></n-icon>
  </n-float-button>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>
