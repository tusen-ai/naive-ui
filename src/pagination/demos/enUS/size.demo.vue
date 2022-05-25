<markdown>
# Size
</markdown>

<template>
  <n-space vertical>
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="small"
      show-quick-jumper
      show-size-picker
    />
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="medium"
      show-quick-jumper
      show-size-picker
    />
    <n-pagination
      v-model:page="page"
      :page-count="100"
      size="large"
      show-quick-jumper
      show-size-picker
    />
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
