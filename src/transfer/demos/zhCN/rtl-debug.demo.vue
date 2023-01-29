<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-transfer ref="transfer" v-model:value="value" :options="options" />
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { unstableTransferRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}
export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableTransferRtl],
      options: createOptions(),
      value: ref([])
    }
  }
})
</script>
