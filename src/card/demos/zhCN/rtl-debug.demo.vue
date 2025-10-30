<markdown>
# Rtl Debug
</markdown>

<script setup lang="ts">
import { unstableCardRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableCardRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-card closable>
        <template #header>
          Rtl Header Test
        </template>
        <template #header-extra>
          Rtl Header Extra Test
        </template>
        Rtl Content Test
        <template #footer>
          Rtl Header Test
        </template>
        <template #action>
          Rtl Action Test
        </template>
      </n-card>
    </n-config-provider>
  </n-space>
</template>
