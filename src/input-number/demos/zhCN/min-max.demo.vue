<markdown>
# 最小值 & 最大值

你可以设定最小值和最大值。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <n-space vertical>
    <n-input-number
      v-model:value="value"
      placeholder="最小值"
      :min="-3"
      :max="5"
    />
    <n-input-number
      v-model:value="value"
      placeholder="最大值"
      :min="-5"
      :max="3"
    />
  </n-space>
</template>
