<markdown>
# 图标

在按钮上使用图标。
</markdown>

<template>
  <n-space>
    <n-button secondary strong>
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      +100 元
    </n-button>
    <n-button icon-placement="right" secondary strong>
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      +100 元
    </n-button>
  </n-space>
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
