<markdown>
# 图标

在按钮上使用图标，可以使用 `icon` 属性或 `icon` 插槽。
</markdown>

<template>
  <n-space>
    <n-button secondary strong :icon="CashIcon">
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
  },
  setup () {
    return {
      CashIcon
    }
  }
})
</script>
