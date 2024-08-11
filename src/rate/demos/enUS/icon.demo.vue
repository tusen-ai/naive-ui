<markdown>
# Icon

The content of the default slot will be used as the icon.
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
