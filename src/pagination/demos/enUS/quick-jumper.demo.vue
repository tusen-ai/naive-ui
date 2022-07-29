<markdown>
# Quick jumper

You can customize the content to jump to (press `Enter` to jump quickly),

and also can customize whether to trigger the quick jump on blur through `trigger-quick-jump-on-blur`.
</markdown>

<template>
  <n-space>
    <n-switch v-model:value="trigger">
      <template #checked>
        Quick jump on blur
      </template>
      <template #unchecked>
        Won't jump on blur
      </template>
    </n-switch>
    <n-pagination
      v-model:page="page"
      :page-count="100"
      show-quick-jumper
      :trigger-quick-jump-on-blur="trigger"
    >
      <template #goto>
        Go!
      </template>
    </n-pagination>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2),
      trigger: ref(false)
    }
  }
})
</script>
