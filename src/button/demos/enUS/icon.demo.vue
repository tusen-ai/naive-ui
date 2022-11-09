<markdown>
# Icon

Icons can be used in buttons, can use `icon` prop or `icon` slot.
</markdown>

<template>
  <n-space>
    <n-button :icon="CashIcon">
      +100$
    </n-button>
    <n-button icon-placement="right">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      +100$
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
