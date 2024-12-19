<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { unstableDynamicInputRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableDynamicInputRtl],
      value: ref(['', '', ''])
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-dynamic-input
        v-model:value="value"
        placeholder="请输入"
        :min="3"
        :max="6"
      />
      <pre>{{ JSON.stringify(value, null, 2) }}</pre>
    </n-config-provider>
  </n-space>
</template>
