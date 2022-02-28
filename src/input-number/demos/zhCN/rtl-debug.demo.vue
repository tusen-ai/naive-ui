<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-input-number v-model:value="value" clearable />
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableInputNumberRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      rtlEnabled: ref(false),
      rtlStyles: [unstableInputNumberRtl]
    }
  }
})
</script>
