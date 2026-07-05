<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableSpaceRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableSpaceRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space>
        <n-button>Oops!</n-button>
        <n-button>Oops!</n-button>
        <n-button>Long! Long! Cross the line!</n-button>
      </n-space>
    </n-config-provider>
  </n-space>
</template>
