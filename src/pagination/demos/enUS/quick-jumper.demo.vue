<markdown>
# Quick jumper

You can also customize the content to jump to(press `Enter` to jump quickly).
</markdown>

<template>
  <n-pagination v-model:page="page" :page-count="100" show-quick-jumper>
    <template #goto>
      Go!
    </template>
  </n-pagination>
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
