<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstablePopoverRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstablePopoverRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-tooltip trigger="click">
        <template #trigger>
          <n-button>悬浮</n-button>
        </template>
        <template #header>
          <span>header</span>
        </template>
        <template #footer>
          <span>footer</span>
        </template>
        <span>或许不想知道你的花园长得咋样</span>
      </n-tooltip>
    </n-config-provider>
  </n-space>
</template>
