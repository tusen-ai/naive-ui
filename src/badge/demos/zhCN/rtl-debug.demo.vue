<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { unstableBadgeRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableBadgeRtl]
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space :size="24" align="center">
        <n-badge :value="5" processing>
          <n-avatar />
        </n-badge>
        <n-badge :value="5" dot>
          <n-avatar />
        </n-badge>
      </n-space>
    </n-config-provider>
  </n-space>
</template>
