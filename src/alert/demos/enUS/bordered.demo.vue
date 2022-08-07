<markdown>
# Bordered
</markdown>

<template>
  <n-space vertical :size="12">
    <n-switch v-model:value="bordered" />
    <n-alert title="Could be no border" type="info" :bordered="bordered">
      Gee it's good to be back home
    </n-alert>
  </n-space>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      bordered: ref(true)
    }
  }
})
</script>
