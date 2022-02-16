<markdown>
# Use icons as buttons

Sometimes you may want to use an icon as a button and customize its size. You can use the `text` prop and `font-size` style to set it.
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
