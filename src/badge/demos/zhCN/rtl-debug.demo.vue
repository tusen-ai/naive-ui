<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableBadgeRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableBadgeRtl]
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
