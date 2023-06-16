<markdown>
# Border

Qrcode can be used without border.
</markdown>

<template>
  <n-space vertical>
    <n-qrcode :bordered="false" :value="text" />
    <n-input v-model:value="text" type="text" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const text = ref('Years on the wall peeling to see childhood')
    return {
      text
    }
  }
})
</script>
