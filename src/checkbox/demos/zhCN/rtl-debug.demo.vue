<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { unstableCheckboxRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(false),
      rtlEnabled: ref(false),
      rtlStyles: [unstableCheckboxRtl]
    }
  }
})
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
