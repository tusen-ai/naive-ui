<markdown>
  # 气泡提示
</markdown>

<template>
  <div style="height: 200px; transform: translate(0)">
    <n-tooltip trigger="hover" placement="left">
      <template #trigger>
        <n-float-button :right="0" :bottom="0">
          <n-icon :size="24">
            <cash-icon />
          </n-icon>
        </n-float-button>
      </template>
      这个故事还没有完结
    </n-tooltip>
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
