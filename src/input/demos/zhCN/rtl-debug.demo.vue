<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableInputRtl } from 'naive-ui'
import { ref } from 'vue'

const value = ref(null)
const rtlEnabled = ref(false)
const rtlStyles = [unstableInputRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space vertical>
        <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
        <n-input
          v-model:value="value"
          type="textarea"
          placeholder="基本的 Textarea"
        />
      </n-space>
    </n-config-provider>
  </n-space>
</template>
