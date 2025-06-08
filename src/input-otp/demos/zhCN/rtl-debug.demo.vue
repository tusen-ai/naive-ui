<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableInputOtpRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableInputOtpRtl]
const value = ref('654321')
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-input-otp v-model="value" />
    </n-config-provider>
  </n-space>
</template>
