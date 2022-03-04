<markdown>
# Customize icon
</markdown>

<template>
  <n-collapse>
    <template #header-extra>
      <n-icon><cash-icon /></n-icon>
    </template>
    <template #arrow>
      <n-icon>
        <cash-icon />
      </n-icon>
    </template>
    <n-collapse-item title="Bronze" name="1">
      <div>good</div>
    </n-collapse-item>
    <n-collapse-item title="Silver" name="2">
      <div>nice</div>
    </n-collapse-item>
    <n-collapse-item title="Gold" name="3">
      <div>very good</div>
    </n-collapse-item>
  </n-collapse>
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
