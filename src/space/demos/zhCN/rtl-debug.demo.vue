<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { unstableSpaceRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableSpaceRtl]
    }
  }
})
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
