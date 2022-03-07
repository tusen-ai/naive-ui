<markdown>
# Rtl Debug

</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableInputRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      rtlEnabled: ref(false),
      rtlStyles: [unstableInputRtl]
    }
  }
})
</script>
