<markdown>
# Basic
</markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="show">
      <template #checked>
        Show
      </template>
      <template #unchecked>
        Hide
      </template>
    </n-switch>
    <n-collapse-transition :show="show">
      "There is no single development, in either technology or management
      technique, which by itself promises even one order of magnitude [tenfold]
      improvement within a decade in productivity, in reliability, in
      simplicity."
    </n-collapse-transition>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(true)
    }
  }
})
</script>
