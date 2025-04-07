<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableInputOptRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableInputOptRtl]
const value = ref('654321')
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-input-opt v-model="value" style="width: 300px" />
    </n-config-provider>
  </n-space>
</template>
