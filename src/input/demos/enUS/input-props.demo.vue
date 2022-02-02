<markdown>
# Input props

Input element has some special attributes, such as `auto-complete` or `type`. You can use `input-props` to set it.
</markdown>

<template>
  <n-space vertical>
    <n-input
      v-model:value="value"
      :input-props="{ type: 'url' }"
      placeholder="URL"
    />
    <n-input
      v-model:value="value"
      :input-props="{ type: 'tel' }"
      placeholder="Tel"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
