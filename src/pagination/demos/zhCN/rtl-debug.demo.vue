<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { unstablePaginationRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstablePaginationRtl],
      page: ref(2)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-pagination
        v-model:page="page"
        :page-count="100"
        show-size-picker
        show-quick-jumper
      />
    </n-config-provider>
  </n-space>
</template>
