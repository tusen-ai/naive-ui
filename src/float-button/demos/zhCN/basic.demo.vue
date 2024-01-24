<markdown>
  # 基础用法
</markdown>

<template>
  <div style="height: 300px; transform: translate(0)">
    <n-float-button :right="100">
      <n-icon><cash-icon /></n-icon>
    </n-float-button>
  </div>
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
