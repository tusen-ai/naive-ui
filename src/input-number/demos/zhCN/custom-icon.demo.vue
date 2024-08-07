<markdown>
# 自定义图标
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowDownCircleOutline, ArrowUpCircleOutline } from '@vicons/ionicons5'

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
