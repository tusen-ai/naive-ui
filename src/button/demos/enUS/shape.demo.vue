<markdown>
# Shape

Buttons can have different shapes.
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
  <n-space>
    <n-button circle>
      <template #icon>
        <n-icon><CashIcon /></n-icon>
      </template>
    </n-button>
    <n-button round>
      Round
    </n-button>
    <n-button>Rect</n-button>
  </n-space>
</template>
