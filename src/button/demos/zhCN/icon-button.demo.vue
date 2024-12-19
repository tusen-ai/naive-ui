<markdown>
# 使用图标作为按钮

有时你可能会想用图标作为按钮并且自定义一些尺寸。这时你可以使用 `text` 按钮和 `font-size` 来进行设定。
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
  <n-button text style="font-size: 24px">
    <n-icon>
      <CashIcon />
    </n-icon>
  </n-button>
</template>
