<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableCheckboxRtl } from 'naive-ui'
import { ref } from 'vue'

const value = ref(false)
const rtlEnabled = ref(false)
const rtlStyles = [unstableCheckboxRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-checkbox v-model:checked="value">
        复选框
      </n-checkbox>
    </n-config-provider>
  </n-space>
</template>
