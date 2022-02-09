<markdown>
# 使用图标作为按钮

有时你可能会想用图标作为按钮并且自定义一些尺寸。这时你可以使用 `text` 按钮和 `font-size` 来进行设定。
</markdown>

<template>
  <n-button text style="font-size: 24px">
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>
