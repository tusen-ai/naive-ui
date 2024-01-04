<markdown>
# Rtl Debug
</markdown>

<template>
  <n-flex vertical>
    <n-flex><n-switch v-model:value="rtlEnabled" />Rtl</n-flex>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-flex>
        <n-button>Oops!</n-button>
        <n-button>Oops!</n-button>
        <n-button>Long! Long! Cross the line!</n-button>
      </n-flex>
    </n-config-provider>
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableSpaceRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableSpaceRtl]
    }
  }
})
</script>
