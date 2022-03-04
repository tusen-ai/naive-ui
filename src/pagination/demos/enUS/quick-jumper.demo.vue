<markdown>
# Quick jumper
</markdown>

<template>
  <n-pagination v-model:page="page" :page-count="100" show-quick-jumper />
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
