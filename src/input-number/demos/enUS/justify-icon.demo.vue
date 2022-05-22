<markdown>
# Justify Icon
</markdown>
<template>
  <n-space vertical>
    <n-input-number v-model:value="value" justify-icon />
    <n-input-number v-model:value="value" justify-icon>
      <template #prefix>
        $
      </template>
    </n-input-number>
    <n-input-number v-model:value="value" justify-icon>
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
