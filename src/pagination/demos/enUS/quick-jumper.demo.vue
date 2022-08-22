<markdown>
# Quick jumper

You can customize the content to jump to (press `Enter` to jump quickly).
</markdown>

<template>
  <n-space vertical>
    <n-pagination :page-count="100" show-quick-jumper>
      <template #goto>
        Go!
      </template>
    </n-pagination>
    <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
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
      page: ref(2)
    }
  }
})
</script>
