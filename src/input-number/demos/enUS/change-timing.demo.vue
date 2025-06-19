<markdown>
# Timing to change

Set `update-value-on-input` to `false`, the value won't be changed on input.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(35)
</script>

<template>
  <n-space vertical>
    <n-input-number
      v-model:value="value"
      :update-value-on-input="false"
      placeholder=""
      :min="20"
      :max="50"
    />
    <n-input-number v-model:value="value" placeholder="" :min="20" :max="50" />
    {{ value }}
  </n-space>
</template>
