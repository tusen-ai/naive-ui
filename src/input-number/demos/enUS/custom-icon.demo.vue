<markdown>
# Custom Icon
</markdown>

<script lang="ts">
import { ArrowDownCircleOutline, ArrowUpCircleOutline } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(0),
      ArrowUpCircleOutline,
      ArrowDownCircleOutline
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value">
      <template #minus-icon>
        <n-icon :component="ArrowDownCircleOutline" />
      </template>
      <template #add-icon>
        <n-icon :component="ArrowUpCircleOutline" />
      </template>
    </n-input-number>
  </n-space>
</template>
