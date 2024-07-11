<markdown>
# 气泡提示
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
  <n-tooltip trigger="hover" placement="right">
    <template #trigger>
      <n-float-button position="relative">
        <n-icon>
          <CashIcon />
        </n-icon>
      </n-float-button>
    </template>
    这个故事还没有完结
  </n-tooltip>
</template>
