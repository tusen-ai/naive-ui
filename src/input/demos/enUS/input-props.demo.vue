<markdown>
# Input props

Input element has some special attributes, such as `auto-complete` or `type`. You can use `input-props` to set it.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
</script>

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
