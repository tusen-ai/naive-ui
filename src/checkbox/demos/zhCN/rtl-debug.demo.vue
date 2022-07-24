<markdown>
# Rtl Debug
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableCheckboxRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      rtlEnabled: ref(false),
      rtlStyles: [unstableCheckboxRtl]
    }
  }
})
</script>
