<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableInputNumberRtl } from 'naive-ui'
import { ref } from 'vue'

const value = ref(0)
const rtlEnabled = ref(false)
const rtlStyles = [unstableInputNumberRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-input-number v-model:value="value" clearable />
    </n-config-provider>
  </n-space>
</template>
