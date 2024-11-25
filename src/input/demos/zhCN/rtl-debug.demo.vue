<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { unstableInputRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null),
      rtlEnabled: ref(false),
      rtlStyles: [unstableInputRtl]
    }
  }
})
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
