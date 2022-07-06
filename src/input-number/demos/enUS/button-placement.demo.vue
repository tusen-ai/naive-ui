<markdown>
# Button placement

Button can be placed at both ends.
</markdown>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value" button-placement="both" />
    <n-input-number v-model:value="value" button-placement="both">
      <template #prefix>
        $
      </template>
    </n-input-number>
    <n-input-number v-model:value="value" button-placement="both">
      <template #suffix>
        ฿
      </template>
    </n-input-number>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>
